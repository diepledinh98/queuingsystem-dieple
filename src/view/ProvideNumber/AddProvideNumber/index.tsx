import './style.scss';

import { message, Space } from 'antd';
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
import './AddNumber.scss'
import { routerViewProvideNumber } from '../router';
import { Select } from 'antd';
import { IModal } from '../../Homepage/interface';
import { routerViewAddProvideNumber } from './router';
import { Button, Modal } from 'antd';
import ModalNumber from './ModalNumber';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { createProvideNumber } from '@modules/providenumber/numberStore';
import { fetchServices } from '@modules/service/serviceStore';
import { fetchAccounts } from '@modules/account/accoutStore';
import { useAppSelector, useAppDispatch } from '@shared/hook/reduxhook';

import { AiFillCaretDown } from 'react-icons/ai';
import moment from 'moment';
interface TypeDevices {
    id?: string
    deviceID?: string
    deviceName?: string
    deviceIP?: string
    deviceStatus?: boolean
    deviceConnect?: boolean
    devicecategory: string
    services?: string[]
    detail?: string
    update?: string
}
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

const ProvideNumber = () => {
    const { formatMessage } = useAltaIntl();
    const db = FirebaseConfig.getInstance().fbDB
    const { Option, OptGroup } = Select;
    const dispatch = useAppDispatch()


    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idService, setIdService] = useState('')
    const [stt, setStt] = useState(2001203)
    const [sername, setSername] = useState<provideNumberProps>()
    const navigate = useNavigate();
    var presentDate = new Date();
    var date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    var time = moment(presentDate).format('HH:mm - DD/MM/YYYY')
    var dated = moment(date).format('HH:mm - DD/MM/YYYY')
    const services: Array<any> = useAppSelector((state) => {
        return state.service.services
    });

    const providedNumber = useAppSelector((state) => state.providenumber.providedNumber)
    const customers: Array<accountStore> | any = useAppSelector((state) => {
        return state.account.accounts
    });
    const devices: Array<accountStore> | any = useAppSelector((state) => {
        return state.devicenew.devices
    });

    const str: number = customers?.length
    const indexCustomer = Math.floor(Math.random() * (str + 1))
    const indexdevices = Math.floor(Math.random() * (devices.length + 1))
    useEffect(() => {
        dispatch(fetchServices())
        dispatch(fetchAccounts())
    }, [])
    const handleChange = (value: string) => {
        setIdService(value)

    };
    const Cancel = () => {
        navigate('/provide')
    }
    const showModal = async () => {

        if (idService === '') {
            message.error('Bạn chưa chọn dịch vụ.')
        }
        else {
            var nameservice = services?.find((item) => item.id == idService);
            setSername(nameservice)
            const body: provideNumberProps = {
                linkServiceId: idService,
                status: 'waiting',
                stt: providedNumber,
                timeprovide: time,
                dateduse: dated,
                service: nameservice,
                devices: devices[indexdevices],
                customer: customers[indexCustomer]
            }
            console.log(body);

            dispatch(createProvideNumber(body))
            setOpen(true);
        }

    };



    const handleCancel = () => {
        setOpen(false);
        navigate('/provide')
    };


    return (
        <div className="addprovidenumber__page">
            <MainTitleComponent breadcrumbs={[routerViewProvideNumber, routerViewAddProvideNumber]} />
            <div className='title'>{formatMessage('common.qlprovidenumber')}</div>
            <div className='main__page'>
                <div>

                    <div className='title__page'>{formatMessage('common.addnewprovide')}</div>
                    <div className='title__select__service'>{formatMessage('common.dlkhlc')}</div>
                    <Select defaultValue="Chọn dịch vụ" onChange={handleChange} suffixIcon={<AiFillCaretDown />}>
                        {services?.map((service, index) => {
                            return (
                                <Option value={service.id} key={index}>{service.serviceName}</Option>
                            )
                        })}


                    </Select>
                </div>

                <div className='btn'>
                    <div className='btn__cancle' onClick={Cancel}>{formatMessage('common.cancell')}</div>
                    <div className='btn_inso' onClick={showModal}>{formatMessage('common.printnumber')}</div>
                </div>
            </div>



            <Modal
                open={open}


                onCancel={handleCancel}

            >
                <div className='modal_provide'>
                    <div className='content'>
                        <div className='title'>{formatMessage('common.sttprovided')}</div>
                        <div className='number'>{providedNumber - 1}</div>
                        <div className='service'> <span>({formatMessage('common.tq')})</span></div>
                    </div>

                </div>

                <div className='footer'>
                    <div className='time'>
                        <div className=''>{formatMessage('common.timeprovide')}: {time}</div>
                        <div className=''>{formatMessage('common.dated')}: {dated}</div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default ProvideNumber;
