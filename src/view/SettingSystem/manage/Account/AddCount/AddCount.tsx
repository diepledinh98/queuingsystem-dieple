import React, { useState } from 'react'
import { routerAddAccount } from './router'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Col, Row, Input, Select, message } from 'antd';
import './addcount.scss'
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router';
import { createAccount } from '@modules/account/accoutStore';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { formatMessage } from '@formatjs/intl';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { AiFillCaretDown } from 'react-icons/ai';
import { routerViewAccount } from '../router';
const { Option } = Select;
const db = FirebaseConfig.getInstance().fbDB
const auth = FirebaseConfig.getInstance().auth
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
const AddAccount = () => {
    const { formatMessage } = useAltaIntl();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [againPassword, setAgainPassword] = useState('')
    const [role, setRole] = useState<string>('')
    const [status, setStatus] = useState('')

    const handleChange = (value: string) => {
        setRole(value)
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value)
    }
    const roles: Array<any> | undefined = useAppSelector((state) => {
        return state.role.roles
    });


    const handleAddAccount = async () => {

        if (username === '' || password === '' || phone === '' || email === '' || role === '' || againPassword === '') {
            message.error('Vui lòng điền các trường còn trống!')
        }
        else if (password !== againPassword) {
            message.error('Nhập lại mật khẩu bạn đã sai')
        }
        else {


            try {
                const resultuser = await createUserWithEmailAndPassword(auth, email, password)

                var roleitem = roles?.find((item) => item.id == role);
                const idAccount = resultuser?.user?.uid
                const body: accountStore = {
                    email: email,
                    image: 'https://cdn.pixabay.com/photo/2013/05/11/20/44/spring-flowers-110671_960_720.jpg',
                    name: 'customer',
                    password: password,
                    phone: phone,
                    role: roleitem,
                    status: status,
                    username: username
                }
                dispatch(createAccount({ idAccount, body }))
                navigate('/setting/manage/account')
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const handleCancel = () => {
        navigate('/setting/manage/account')
    }
    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={[routerViewAccount, routerAddAccount]} />
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
                                <Input className='add__input' placeholder="Nhập họ tên " onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.history.username')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên đăng nhập" onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.phone')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập số điện thoại" onChange={(event) => setPhone(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.e')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập email" onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.renewpassword')}<span style={{ color: 'red' }}>*</span></p>
                                <Input.Password className='add__input' placeholder="Nhập lại mật khẩu" onChange={(event) => setAgainPassword(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.role')} <span style={{ color: 'red' }} >*</span></p>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue="Chọn vai trò" onChange={handleChange}>
                                    {roles.map((role, index) => {
                                        return (
                                            <Option value={role.id} key={index}>{role.name}</Option>
                                        )
                                    })}

                                </Select>
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.tr')} <span style={{ color: 'red' }}>*</span></p>
                                <Select suffixIcon={<AiFillCaretDown />} defaultValue="Chọn tình trạng" onChange={handleChangeStatus}>

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
                    <div className="btn__add btn__add_device" onClick={handleAddAccount}>
                        {formatMessage('common.add')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccount