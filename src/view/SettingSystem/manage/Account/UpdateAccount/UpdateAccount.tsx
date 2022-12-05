import React, { useState } from 'react'
import { routerUpdateAccount } from './router'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Col, Row, Input, Select } from 'antd';
import './addcount.scss'
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@shared/hook/reduxhook';
import { useParams } from 'react-router';
import { updateAccount } from '@modules/account/accoutStore';
import { update } from 'lodash';
import { useAltaIntl } from '@shared/hook/useTranslate';

const { Option } = Select;
const db = FirebaseConfig.getInstance().fbDB
export interface roleType {
    id?: string
    name: string
    description: string
    permitViewDevice: boolean
    permitDetailDevice: boolean
    permitAddDevice: boolean
    permitUpdateDevice: boolean

    permitViewService: boolean
    permitAddService: boolean
    permitDetailService: boolean
    permitUpdateService: boolean

    permitViewNumber: boolean
    permitDetailNumber: boolean
    permitAddNumber: boolean

    permitViewReport: boolean

    permitViewRole: boolean
    permitAddRole: boolean
    permitUpdateRole: boolean

    permitViewAccount: boolean
    permitAddAccount: boolean
    permitUpdateAccount: boolean

    permitViewHistory: boolean
}
type accountStore = {
    id?: string
    name: string
    image: string
    email: string
    phone: string
    role: roleType
    status: string
    username: string
    password: string
};

const UpdateAccount = () => {
    const { formatMessage } = useAltaIntl();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const idd = useParams()
    let id: any = idd.id
    const accounts: Array<any> | undefined = useAppSelector((state) => {
        return state.account.accounts
    });
    const roles: Array<any> | undefined = useAppSelector((state) => {
        return state.role.roles
    });
    const account = accounts?.find((value) => value.id == id);
    const [name, setName] = useState('')
    const [username, setUsername] = useState(account.username)
    const [phone, setPhone] = useState(account.phone)
    const [password, setPassword] = useState(account.password)
    const [eamil, setEmail] = useState(account.email)
    const [againPassword, setAgainPassword] = useState(account.password)
    const [role, setRole] = useState(account.role)
    const [status, setStatus] = useState(account.status)

    const handleChange = (value: string) => {
        setRole(value)
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value)
    }

    const handleUpdateAccount = async () => {
        try {
            const idAccount = id
            var roleitem = roles?.find((item) => item.id == role);
            const body: accountStore = {
                email: eamil,
                image: 'https://cdn.pixabay.com/photo/2013/05/11/20/44/spring-flowers-110671_960_720.jpg',
                name: 'customer',
                password: password,
                phone: phone,
                role: roleitem,
                status: status,
                username: username
            }

            dispatch(updateAccount({ idAccount, body }))
            navigate('/setting/manage/account')
        }
        catch (e) {
            console.log(e);

        }
    }

    const handleCancel = () => {
        navigate('/setting/manage/account')
    }
    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={routerUpdateAccount} />
            <div className="add_device">
                <div className="title__add">
                    {formatMessage('common.qltaikhoan')}
                </div>
                <div className="content__add">
                    <div className="sub__title__add">
                        {formatMessage('common.accountinfo')}
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.hoten')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập họ tên " defaultValue={account.username} onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.history.username')}  <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên đăng nhập" defaultValue={account.email} onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.phone')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập số điện thoại" defaultValue={account.phone} onChange={(event) => setPhone(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập mật khẩu" defaultValue={account.password} onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.e')}  <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập email" defaultValue={account.email} onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.renewpassword')} <span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập lại mật khẩu" defaultValue={account.password} onChange={(event) => setAgainPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.role')} <span style={{ color: 'red' }} >*</span></p>
                                <Select defaultValue={account.role.name} onChange={handleChange}>
                                    {roles.map((role, index) => {
                                        return (
                                            <Option value={role.id} key={index}>{role.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.tr')}  <span style={{ color: 'red' }}>*</span></p>
                                <Select defaultValue={account.status} onChange={handleChangeStatus}>
                                    <Option value={false}>{formatMessage('common.stopaction')}</Option>
                                    <Option value={true}>{formatMessage('common.onaction')}</Option>
                                </Select>
                            </Col>
                        </Row>

                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancel}>
                        {formatMessage('common.cancell')}
                    </div>
                    <div className="btn__add btn__add_device" onClick={handleUpdateAccount}>
                        {formatMessage('common.update')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAccount