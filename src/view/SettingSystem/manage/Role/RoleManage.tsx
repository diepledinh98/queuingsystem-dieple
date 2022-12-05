
import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ISelect from '@core/select';
import './Role.scss'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SelectAndLabelComponent, {
    ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerViewSetting } from '@view/SettingSystem/router';
import { fetchRoles } from '@modules/rolenew/rolenewStore';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { Select, Input, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { fetchAccounts } from '@modules/account/accoutStore';
import { FirebaseConfig } from 'src/firebase/configs';
import { onAuthStateChanged } from 'firebase/auth'
const auth = FirebaseConfig.getInstance().auth
const { Search } = Input;
interface DataType {
    id?: string
    reportNumber?: string
    serviceName?: string
    GrantTime?: string
    status?: string
    powerSupply?: string

}
interface role {
    id: string
    rolename: string
    numberuse: string
    description: string
}
interface AuthUser {
    uid?: string
    email: string,
}
const RoleManage = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    let data: DataType[] | any;
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...

    const dispatch = useAppDispatch()
    const roles = useAppSelector((state) => state.role.roles)
    const accounts = useAppSelector((state) => state.account.accounts)
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);
    const user = users?.find((value) => value?.id == usercurrent?.uid);

    const role = roles?.find((value) => value?.id == user?.role?.id)
    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
        dispatch(fetchRoles())
        dispatch(fetchAccounts())
    }, [dispatch])

    let dataName: { name: string, val: number }[] = []
    dataName = roles.map((role, index) => {
        return {
            name: role.name,
            val: 0
        }
    })
    for (var i: number = 0; i < dataName.length; i = i + 1) {
        for (var j: number = 0; j < accounts.length; j = j + 1) {
            if (dataName[i].name === accounts[j].role.name) {
                dataName[i].val = dataName[i].val + 1
            }
        }
    }
    data = roles?.map((item, index) => {
        return {
            id: item?.id,
            rolename: item?.name,
            numberuse: dataName.map((use) => {
                if (use.name === item?.name) {
                    return use.val
                }
            }),
            description: item?.description,
            update: item
        }
    })
    const onUpdate = () => {
        navigate(``)
    }
    const columns: ColumnsType = [
        {
            title: 'common.role.namerole',
            dataIndex: 'rolename',
            align: 'left'
        },
        {
            title: 'common.role.numberuser',
            className: 'column-money',
            dataIndex: 'numberuse',
            align: 'left',
        },
        {
            title: 'common.role.description',
            dataIndex: 'description',
        },
        {
            title: 'common.update',
            dataIndex: 'update',
            align: 'center',
            render: (record: role) => {

                return (
                    <>
                        {role?.permitUpdateRole !== false
                            ?
                            <Link

                                to={`/setting/manage/updaterole/${record.id}`}
                                style={{ textDecoration: "underline", color: "#4277FF", }}
                            >{formatMessage('common.update')}</Link>
                            :
                            <Link

                                to={`/errorpage`}
                                style={{ textDecoration: "underline", color: "#4277FF", }}
                            >{formatMessage('common.update')}</Link>
                        }

                    </>

                )
            }
        }
    ];


    const linkAddRole = () => {
        if (role?.permitAddRole !== false) {
            navigate('/setting/manage/addrole');
        }
        else {
            navigate('/errorpage')
        }
    }

    const onSearch = (value: string) => {
        setSearch(value)
    }
    const resolve = (search: string) => {
        return data?.filter((item) => {
            return item.rolename.toLowerCase()?.includes(search.toLocaleLowerCase())
        })
    }
    console.log(search);

    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {
        return resolve(search)?.slice((current - 1) * pageSize, current * pageSize)
    }
    if (role?.permitViewRole !== false) {
        return (
            <div className="role__page">
                <MainTitleComponent breadcrumbs={routerViewSetting?.routes} />
                <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>
                            <h3 className='title'>{formatMessage('common.roles')}</h3>
                        </div>
                        <div className="d-flex flex-column ">
                            <div className="label-select">{formatMessage('common.keyword')}</div>
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
                                total={data?.length}
                                current={current}
                                onChange={setCurrent}
                                pageSize={pageSize}
                            />
                        </div>
                        <div className='btn_add_device' onClick={linkAddRole}>

                            <IconAddDevice />
                            {formatMessage('common.addrole')}
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

export default RoleManage;
