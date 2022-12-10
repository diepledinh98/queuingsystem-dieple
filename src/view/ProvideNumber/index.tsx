import './style.scss';

import { Space, DatePicker, Input, Select, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import SelectAndLabelComponent, {
    ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';


import { IModal } from '../Homepage/interface';
import { routerViewProvideNumber } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { getProvideNumber } from '@modules/providenumber/respository';
import { Item } from '@antv/g6-core';
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import type { DatePickerProps } from 'antd';
import moment from 'moment';
import { values } from 'lodash';
import { DatabaseTwoTone } from '@ant-design/icons';
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseConfig } from 'src/firebase/configs';
import { AiFillCaretDown } from 'react-icons/ai';
import { IconAddDevice } from '@shared/components/iconsComponent';
const { RangePicker } = DatePicker
const { Search } = Input;
const { Option, OptGroup } = Select;
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean

    Growauto?: number[]
    Prefix?: string
    Surfix?: string

    Reset?: boolean
};
interface TypeDevices {
    id?: string
    deviceID?: string
    deviceName?: string
    deviceIP?: string
    deviceStatus?: boolean
    deviceConnect?: boolean
    devicecategory?: string
    services?: string[]
    detail?: string
    update?: string
}
type accountStore = {
    id?: string
    name: string
    image: string
    eamil: string
    phone: string
    role: string
    status: boolean
    username: string
    password: string
};
type provideNumberProps = {
    id?: string
    dateduse: string
    linkServiceId: string
    stt: number
    timeprovide: string
    status: string
    service: serviceProps
    customer: accountStore
    devices: TypeDevices
};
interface AuthUser {
    uid?: string
    email: string,
}

