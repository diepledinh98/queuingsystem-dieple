import './style.scss';

import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { Col, Row, Input, Checkbox, message } from 'antd';
import './style.scss'
import { FirebaseConfig } from 'src/firebase/configs';
import { routerViewAddService } from './router';
import { createService } from '@modules/service/serviceStore';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { onAuthStateChanged } from 'firebase/auth'
import { createHistorys } from '@modules/history/historyStore';
import { routerViewService } from '../router';
import moment from 'moment';
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    description: string
    Growauto?: number | string[]
    Prefix?: string | number
    Surfix?: string | number
    Reset?: boolean | number
    CreateAt: string
};
interface AuthUser {
    email: string,
}
interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}
const { TextArea } = Input;
const Service = () => {
    const { formatMessage } = useAltaIntl();
    const table = useTable();
    const db = FirebaseConfig.getInstance().fbDB
    const auth = FirebaseConfig.getInstance().auth
    const dispatch = useAppDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();
    const navigate = useNavigate();
    const idChooses = 'id'; //get your id here. Ex: accountId, userId,...

    const [serviceID, setServiceID] = useState('')
    const [serviceName, setServiceName] = useState('')
    const [description, setDescription] = useState('')
    const [checkprefix, setCheckprefix] = useState(false)
    const [prefixNumber, setPrefixNumber] = useState('0001')
    const [checkautogrow, setCheckautogrow] = useState(false)
    const [autoNumberFrom, setAutoNumberFrom] = useState('0001')
    const [autoNumberTo, setAutoNumberTo] = useState('9999')
    const [surfix, setSurfix] = useState(false)
    const [numberSurfix, setNumberSurfix] = useState('0001')
    const [reset, setReset] = useState(false)
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)

    const services = useAppSelector((state) => state.service.services)

    var presentDate = new Date();
    var time = moment(presentDate).format('HH:mm - DD/MM/YYYY')

    const handleCancel = () => {
        navigate('/service')
    }
    const handleAddService = async () => {

        var check: boolean = false
        for (var index: number = 0; index < services.length; index = index + 1) {
            if (services[index].serviceID === serviceID) {
                check = true
            }
        }


        if (serviceID === '' || serviceName === '' || serviceName === '') {
            message.error('Vui lòng điền các trường còn trống!')
        }
        else if (check) {
            message.warning('Mã dịch vụ đã tồn tại!')
        }
        else {
            const body: serviceProps = {
                serviceID: serviceID,
                serviceName: serviceName,
                description: serviceName,
                CreateAt: time,
                serviceStatus: true,
                Growauto: (checkautogrow ? [autoNumberFrom, autoNumberTo] : 0),
                Prefix: (checkprefix ? prefixNumber : 0),
                Surfix: (surfix ? numberSurfix : 0),
                Reset: reset
            }
            const bodyHistory: historyProps = {
                username: usercurrent?.email,
                time: time,
                IP: '192.168.1.10',
                action: `Thêm thông tin dịch vụ ${serviceName}`

            }

            dispatch(createService(body))
            dispatch(createHistorys(bodyHistory))
            navigate('/service')
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])
    return (
        <div className="addservice__page">
            <MainTitleComponent breadcrumbs={[routerViewService, routerViewAddService]} />
            <div className='title__addservice'>
                {formatMessage('common.serviceql')}
                <div className='box__addservice'>
                    <div className='title_box'>
                        {formatMessage('common.serviceinfo')}
                    </div>
                    <Row>
                        <Col span={12}>
                            <p>{formatMessage('common.serviceid')}: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' onChange={(event) => setServiceID(event.target.value)} />
                            <p>{formatMessage('common.servicename')}: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' onChange={(event) => setServiceName(event.target.value)} />
                        </Col>
                        <Col span={12}>
                            <p>{formatMessage('common.role.description')}: <span style={{ color: 'red' }}>*</span></p>
                            <TextArea

                                onChange={(event) => setDescription(event.target.value)}
                                style={{ height: 120, resize: 'none' }}
                                className="textarea"

                            />
                        </Col>
                    </Row>

                    <div className='provide__number'>
                        {formatMessage('common.syntaxprobide')}
                        <div className='check' >
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setCheckautogrow(event.target.checked)} >
                                {formatMessage('common.autofrow')}:
                                <Input className="input__number" defaultValue="0001" onChange={(event) => setAutoNumberFrom(event.target.value)} />
                                {formatMessage('common.to')}:
                                <Input className="input__number" defaultValue="9999" onChange={(event) => setAutoNumberTo(event.target.value)} />
                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setCheckprefix(event.target.checked)}>
                                {formatMessage('common.prefix')}:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue="0001" onChange={(event) => setPrefixNumber(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setSurfix(event.target.checked)}>
                                {formatMessage('common.surfix')}:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue="0001" onChange={(event) => setNumberSurfix(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' onChange={(event) => setReset(event.target.checked)}>
                                {formatMessage('common.reset')}
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancel}>
                        {formatMessage('common.cancell')}
                    </div>
                    <div className="btn__add btn__add_device" onClick={handleAddService}>
                        {formatMessage('common.addservice')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
