import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewAddDevice } from './router'
import { Avatar, Col, Row, Input, Select, message } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import './add_device.scss'
import { createHistorys } from '@modules/history/historyStore';
import { onAuthStateChanged } from 'firebase/auth'
import { createDevice } from '@modules/devicenew/devicenewStore';
import { routerViewDevice } from '../router';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { AiFillCaretDown } from "react-icons/ai";
import moment from 'moment';
interface deviceProps {
    id?: string
    deviceID: string;
    deviceName: string;
    deviceIP: string;
    devicecategory: string;
    deviceStatus: boolean
    deviceConnect: boolean
    services: string[]
    detail: string
    update: string
    username: string
    password: string
};
interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}
interface AuthUser {
    email: string,
}
const AddDevice = () => {
    const { Option, OptGroup } = Select;
    const { formatMessage } = useAltaIntl();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const controller = new AbortController()
    const signal = controller.signal
    const auth = FirebaseConfig.getInstance().auth
    const db = FirebaseConfig.getInstance().fbDB
    const OPTIONS = ['Khám tim mạch', 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng', 'Khám hô hấp', 'Khám tổng quát'];
    const [deviceId, setDeviceId] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [catedevice, setCatedevice] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceusername, setDeviceusername] = useState('')
    const [devicepassword, setDevicepassword] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)

    var presentDate = new Date();
    var time = moment(presentDate).format('HH:mm - DD/MM/YYYY')

    const devices: Array<any> | undefined = useAppSelector((state) => state.devicenew.devices);

    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    })
    const SelectCategory = (value: string) => {
        setCatedevice(value)
    }




    const addDevice = async () => {

        var check: boolean = false
        for (var index: number = 0; index < devices.length; index = index + 1) {
            if (devices[index].deviceID === deviceId) {
                check = true
            }
        }


        if (deviceIP === '' || deviceName === '' || deviceId === '' || selectedItems.length === 0 || deviceusername === '' || devicepassword === '' || catedevice === '') {
            message.error('Vui lòng điền các trường còn trống!')
        }
        else if (check) {
            message.warning('Mã thiết bị đã tồn tại!')
        }
        else {
            const body: deviceProps = {
                deviceIP: deviceIP,
                deviceName: deviceName,
                deviceID: deviceId,
                deviceStatus: true,
                deviceConnect: true,
                devicecategory: catedevice,
                detail: 'chi tiết',
                update: 'cập nhật',
                services: selectedItems,
                username: deviceusername,
                password: devicepassword
            }
            const bodyHistory: historyProps = {
                username: usercurrent?.email,
                time: time,
                IP: '192.168.1.10',
                action: `Thêm thông tin thiết bị ${deviceName} `
            }
            dispatch(createHistorys(bodyHistory))
            dispatch(createDevice(body))


            navigate('/device')
        }

    }
    const CanCel = () => {
        navigate('/device')
    }
    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={[routerViewDevice, routerViewAddDevice]} />
            <div className="add_device">
                <div className="title__add">
                    {formatMessage('common.deviceql')}
                </div>
                <div className="content__add">
                    <div className="sub__title__add">
                        {formatMessage('common.deviceinfo')}
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceID')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceType')} <span style={{ color: 'red' }}>*</span></p>


                                <Select defaultValue="Chọn dịch vụ" onChange={SelectCategory} suffixIcon={<AiFillCaretDown />} >
                                    <Option value='Kiosk' >{formatMessage('common.kiosk')}</Option>
                                    <Option value='displaycounter' >{formatMessage('common.displaycounter')}</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceName')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.history.username')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" onChange={(event) => setDeviceusername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceIP')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" onChange={(event) => setDeviceIP(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setDevicepassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <p className="name__add">{formatMessage('common.serviceuse')} <span style={{ color: 'red' }}>*</span></p>
                            <Select
                                className="add__service"
                                mode="multiple"
                                placeholder='Nhập dịch vụ sử dụng'
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={filteredOptions.map(item => ({
                                    value: item,
                                    label: item,
                                }))}
                            />
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={CanCel}>
                        {formatMessage('common.cancell')}
                    </div>
                    <div className="btn__add btn__add_device" onClick={addDevice}>
                        {formatMessage('common.adddevice')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDevice