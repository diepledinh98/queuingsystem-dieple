import './style.scss';

import { Space, DatePicker, Input, Select, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import SelectAndLabelComponent, {
    ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { fetchAccounts } from '@modules/account/accoutStore';
import './style.scss'
import { IModal } from '../Homepage/interface';
import { routerViewService } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { fetchServices } from '@modules/service/serviceStore';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { FirebaseConfig } from 'src/firebase/configs';
import { onAuthStateChanged } from '@firebase/auth';
import RangePickerComponent from '@shared/components/RangePickerComponent';
import { AiFillCaretDown } from "react-icons/ai";
const { Search } = Input;
const { Option, OptGroup } = Select;
interface AuthUser {
    uid?: string
    email: string,
}
const Service = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const auth = FirebaseConfig.getInstance().auth
    const [modal, setModal] = useState<IModal>({
        isVisible: false,
        dataEdit: null,
        isReadOnly: false,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const [status, setStatus] = useState('All')
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)

    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
    const dispatch = useAppDispatch()
    const services = useAppSelector((state) => state.service.services)
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);
    const user = users?.find((value) => value?.id == usercurrent?.uid);
    const roles: Array<any> | any = useAppSelector((state) => state.role.roles);
    const role = roles?.find((value) => value?.id == user?.role?.id)
    const handleChangeStatus = (value: string) => {
        setStatus(value)

    }
    useEffect(() => {

        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
        dispatch(fetchServices())
        dispatch(fetchAccounts())
    }, [dispatch]);

    const onDetail = (id: string) => {
        if (user?.role?.permitDetailService !== false) {
            navigate(`/detailservice/${id}`)
        }
        else {
            navigate('/errorpage')
        }

    }
    const onUpdate = (id: string) => {
        if (role?.permitUpdateService !== false) {
            navigate(`/updateservice/${id}`)
        }
        else {
            navigate('/errorpage')
        }
    }
    const columns: ColumnsType = [
        {
            title: 'common.serviceid',
            dataIndex: 'serviceID',
            align: 'left'
        },
        {
            title: 'common.servicename',
            className: 'column-money',
            dataIndex: 'serviceName',
            align: 'left',
        },
        {
            title: 'common.role.description',
            dataIndex: 'description',
        },
        {
            title: 'common.titleaction',
            dataIndex: 'serviceStatus',
            render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" />,
        },

        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            align: 'center',
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
            title: 'Cập nhật',
            dataIndex: 'update',
            align: 'center',
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


    const linkAddService = () => {
        if (role?.permitAddService !== false) {
            navigate('/addservice');
        }
        else {
            navigate('/errorpage')
        }
    }

    const handleSearch = (searchKey: string) => {
        setSearch(searchKey);
    };

    const resolve = (search: string, status: string) => {
        return services?.filter((item) => {

            if (status === 'All') {


                return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase())

            }
            if (status === 'active') {

                return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceStatus === true

            }
            if (status === 'notActive') {

                return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceStatus === false

            }
        })
    }


    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {

        if (resolve(search, status) && resolve(search, status).length > 0) {
            return resolve(search, status)?.slice((current - 1) * pageSize, current * pageSize)
        }


    }
    if (role?.permitViewService !== false) {
        return (
            <div className="service__page">
                <MainTitleComponent breadcrumbs={routerViewService} />
                <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>
                            <div className='sortt'>
                                <label>{formatMessage('common.titleaction')}</label>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue={formatMessage('common.all')} className="margin-select" onChange={handleChangeStatus}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    <Option value="active">{formatMessage('common.onaction')}</Option>
                                    <Option value="notActive">{formatMessage('common.stopaction')}</Option>
                                </Select>
                            </div>


                            <div className='select__time'>
                                <p>{formatMessage('common.selecttime')}</p>
                                {/* <Space direction="vertical" className='time'>
                                    <DatePicker picker="week" />

                                    <DatePicker picker="week" />
                                </Space> */}
                                <RangePickerComponent />

                            </div>
                        </div>
                        <div className="d-flex flex-column ">
                            <div className="label-select">{formatMessage('common.keyword')}</div>
                            {/* <SearchComponent
                                onSearch={handleSearch}
                                placeholder={'common.keyword'}
                                classNames="mb-0 search-table"
                            /> */}
                            <Search placeholder="Nhập tên thiết bị" onSearch={handleSearch} />
                        </div>
                    </div>
                    <div className='d-flex' >
                        <div>

                            <TableComponent
                                // apiServices={}
                                style={{ width: 1050 }}
                                defaultOption={filter}
                                translateFirstKey="homepage"
                                rowKey={res => res[idChooses]}
                                register={table}
                                columns={columns}
                                // onRowSelect={setSelectedRowKeys}
                                dataSource={getData(current, pageSize)?.reverse()}
                                bordered
                                disableFirstCallApi={true}
                                pagination={false}
                            />
                            <div className='paginations'>
                                <Pagination
                                    total={services?.length}
                                    current={current}
                                    onChange={setCurrent}
                                    pageSize={pageSize}
                                    showSizeChanger={false}
                                />
                            </div>
                        </div>
                        <div className='btn_add_device' onClick={linkAddService}>
                            <IconAddDevice />
                            {formatMessage('common.addservice')}
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

export default Service;
