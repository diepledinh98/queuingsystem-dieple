import './AddRole.scss'
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerViewAddRole } from './router';
import { Input, Checkbox, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { onAuthStateChanged } from 'firebase/auth'
import { createHistorys } from '@modules/history/historyStore';
import { FirebaseConfig } from 'src/firebase/configs';
import { createRoles } from '@modules/rolenew/rolenewStore';

const { TextArea } = Input;
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
const AddRole = () => {
    const { formatMessage } = useAltaIntl();
    const navigate = useNavigate()
    const auth = FirebaseConfig.getInstance().auth
    const dispatch = useAppDispatch()
    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [permitViewDevice, setPermitViewDevice] = useState<boolean>(false)
    const [permitDetailDevice, setpermitDetailDevice] = useState<boolean>(false)
    const [permitAddDevice, setPermitAddDevice] = useState<boolean>(false)
    const [permitUpdateDevice, setPermitUpdateDevice] = useState<boolean>(false)

    const [permitViewService, setPermitViewService] = useState<boolean>(false)
    const [permitAddService, setPermitAddService] = useState<boolean>(false)
    const [permitDetailService, setPermitDetailService] = useState<boolean>(false)
    const [permitUpdateService, setpermitUpdateService] = useState<boolean>(false)

    const [permitViewNumber, setPermitViewNumber] = useState<boolean>(false)
    const [permitDetailNumber, setPermitDetailNumber] = useState<boolean>(false)
    const [permitAddNumber, setpermitAddNumber] = useState<boolean>(false)

    const [permitViewReport, setpermitViewRport] = useState<boolean>(false)

    const [permitViewRole, setPermitViewRole] = useState<boolean>(false)
    const [permitAddRole, setPermitAddRole] = useState<boolean>(false)
    const [permitUpdateRole, setpermitUpdateRole] = useState<boolean>(false)

    const [permitViewAccount, setPermitViewAccount] = useState<boolean>(false)
    const [permitAddAccount, setpermitAddAccount] = useState<boolean>(false)
    const [permitUpdateAccount, setPermitUpdateAccount] = useState<boolean>(false)

    const [permitViewHistory, setPermitViewHistory] = useState<boolean>(false)

    var presentDate = new Date();
    var date = presentDate.getDate()
    var month = presentDate.getMonth()
    var year = presentDate.getFullYear()
    var hour = presentDate.getHours()
    var minutes = presentDate.getMinutes()

    var time = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes} - ${date < 10 ? `0${date}` : date}/${month < 10 ? `0${month}` : month}/${year}`
    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setUsercurrent(curr)
        })
    }, [])

    const handleCancel = () => {
        navigate('/setting/manage/role')
    }
    const handleUpdateRole = () => {

        if (name === '' || description === '') {
            message.error('Vui lòng điền các trường con trống!')
        }
        else {
            const body: roleType = {
                name: name,
                description: description,

                permitViewDevice: permitViewDevice,
                permitDetailDevice: permitDetailDevice,
                permitAddDevice: permitAddDevice,
                permitUpdateDevice: permitUpdateDevice,

                permitViewService: permitViewService,
                permitAddService: permitAddService,
                permitDetailService: permitDetailService,
                permitUpdateService: permitUpdateService,

                permitViewNumber: permitViewNumber,
                permitDetailNumber: permitDetailNumber,
                permitAddNumber: permitAddNumber,

                permitViewReport: permitViewReport,

                permitViewRole: permitViewRole,
                permitAddRole: permitAddRole,
                permitUpdateRole: permitUpdateRole,

                permitViewAccount: permitViewAccount,
                permitAddAccount: permitAddAccount,
                permitUpdateAccount: permitUpdateAccount,

                permitViewHistory: permitViewHistory
            }
            const bodyHistory: historyProps = {
                username: usercurrent?.email,
                time: time,
                IP: '192.168.1.10',
                action: `Thêm thông tin vai trò ${name}`
            }

            dispatch(createRoles(body))
            dispatch(createHistorys(bodyHistory))
            navigate('/setting/manage/role')
        }

    }

    return (
        <div className="addrole__page">
            <MainTitleComponent breadcrumbs={routerViewAddRole} />
            <div className='title__addrole'>{formatMessage('common.roles')}</div>
            <div className='main_page'>
                <div className='name__addrole'>{formatMessage('common.roleinfo')}</div>
                <div className='content'>
                    <div className='info_role'>
                        <p className="name__add">{formatMessage('common.role.namerole')} <span style={{ color: 'red' }}>*</span></p>
                        <Input className='add__input' onChange={(event) => setName(event.target.value)} />
                        <p>{formatMessage('common.role.description')}: <span style={{ color: 'red' }}>*</span></p>
                        <TextArea
                            defaultValue={description}
                            onChange={(event) => setDescription(event.target.value)}
                            // onChange={(event) => setDescription(event.target.value)}
                            style={{ height: 120, resize: 'none' }}
                            className="textarea"
                        />

                    </div>

                    <div className='func_role'>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roledevice')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewDevice(event.target.checked)}>
                                {formatMessage('common.roleviewdevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitDetailDevice(event.target.checked)}>
                                {formatMessage('common.roledetailedevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitAddDevice(event.target.checked)}>
                                {formatMessage('common.roleadđevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitUpdateDevice(event.target.checked)}>
                                {formatMessage('common.roleupdatedevice')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleservice')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewService(event.target.checked)}>
                                {formatMessage('common.roleviewservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitDetailService(event.target.checked)}>
                                {formatMessage('common.roledetailservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitAddService(event.target.checked)}>
                                {formatMessage('common.roleaddservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitUpdateService(event.target.checked)}>
                                {formatMessage('common.roleupdateservice')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleprovidenumber')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewNumber(event.target.checked)}>
                                {formatMessage('common.roleviewprovidenumber')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitDetailNumber(event.target.checked)}>
                                {formatMessage('common.roledetailprovidenumber')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitAddNumber(event.target.checked)}>
                                {formatMessage('common.roleaddprovidenumber')}
                            </Checkbox>

                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.rolereport')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitViewRport(event.target.checked)}>
                                {formatMessage('common.roleviewreport')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleroles')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewRole(event.target.checked)}>
                                {formatMessage('common.roleview')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitAddRole(event.target.checked)}>
                                {formatMessage('common.roleadd')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitUpdateRole(event.target.checked)}>
                                {formatMessage('common.roleupdate')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleaccount')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewAccount(event.target.checked)}>
                                {formatMessage('common.roleviewaccount')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setpermitAddAccount(event.target.checked)}>
                                {formatMessage('common.roleaddaccount')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitUpdateAccount(event.target.checked)}>
                                {formatMessage('common.roleupdateaccount')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.rolehistory')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} onChange={(event) => setPermitViewHistory(event.target.checked)}>
                                {formatMessage('common.roleviewhistory')}
                            </Checkbox>

                        </div>
                    </div>
                </div>
            </div>

            <div className='btn'>
                <div className='btn-cancel' onClick={handleCancel}>
                    {formatMessage('common.cancell')}
                </div>
                <div className='btn-add' onClick={handleUpdateRole}>
                    {formatMessage('common.add')}
                </div>
            </div>
        </div>
    );
};

export default AddRole;
