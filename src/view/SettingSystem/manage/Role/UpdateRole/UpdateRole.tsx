
import React, { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerViewUpdateRole } from './router';
import { Input, Checkbox } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { onAuthStateChanged } from 'firebase/auth'
import { createHistorys } from '@modules/history/historyStore';
import { FirebaseConfig } from 'src/firebase/configs';
import { createRoles } from '@modules/rolenew/rolenewStore';
import { useParams } from 'react-router';
import { updateRoles } from '@modules/rolenew/rolenewStore';
import { routerViewRole } from '../router';
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
const UpdateRole = () => {
    const { formatMessage } = useAltaIntl();
    const navigate = useNavigate()
    const auth = FirebaseConfig.getInstance().auth
    const dispatch = useAppDispatch()

    const idd = useParams()
    let id: any = idd.id
    const roles: Array<any> | undefined = useAppSelector((state) => {
        return state.role.roles
    });
    const role = roles?.find((value) => value.id == id);

    const [usercurrent, setUsercurrent] = useState<AuthUser | any>(null)
    const [name, setName] = useState<string>(role.name)
    const [description, setDescription] = useState<string>(role.description)
    const [permitViewDevice, setPermitViewDevice] = useState(role.permitViewDevice)
    const [permitDetailDevice, setpermitDetailDevice] = useState(role.permitDetailDevice)
    const [permitAddDevice, setPermitAddDevice] = useState(role.permitAddDevice)
    const [permitUpdateDevice, setPermitUpdateDevice] = useState(role.permitUpdateDevice)

    const [permitViewService, setPermitViewService] = useState(role.permitViewService)
    const [permitAddService, setPermitAddService] = useState(role.permitAddService)
    const [permitDetailService, setPermitDetailService] = useState(role.permitDetailService)
    const [permitUpdateService, setpermitUpdateService] = useState(role.permitUpdateService)

    const [permitViewNumber, setPermitViewNumber] = useState(role.permitViewNumber)
    const [permitDetailNumber, setPermitDetailNumber] = useState(role.permitDetailNumber)
    const [permitAddNumber, setpermitAddNumber] = useState(role.permitAddNumber)

    const [permitViewReport, setpermitViewRport] = useState(role.permitViewReport)

    const [permitViewRole, setPermitViewRole] = useState(role.permitViewRole)
    const [permitAddRole, setPermitAddRole] = useState(role.permitAddRole)
    const [permitUpdateRole, setpermitUpdateRole] = useState(role.permitUpdateRole)

    const [permitViewAccount, setPermitViewAccount] = useState(role.permitViewAccount)
    const [permitAddAccount, setpermitAddAccount] = useState(role.permitAddAccount)
    const [permitUpdateAccount, setPermitUpdateAccount] = useState(role.permitUpdateAccount)

    const [permitViewHistory, setPermitViewHistory] = useState(role.permitViewHistory)





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
    const handleAddRole = () => {
        const idRole = id
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
        console.log(body);

        const bodyHistory: historyProps = {
            username: usercurrent?.email,
            time: time,
            IP: '192.168.1.10',
            action: `Cập nhật thông tin vai trò ${name}`
        }

        dispatch(updateRoles({ idRole, body }))
        dispatch(createHistorys(bodyHistory))
        navigate('/setting/manage/role')
    }

    return (
        <div className="addrole__page">
            <MainTitleComponent breadcrumbs={[routerViewRole, routerViewUpdateRole]} />
            <div className='title__addrole'>{formatMessage('common.roles')}</div>
            <div className='main_page'>
                <div className='name__addrole'>{formatMessage('common.roleinfo')}</div>
                <div className='content'>
                    <div className='info_role'>
                        <p className="name__add">{formatMessage('common.role.namerole')} <span style={{ color: 'red' }}>*</span></p>
                        <Input className='add__input' defaultValue={name} onChange={(event) => setName(event.target.value)} />
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
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewDevice} onChange={(event) => setPermitViewDevice(event.target.checked)}>
                                {formatMessage('common.roleviewdevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitDetailDevice} onChange={(event) => setpermitDetailDevice(event.target.checked)}>
                                {formatMessage('common.roledetailedevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitAddDevice} onChange={(event) => setPermitAddDevice(event.target.checked)}>
                                {formatMessage('common.roleadđevice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitUpdateDevice} onChange={(event) => setPermitUpdateDevice(event.target.checked)}>
                                {formatMessage('common.roleupdatedevice')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleservice')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewService} onChange={(event) => setPermitViewService(event.target.checked)}>
                                {formatMessage('common.roleviewservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitDetailService} onChange={(event) => setPermitDetailService(event.target.checked)}>
                                {formatMessage('common.roledetailservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitAddService} onChange={(event) => setPermitAddService(event.target.checked)}>
                                {formatMessage('common.roleaddservice')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitUpdateService} onChange={(event) => setpermitUpdateService(event.target.checked)}>
                                {formatMessage('common.roleupdateservice')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleprovidenumber')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewNumber} onChange={(event) => setPermitViewNumber(event.target.checked)}>
                                {formatMessage('common.roleviewprovidenumber')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitDetailNumber} onChange={(event) => setPermitDetailNumber(event.target.checked)}>
                                {formatMessage('common.roledetailprovidenumber')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitAddNumber} onChange={(event) => setpermitAddNumber(event.target.checked)}>
                                {formatMessage('common.roleaddprovidenumber')}
                            </Checkbox>

                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.rolereport')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewReport} onChange={(event) => setpermitViewRport(event.target.checked)}>
                                {formatMessage('common.roleviewreport')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleroles')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewRole} onChange={(event) => setPermitViewRole(event.target.checked)}>
                                {formatMessage('common.roleview')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitAddRole} onChange={(event) => setPermitAddRole(event.target.checked)}>
                                {formatMessage('common.roleadd')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitUpdateRole} onChange={(event) => setpermitUpdateRole(event.target.checked)}>
                                {formatMessage('common.roleupdate')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.roleaccount')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewAccount} onChange={(event) => setPermitViewAccount(event.target.checked)}>
                                {formatMessage('common.roleviewaccount')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitAddAccount} onChange={(event) => setpermitAddAccount(event.target.checked)}>
                                {formatMessage('common.roleaddaccount')}
                            </Checkbox>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitUpdateAccount} onChange={(event) => setPermitUpdateAccount(event.target.checked)}>
                                {formatMessage('common.roleupdateaccount')}
                            </Checkbox>
                        </div>
                        <div className='function'>
                            <div className='title_function'>{formatMessage('common.rolehistory')}</div>
                            <Checkbox className='checkbox' style={{ marginLeft: 9 }} checked={permitViewHistory} onChange={(event) => setPermitViewHistory(event.target.checked)}>
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
                <div className='btn-add' onClick={handleAddRole}>
                    {formatMessage('common.update')}
                </div>
            </div>
        </div>
    );
};

export default UpdateRole;
