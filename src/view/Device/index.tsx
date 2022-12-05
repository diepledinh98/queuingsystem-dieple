import './style.scss';

import { Pagination, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import CircleLabel from '@shared/components/CircleLabel';

import MainTitleComponent from '@shared/components/MainTitleComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { IModal } from '../Homepage/interface';
import { routerViewDevice } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';

import { fetchDevicesNew } from '@modules/devicenew/devicenewStore';
import { accounttype } from '@view/SettingSystem/manage/Account/interface';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { fetchAccounts } from '@modules/account/accoutStore';
import { Select, Input } from 'antd';
import { FirebaseConfig } from 'src/firebase/configs';
import { onAuthStateChanged } from 'firebase/auth'
import { format } from 'path';
const { Search } = Input;
const { Option, OptGroup } = Select;

const db = FirebaseConfig.getInstance().fbDB
const auth = FirebaseConfig.getInstance().auth
interface TypeDevices {
    id?: string
    deviceID?: string
    deviceName?: string
    deviceIP?: string
    deviceStatus?: boolean
    devicecategory?: string
    deviceConnect?: boolean
    services?: string[]
    detail?: string
    update?: string
}
interface AuthUser {
    uid?: string
    email: string,
}
interface type {
    userr: accounttype
}
const Device = () => {

    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const [listDevice, setListDevice] = useState<TypeDevices[]>([])
    const [result, setResult] = useState<TypeDevices[] | undefined>();
    const { formatMessage } = useAltaIntl();
    const table = useTable();

    const [modal, setModal] = useState<IModal>({
        isVisible: false,
        dataEdit: null,
        isReadOnly: false,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
    const [status, setStatus] = useState<string>('All')
    const [connect, setConnect] = useState<string>('All')
    const [usercurr, setUsercurr] = useState<accounttype>()
    const dispatch = useAppDispatch();
    const devices: Array<any> | undefined = useAppSelector((state) => state.devicenew.devices);
    const roles: Array<any> | any = useAppSelector((state) => state.role.roles);
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);

    useEffect(() => {

        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
        dispatch(fetchDevicesNew())
        dispatch(fetchAccounts())
    }, [dispatch]);
    const user = users?.find((value) => value?.id == usercurrent?.uid);
    const role = roles?.find((value) => value?.id == user?.role?.id)


    const onDetail = (id: string) => {
        if (role?.permitDetailDevice !== false) {
            navigate(`/detaildevice/${id}`)
        }
        else {
            navigate('/errorpage')
        }
    }
    const onUpdate = (id: string) => {
        if (role?.permitUpdateDevice !== false) {
            navigate(`/updatedevice/${id}`)
        }
        else {
            navigate('/errorpage')
        }
    }
    const columns: ColumnsType = [
        {
            title: 'common.deviceID',
            dataIndex: 'deviceID',
            align: 'left'
        },
        {
            title: 'common.deviceName',
            className: 'column-money',
            dataIndex: 'deviceName',
            align: 'left',
        },
        {
            title: 'common.deviceIP',
            dataIndex: 'deviceIP',
        },
        {
            title: 'common.titleaction',
            dataIndex: 'deviceStatus',
            render: (status: boolean) => (
                <>
                    {status ? <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" /> :
                        <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" />
                    }
                </>
            )


            ,
        },
        {
            title: 'common.titlteconnect',
            dataIndex: 'deviceConnect',
            render: (connect: boolean) => (
                <>
                    {connect ? <CircleLabel text={formatMessage('common.onconnect')} colorCode="green" /> :
                        <CircleLabel text={formatMessage('common.stopconnect')} colorCode="red" />
                    }
                </>
            )
        },
        {
            title: 'common.serviceuse',
            dataIndex: 'services',
            render: (texts: string[]) => {


                return (
                    <div className='d-flex' style={{ flexDirection: 'column' }}>
                        {

                            `${texts[0]},...`}
                        <div style={{ textDecoration: 'underline', color: '#4277FF' }}>{formatMessage('common.viewPlus')}</div>
                    </div>
                )
            }

        }, {
            title: 'common.detail',
            dataIndex: 'detail',
            render: (action: any, record: any) => {
                return (
                    <>
                        <a
                            onClick={() => onDetail(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >{formatMessage('common.detail')}</a>
                    </>

                )
            }
        },
        {
            title: 'common.update',
            dataIndex: 'update',
            render: (action: any, record: any) => {


                return (
                    <>
                        <a
                            onClick={() => onUpdate(record.id)}
                            style={{ textDecoration: "underline", color: "#4277FF", }}
                        >{formatMessage('common.update')}</a>
                    </>

                )
            }
        }
    ];


    const linkAddDevice = () => {
        if (user?.role?.permitAddDevice !== false) {
            navigate('/AddDevice');
        }
        else {
            navigate('/errorpage')
        }

    }


    const onSearch = (value: string) => {
        setSearch(value)
    }

    const handleChangeStatus = (value: string) => {
        setStatus(value)
        // setResult(foundItems)
    }
    const handleChangeConnect = (value: string) => {
        setConnect(value)
    }
    const resolve = (search: string, status: string, connect: string) => {
        return devices?.filter((item) => {

            if (status === 'All') {

                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase())
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceConnect === false
                }
            }
            if (status === 'active') {
                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === true && item.deviceConnect === false
                }
            }
            if (status === 'notActive') {
                if (connect === 'All') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false
                }
                if (connect === 'connect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false && item.deviceConnect === true
                }
                if (connect === 'notConnect') {
                    return item.deviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.deviceStatus === false && item.deviceConnect === false
                }
            }
        })
    }


    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {

        if (resolve(search, status, connect) && resolve(search, status, connect).length > 0) {
            return resolve(search, status, connect)?.slice((current - 1) * pageSize, current * pageSize)
        }


    }
    if (role?.permitViewDevice !== false) {
        return (
            <div className="device">
                <MainTitleComponent breadcrumbs={routerViewDevice} />
                <div className="main-card" style={{ background: 'none', marginTop: 50, padding: 0 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>
                            {/* {arraySelectFilter.map(item => {
                                    return (
                                        <SelectAndLabelComponent
                                            onChange={onChangeSelectStatus(item.name)}
                                            key={item.name}
                                            className="margin-select"
                                            dataString={item.dataString || dataStringConnect}
                                            textLabel={item.textLabel}
        
                                        />
                                    )
                                }
                                )} */}
                            <div className='sortt'>
                                <label>{formatMessage('common.titleaction')}</label>
                                <Select defaultValue={formatMessage('common.all')} style={{ width: 200 }} className="margin-select" onChange={handleChangeStatus}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    <Option value="active">{formatMessage('common.onaction')}</Option>
                                    <Option value="notActive">{formatMessage('common.stopaction')}</Option>
                                </Select>
                            </div>

                            <div className='sortt'>
                                <label>{formatMessage('common.titlteconnect')}</label>
                                <Select defaultValue={formatMessage('common.all')} style={{ width: 200 }} className="margin-select" onChange={handleChangeConnect}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    <Option value="connect">{formatMessage('common.onconnect')}</Option>
                                    <Option value="notConnect">{formatMessage('common.stopconnect')}</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="d-flex flex-column ">
                            <div className="label-select">{formatMessage('common.keyword')}</div>
                            {/* <SearchComponent
                                    onSearch={handleSearch}
                                    placeholder={'common.keyword'}
                                    classNames="mb-0 search-table"
                                /> */}
                            <Search placeholder="Nhập tên thiết bị" onSearch={onSearch} />
                        </div>
                    </div>
                    <div className='d-flex' >
                        <div>

                            <TableComponent
                                // apiServices={}
                                defaultOption={filter}
                                translateFirstKey="homepage"
                                rowKey={res => res[idChooses]}
                                register={table}
                                columns={columns}
                                // onRowSelect={setSelectedRowKeys}
                                dataSource={getData(current, pageSize)}

                                bordered
                                disableFirstCallApi={true}
                                pagination={false}
                            />
                            <Pagination
                                total={devices?.length}
                                current={current}
                                onChange={setCurrent}
                                pageSize={pageSize}
                            />
                        </div>
                        <div className='btn_add_device' onClick={linkAddDevice}>

                            <IconAddDevice />
                            {formatMessage('common.adddevice')}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    else {
        navigate('/errorpage')
    }
};

export default Device;
