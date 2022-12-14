import './style.scss';

import { Space, DatePicker, message } from 'antd';
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
import { Col, Row, Input, Checkbox, InputNumber } from 'antd';
import './style.scss'
import { useParams } from 'react-router';
import { useAppSelector } from '@shared/hook/reduxhook';
import { routerViewUpdateService } from './router';
import { async } from '@firebase/util';
import { FirebaseConfig } from 'src/firebase/configs';
import { updateService } from '@modules/service/serviceStore';
import { useAppDispatch } from '@shared/hook/reduxhook';
import { doc, updateDoc } from "firebase/firestore";
import { routerViewService } from '../router';
import { createHistorys } from '@modules/history/historyStore';
import { onAuthStateChanged } from 'firebase/auth'
import moment from 'moment';
interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}
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
const { TextArea } = Input;
const UpdateService = () => {
    const db = FirebaseConfig.getInstance().fbDB
    const auth = FirebaseConfig.getInstance().auth
    const { formatMessage } = useAltaIntl();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const idd = useParams()
    let id: any = idd.id

    const services: Array<any> | any = useAppSelector((state) => {
        return state.service.services
    });
    const service = services?.find((value) => value.id == id);

    const [serviceID, setServiceID] = useState(service.serviceID)
    const [serviceName, setServiceName] = useState(service.serviceName)
    const [description, setDescription] = useState(service.description)
    const [checkprefix, setCheckprefix] = useState(false)
    const [prefixNumber, setPrefixNumber] = useState(service.Prefix)
    const [checkautogrow, setCheckautogrow] = useState(false)
    const [autoNumberFrom, setAutoNumberFrom] = useState(service.Growauto[0])
    const [autoNumberTo, setAutoNumberTo] = useState(service.Growauto[1])
    const [surfix, setSurfix] = useState(false)
    const [numberSurfix, setNumberSurfix] = useState(service.Surfix)
    const [reset, setReset] = useState(service.Reset)
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)


    var presentDate = new Date();
    var time = moment(presentDate).format('HH:mm - DD/MM/YYYY')

    useEffect(() => {
        if (service.Growauto !== 0) {
            setCheckautogrow(true)
        }
        if (service.Prefix !== 0) {
            setCheckprefix(true)
        }
        if (service.Surfix !== 0) {
            setSurfix(true)
        }
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])

    const hanldeUpdateservice = async () => {

        var check: boolean = false
        for (var index: number = 0; index < services.length; index = index + 1) {
            if (serviceID !== service.serviceID && services[index].serviceID === serviceID) {
                check = true
            }
        }


        if (serviceID === '' || serviceName === '' || serviceName === '') {
            message.error('Vui l??ng ??i???n c??c tr?????ng c??n tr???ng!')
        }
        else if (check) {
            message.warning('M?? d???ch v??? ???? t???n t???i!')
        }
        else {
            const idService = id
            const body: serviceProps = {
                serviceID: serviceID,
                serviceName: serviceName,
                description: description,
                serviceStatus: true,
                Growauto: (checkautogrow ? [autoNumberFrom, autoNumberTo] : 0),
                Prefix: (checkprefix ? prefixNumber : 0),
                Surfix: (surfix ? numberSurfix : 0),
                Reset: reset,
                CreateAt: time
            }
            const bodyHistory: historyProps = {
                username: usercurrent?.email,
                time: time,
                IP: '192.168.1.10',
                action: `C???p nh???t th??ng tin d???ch v??? ${serviceName}`
            }

            dispatch(createHistorys(bodyHistory))
            dispatch(updateService({ idService, body }))
            navigate('/service')
        }
    }

    const handlecancle = () => {
        navigate('/service')
    }
    return (
        <div className="addservice__page">
            <MainTitleComponent breadcrumbs={[routerViewService, routerViewUpdateService]} />
            <div className='title__addservice'>
                Qu???n l?? d???ch v???
                <div className='box__addservice'>
                    <div className='title_box'>
                        Th??ng tin d???ch v???
                    </div>
                    <Row>
                        <Col span={12}>
                            <p>M?? d???ch v???: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' defaultValue={service.serviceID} onChange={(event) => setServiceID(event.target.value)} />
                            <p>T??n d???ch v???: <span style={{ color: 'red' }}>*</span></p>
                            <Input className='info__input' defaultValue={service.serviceName} onChange={(event) => setServiceName(event.target.value)} />
                        </Col>
                        <Col span={12}>
                            <p>M?? t???: <span style={{ color: 'red' }}>*</span></p>
                            <TextArea
                                defaultValue={service.description}
                                onChange={(event) => setDescription(event.target.value)}
                                style={{ height: 120, resize: 'none' }}
                                className="textarea"

                            />
                        </Col>
                    </Row>

                    <div className='provide__number'>
                        Quy t???c c???p s???
                        <div className='check' >
                            <Checkbox className='checkbox' checked={checkautogrow} style={{ marginLeft: 9 }} onChange={(event) => setCheckautogrow(event.target.checked)}>
                                T??ng t??? ?????ng t???:
                                <Input className="input__number" defaultValue={service?.Growauto[0]} onChange={(event) => setAutoNumberFrom(event.target.value)} />
                                ?????n
                                <Input className="input__number" defaultValue={service?.Growauto[1]} onChange={(event) => setAutoNumberTo(event.target.value)} />
                            </Checkbox>
                            <Checkbox className='checkbox' checked={checkprefix} onChange={(event) => setCheckprefix(event.target.checked)}>
                                Prefix:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue={service.Prefix} onChange={(event) => setPrefixNumber(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' checked={surfix} onChange={(event) => setSurfix(event.target.checked)}>
                                Surfix:
                                <Input className="input__number" style={{ marginLeft: 80 }} defaultValue={service.Surfix} onChange={(event) => setNumberSurfix(event.target.value)} />

                            </Checkbox>
                            <Checkbox className='checkbox' checked={reset} onChange={(event) => setReset(event.target.checked)}>
                                Reset m???i ng??y
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handlecancle}>
                        H???y b???
                    </div>
                    <div className="btn__add btn__add_device" onClick={hanldeUpdateservice}>
                        C???p nh???t
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateService;
