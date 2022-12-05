import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerViewUpdateDevice } from './router'
import { Col, Row, Input, Select, message } from 'antd';
import './update_device.scss'
import { useParams } from 'react-router';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hook/reduxhook';
import { FirebaseConfig } from 'src/firebase/configs';
import { updateDevice } from '@modules/devicenew/devicenewStore';
import { useNavigate } from 'react-router';
import { createHistorys } from '@modules/history/historyStore';
import { onAuthStateChanged } from 'firebase/auth'
import { useAltaIntl } from '@shared/hook/useTranslate';
interface deviceProps {
    id?: string
    deviceID: string;
    deviceName: string;
    deviceIP: string;
    deviceStatus: boolean
    devicecategory: string;
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
const UpdateDevice = () => {
    const { formatMessage } = useAltaIntl();
    const db = FirebaseConfig.getInstance().fbDB
    const auth = FirebaseConfig.getInstance().auth
    const idd = useParams()
    let id: any = idd.id
    const devices: Array<any> | undefined = useAppSelector((state) => {
        return state.devicenew.devices;
    });
    const { Option, OptGroup } = Select;
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const device = devices?.find((value) => value.id == id);
    const OPTIONS = ['Khám tim mạch', 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng', 'Khám hô hấp', 'Khám tổng quát'];
    const [selectedItems, setSelectedItems] = useState<string[]>(device.services);
    const [deviceId, setDeviceId] = useState(device.deviceID)
    const [deviceName, setDeviceName] = useState(device.deviceName)
    const [catedevice, setCatedevice] = useState('')
    const [deviceIP, setDeviceIP] = useState(device.deviceIP)
    const [username, setUsername] = useState(device.username)
    const [password, setPassword] = useState(device.password)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)

    var presentDate = new Date();
    var date = presentDate.getDate()
    var month = presentDate.getMonth()
    var year = presentDate.getFullYear()
    var hour = presentDate.getHours()
    var minutes = presentDate.getMinutes()
    var seconds = presentDate.getSeconds()
    var time = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes} - ${date < 10 ? `0${date}` : date}/${month < 10 ? `0${month}` : month}/${year}`
    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])
    const SelectCategory = (value: string) => {
        setCatedevice(value)
    }
    const HandleCancel = () => {
        navigate('/device')
    }
    const HandleUpdate = async () => {

        const idDevice = id
        const body: deviceProps = {
            deviceIP: deviceIP,
            deviceName: deviceName,
            deviceID: deviceId,
            devicecategory: catedevice,
            deviceStatus: device.deviceStatus,
            deviceConnect: device.deviceConnect,
            detail: 'chi tiết',
            update: 'cập nhật',
            services: selectedItems,
            username: username,
            password: password
        }
        const bodyHistory: historyProps = {
            username: usercurrent?.email,
            time: time,
            IP: '192.168.1.10',
            action: `Cập nhật thông tin thiết bị ${deviceName} `
        }
        dispatch(createHistorys(bodyHistory))
        dispatch(updateDevice({ idDevice, body }))
        navigate('/device')

    }

    return (
        <div className='update__device_page'>
            <MainTitleComponent breadcrumbs={routerViewUpdateDevice} />
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
                                <p className="name__add">{formatMessage('common.deviceID')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" defaultValue={device.deviceID} onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceType')} <span style={{ color: 'red' }}>*</span></p>

                                <Select defaultValue={device.devicecategory} onChange={SelectCategory}>
                                    <Option value='Kiosk' >{formatMessage('common.kiosk')}</Option>
                                    <Option value='displaycounter' >{formatMessage('common.displaycounter')}</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceName')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" defaultValue={device?.deviceName} onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.history.username')}<span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" defaultValue={device?.username} onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.deviceIP')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" defaultValue={device?.deviceIP} onChange={(event) => setDeviceIP(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('common.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" defaultValue={device?.password} onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <p className="name__add">{formatMessage('common.serviceuse')} <span style={{ color: 'red' }}>*</span></p>
                            <Select
                                className="add__service"
                                mode="multiple"
                                placeholder="Nhập dịch vụ sử dụng"
                                onChange={setSelectedItems}
                                defaultValue={selectedItems}
                                options={filteredOptions.map(item => ({
                                    value: item,
                                    label: item,
                                }))}
                            />
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={HandleCancel}>
                        {formatMessage('common.cancell')}
                    </div>
                    <div className="btn__add btn__add_device" onClick={HandleUpdate}>
                        {formatMessage('common.update')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDevice