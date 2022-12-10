import './style.scss';

import { Space, DatePicker, Pagination } from 'antd';
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
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { IModal } from '../Homepage/interface';
import { routerViewReport } from './router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { provideNumberStore } from '@modules/providenumber/numberStore';
import { getProvideNumber } from '@modules/providenumber/respository';
import moment from 'moment';
import { FirebaseConfig } from 'src/firebase/configs';
import { onAuthStateChanged } from 'firebase/auth'
import { AiOutlineCloudDownload } from 'react-icons/ai';
const { RangePicker } = DatePicker
const auth = FirebaseConfig.getInstance().auth
interface DataType {
    id?: string
    reportNumber?: string
    serviceName?: string
    GrantTime?: string
    status?: string
    powerSupply?: string

}
interface AuthUser {
    uid?: string
    email: string,
}
const Report = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    let data: DataType[] | any;


    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...

    const dispatch = useAppDispatch()
    const providenumber = useAppSelector((state) => state.providenumber.Number)
    const [dates, setDates] = useState<string[] | any>([])
    var csvData: DataType[] | any
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);
    const user = users?.find((value) => value?.id == usercurrent?.uid);
    const roles: Array<any> | any = useAppSelector((state) => state.role.roles);
    const role = roles?.find((value) => value?.id == user?.role?.id)


    useEffect(() => {

        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])

    csvData = providenumber?.map((item, index) => {
        return {
            id: item?.id,
            reportNumber: item?.stt,
            serviceName: item.service.serviceName,
            GrantTime: item?.timeprovide,
            status: item?.status,
            powerSupply: item?.devices.devicecategory
        }
    })
    data = providenumber?.map((item, index) => {
        return {
            id: item?.id,
            reportNumber: item?.stt,
            serviceName: item.service.serviceName,
            GrantTime: item?.timeprovide,
            status: item?.status,
            powerSupply: item?.devices.devicecategory
        }
    })

    const columns: ColumnsType = [
        {
            title: 'common.sothutu',
            dataIndex: 'reportNumber',
            align: 'left'
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
            title: 'common.tr',
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
        }
    ];


    const linkAddDevice = () => {
        navigate('/AddDevice');
    }
    // const resolve = () => {
    //     return data.filter((item, index) => {
    //         if (dates.length > 0) {
    //             var dateprovide = new Date(item.GrantTime.slice(8))
    //             var datefrom = new Date(dates[0].slice(8))
    //             var dateto = new Date(dates[1].slice(8))
    //             return dateprovide.getTime() >= datefrom.getTime() && dateprovide.getTime() <= dateto.getTime()
    //         }
    //         else {
    //             return item
    //         }
    //     })

    // }

    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {
        return data.slice((current - 1) * pageSize, current * pageSize)
    }

    const ExportCSV = () => {
        let c
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        var fileName = 'report'

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);

    }
    if (role?.permitViewReport !== false) {
        return (
            <div className="service__page">
                <MainTitleComponent breadcrumbs={routerViewReport} />
                <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>

                            <div className='select__time'>
                                <p>{formatMessage('common.selecttime')}</p>
                                <Space direction="vertical" className='time' style={{ marginTop: 27, marginRight: 10 }}>
                                    <RangePicker picker="date" onChange={(values) => {
                                        setDates(values?.map(item => {
                                            return moment(item).format('HH:mm - DD/MM/YYYY')
                                        }))
                                    }
                                    }
                                    />
                                </Space>

                            </div>
                        </div>


                    </div>
                    <div className='d-flex' >
                        <div>

                            <TableComponent
                                // apiServices={}
                                style={{ width: 1050 }}
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
                        <div className='btn_add_device' onClick={ExportCSV}>
                            <AiOutlineCloudDownload style={{ fontSize: 28 }} />
                            {formatMessage('common.download')}

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

export default Report;