let data: provideNumberProps[] | any;
const ProvideNumber = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const auth = FirebaseConfig.getInstance().auth
    const idChooses = 'id';
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const [filterNameService, setFilterNameService] = useState<string>('All')
    const [status, setStatus] = useState('All')
    const [source, setSource] = useState('All')
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const listProvideNumber = useAppSelector((state) => state.providenumber.Number)
    const services = useAppSelector((state) => state.service.services)
    const devices = useAppSelector((state) => state.devicenew.devices)
    const [dates, setDates] = useState<string[] | any>([])
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);
    const user = users?.find((value) => value?.id == usercurrent?.uid);
    const roles: Array<any> | any = useAppSelector((state) => state.role.roles);
    const role = roles?.find((value) => value?.id == user?.role?.id)
    data = listProvideNumber?.map((item, index) => {
        return {
            id: item?.id,
            number: item?.stt,
            customerName: item.customer.username,
            serviceName: item.service.serviceName,
            GrantTime: item?.timeprovide,
            expiry: item?.dateduse,
            status: item?.status,
            powerSupply: item?.devices?.devicecategory
        }
    })

    const daytime: string[] = dates?.map((item) => {
        return item
    })




    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
        dispatch(fetchProvideNumber())
    }, [dispatch]);

    const onDetail = (id: string) => {
        if (role?.permitDetailNumber !== false) {
            navigate(`/detailnumber/${id}`)
        }
        else {
            navigate('/errorpage')
        }

    }

    const columns: ColumnsType = [
        {
            title: 'common.st',
            dataIndex: 'number',
            align: 'left'
        },
        {
            title: 'common.customer',
            className: 'column-money',
            dataIndex: 'customerName',
        },
        {
            title: 'common.servicename',
            className: 'column-money',
            dataIndex: 'serviceName',
            align: 'left',
        },
        {
            title: 'common.timeprovide',
            dataIndex: 'GrantTime',
        },
        {
            title: 'common.dated',
            dataIndex: 'expiry',
        },
        {
            title: 'common.status',
            dataIndex: 'status',
            render: (status: string) => (
                <>
                    {status == 'waiting' ? <CircleLabel text={formatMessage('common.statuswaiting')} colorCode="blue" /> : (
                        status == 'used' ? <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" /> :
                            <CircleLabel text={formatMessage('common.statusNotActive')} colorCode="red" />
                    )

                    }
                </>
            )
        },

        {
            title: 'common.nguon',
            dataIndex: 'powerSupply',
        },
        {
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
        }
    ];
    const hanldeStatus = (value: string) => {
        setStatus(value)
    }
    const hanldeFilterServiceName = (value: string) => {
        setFilterNameService(value)
    }
    const handleFilterSource = (value: string) => {
        setSource(value)
    }
    const resolve = (search: string, status: string, name: string, sourcefilter: string) => {
        return data?.filter((item) => {
            var date1 = new Date(item.GrantTime.slice(8))
            var date2 = new Date(item.expiry.slice(8))
            if (name === 'All') {
                if (status === 'All') {
                    if (sourcefilter === 'All') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        else {
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase())
                        }

                    }
                    if (sourcefilter === 'displaycounter') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.powerSupply === sourcefilter && status === item.status && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.powerSupply === sourcefilter && status === item.status
                    }
                }
                if (status === item.status) {
                    if (sourcefilter === 'All') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && status === item.status && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase())
                    }
                    if (sourcefilter === 'displaycounter') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.powerSupply === sourcefilter && status === item.status && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.powerSupply === sourcefilter && status === item.status
                    }
                }
            }




            if (name === item.serviceName) {
                if (status === 'All') {
                    if (sourcefilter === 'All') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name
                    }
                    if (sourcefilter === 'displaycounter') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && sourcefilter === item.powerSupply && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && sourcefilter === item.powerSupply
                    }
                }
                if (status === item.status) {
                    if (sourcefilter === 'All') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && status === item.status && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && status === item.status
                    }
                    if (sourcefilter === 'displaycounter') {
                        if (daytime.length > 0) {
                            let datefrom = new Date(daytime[0].slice(8))
                            var datet0 = new Date(daytime[1].slice(8))
                            return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && sourcefilter === item.powerSupply && status === item.status && date1.getTime() >= datefrom.getTime() && date2.getTime() <= datet0.getTime()
                        }
                        return item.serviceName.toLowerCase()?.includes(search.toLocaleLowerCase()) && item.serviceName === name && sourcefilter === item.powerSupply && status === item.status
                    }
                }

            }

        })
    }


    const NameStatus: { keyStatus: string, nameStatus: string }[] = [
        {
            keyStatus: 'waiting',
            nameStatus: 'Đang chờ'
        },
        {
            keyStatus: 'used',
            nameStatus: 'Đã sử dụng'
        },
        {
            keyStatus: 'skip',
            nameStatus: 'Bỏ qua'
        },
    ]
    const linkAddDevice = () => {
        if (role?.permitAddNumber !== false) {
            navigate('/addprovide');
        }
        else {
            navigate('/errorpage')
        }
    }

    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {
        return resolve(search, status, filterNameService, source)?.slice((current - 1) * pageSize, current * pageSize)
    }

    const handleSearch = (searchKey: string) => {
        setSearch(searchKey);
    };

    if (role?.permitViewNumber !== false) {
        return (
            <div className="providenumber__page">
                <MainTitleComponent breadcrumbs={routerViewProvideNumber} />
                <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>
                            {/* {arraySelectFilter.map(item => (
                                <SelectAndLabelComponent
                                    onChange={onChangeSelectStatus(item.name)}
                                    key={item.name}
                                    className="margin-select"
                                    dataString={item.dataString}
                                    textLabel={item.textLabel}
                                />
                            ))} */}
                            <div className='sortt'>
                                <label>{formatMessage('common.servicename')}</label>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue={formatMessage('common.all')} className="margin-select" onChange={hanldeFilterServiceName}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    {services.map((item, index) => {

                                        return (
                                            <Option value={item.serviceName} key={index}>{item.serviceName}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className='sortt'>
                                <label>{formatMessage('common.tr')}</label>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue={formatMessage('common.all')} className="margin-select" onChange={hanldeStatus}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    {NameStatus.map((item, index) => {
                                        return (
                                            <Option value={item.keyStatus}>{item.nameStatus}</Option>
                                        )
                                    })}


                                </Select>
                            </div>
                            <div className='sortt'>
                                <label>{formatMessage('common.nguon')}</label>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue={formatMessage('common.all')} className="margin-select" onChange={handleFilterSource}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    <Option value='displaycounter' >{formatMessage('common.displaycounter')}</Option>
                                </Select>
                            </div>
                            <div className='sortt'>
                                <Space direction="vertical" className='time' style={{ marginTop: 27, marginRight: 10 }}>
                                    <RangePicker picker="date" onChange={(values) => {
                                        setDates(values?.map(item => {
                                            return moment(item).format('HH:mm - DD/MM/YYYY')
                                        }))
                                    }} />
                                </Space>
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
                                dataSource={getData(current, pageSize)}
                                bordered
                                disableFirstCallApi={true}
                                pagination={false}
                            />
                            <div className='paginations'>
                                <Pagination
                                    total={data?.length}
                                    current={current}
                                    onChange={setCurrent}
                                    pageSize={pageSize}
                                />
                            </div>
                        </div>
                        <div className='btn_add_device' onClick={linkAddDevice}>
                            <IconAddDevice />
                            {formatMessage('common.providenewnunber')}
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

export default ProvideNumber;
