

import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SelectAndLabelComponent, {
    ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { Input, Select, Pagination } from 'antd';
// import { IModal } from '../Homepage/interface';
import { routerViewSetting } from '../../router';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { getAccount } from '@modules/account/respository';
import { accountStore } from '@modules/account/accoutStore';
import { fetchAccounts } from '@modules/account/accoutStore';
import { IconAddDevice } from '@shared/components/iconsComponent';
import { FirebaseConfig } from 'src/firebase/configs';
import { onAuthStateChanged } from 'firebase/auth'
import { AiFillCaretDown } from 'react-icons/ai';
import { routerViewAccount } from './router';
const { Search } = Input;
const { Option, OptGroup } = Select;
const auth = FirebaseConfig.getInstance().auth
interface dataAccount {
    id?: string
    email: string
    username: string
    phone: string
    role: string
    status: boolean

}
interface AuthUser {
    uid?: string
    email: string,
}
const AccountManager = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const [roleName, setRoleName] = useState<string>('All')
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...

    const dispatch = useAppDispatch();
    const accounts: Array<any> | undefined = useAppSelector((state) => state.account.accounts);
    const roles: Array<any> | undefined = useAppSelector((state) => state.role.roles);
    const users: Array<any> | any = useAppSelector((state) => state.account.accounts);
    let data: dataAccount[] | any;
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const user = users?.find((value) => value?.id == usercurrent?.uid);
    const role = roles?.find((value) => value?.id == user?.role?.id)
    useEffect(() => {

        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
        dispatch(fetchAccounts())
    }, [dispatch]);

    const onUpdate = (id: string) => {
        if (role?.permitUpdateAccount !== false) {
            navigate(`/updateaccount/${id}`)
        }
        else {
            navigate('/errorpage')
        }

    }
    data = accounts.map((account) => {
        return {
            id: account.id,
            email: account.email,
            username: account.username,
            role: account.role.name,
            status: account.status,
            phone: account.phone
        }
    })
    const columns: ColumnsType = [
        {
            title: 'common.history.username',
            dataIndex: 'email',
            align: 'left'
        },
        {
            title: 'common.hoten',
            className: 'column-money',
            dataIndex: 'username',
        },
        {
            title: 'common.phone',
            className: 'column-money',
            dataIndex: 'phone',
            align: 'left',
        },
        {
            title: 'common.e',
            dataIndex: 'email',
        },
        {
            title: 'common.role',
            dataIndex: 'role',
        },
        {
            title: 'common.status',
            dataIndex: '    ',
            render: (status: string) => (
                <>
                    <CircleLabel text={formatMessage('common.statusActive')} colorCode="green" />
                </>
            )
        },


        {
            title: 'common.update',
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


    const linkAddAccount = () => {
        if (role?.permitAddDevice !== false) {
            navigate('/addaccount')
        }
        else {
            navigate('/errorpage')
        }

    }

    const handleRole = (value: string) => {
        setRoleName(value)
    }
    const handleSearch = (value: string) => {
        setSearch(value);
    };
    const resolve = (search: string, roleName: string) => {
        return data.filter((item) => {
            if (roleName === 'All') {
                return item?.phone?.toLowerCase()?.includes(search.toLocaleLowerCase()) || item?.username?.toLowerCase()?.includes(search.toLocaleLowerCase())
            }
            if (roleName === item.role) {
                return item?.phone?.toLowerCase()?.includes(search.toLocaleLowerCase()) || item?.username?.toLowerCase()?.includes(search.toLocaleLowerCase()) || item.role === roleName
            }

        })
    }
    const [current, setCurrent] = useState(1)
    //pagination 
    const pageSize = 10
    const getData = (current: any, pageSize: any) => {
        return resolve(search, roleName)?.slice((current - 1) * pageSize, current * pageSize)
    }

    if (role?.permitViewAccount !== false) {
        return (
            <div className="service__page">
                <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewAccount]} />
                <div className="main-card" style={{ background: 'none', marginTop: 50 }}>

                    <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
                        <div className="d-flex flex-row " style={{ gap: 10 }}>
                            <div className='sortt'>
                                <label>{formatMessage('common.role.namerole')}</label>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue={formatMessage('common.all')} className="margin-select" onChange={handleRole}>
                                    <Option value="All">{formatMessage('common.all')}</Option>
                                    {roles.map((role, index) => {
                                        return (
                                            <Option value={role.name}>{role.name}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="d-flex flex-column ">
                            <div className="label-select">{formatMessage('common.keyword')}</div>
                            <Search placeholder="Nhập Thông tin " onSearch={handleSearch} />
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
                                style={{ width: 1050 }}
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
                        <div className='btn_add_device' onClick={linkAddAccount}>
                            <IconAddDevice />
                            {formatMessage('common.addaccount')}
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

export default AccountManager;
