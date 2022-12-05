import './style.scss';
import React, { Key, useEffect, useState } from 'react';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { routerHomepage } from './router';
import { DesktopOutlined, MessageOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { Select, Progress } from 'antd';
import ListOVerView from './component/ListOverView/ListOverView';
import CalendarOverview from './component/Calendar/Calendar';
import { fetchDevicesNew } from '@modules/devicenew/devicenewStore';
import { fetchServices } from '@modules/service/serviceStore';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import { fetchAccounts } from '@modules/account/accoutStore';
import { fetchRoles } from '@modules/rolenew/rolenewStore';
const { Option } = Select;
const Homepage = () => {
  const { formatMessage } = useAltaIntl();
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch()
  const devices = useAppSelector((state) => state.devicenew.devices)
  const services = useAppSelector((state) => state.service.services)
  const providenumbers = useAppSelector((state) => state.providenumber.Number)
  useEffect(() => {
    asyncFetch();
    dispatch(fetchRoles())
    dispatch(fetchDevicesNew())
    dispatch(fetchServices())
    dispatch(fetchProvideNumber())
    dispatch(fetchAccounts())
  }, [dispatch]);


  // resolve device
  var activeDevice: number = 0
  var notActiveDevice: number = 0

  for (var i: number = 0; i < devices.length; i = i + 1) {
    if (devices[i].deviceStatus === true) {
      activeDevice = activeDevice + 1;
    }
    else {
      notActiveDevice = notActiveDevice + 1
    }
  }

  // resolve services 
  var activeService: number = 0
  var notActiveService: number = 0

  for (var i: number = 0; i < services.length; i = i + 1) {
    if (services[i].serviceStatus === true) {
      activeService = activeService + 1;
    }
    else {
      notActiveService = notActiveService + 1
    }
  }

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  return (
    <div className="homepage">
      <div className='homepage_left'>
        <MainTitleComponent breadcrumbs={routerHomepage} />
        <ListOVerView />
        <div className='title'>
          {formatMessage('common.bieudocapso')}
        </div>


        <div className='chart_info'>
          <div className='info'>
            <div className='date'>
              <br />
              <span>
                {formatMessage('common.thangchart')} 11/2021
              </span>
            </div>
            <div className='select'>

              <Select defaultValue="Ngày">
                <Option> {formatMessage('common.day')}</Option>
                <Option> {formatMessage('common.week')}</Option>
                <Option> {formatMessage('common.thangchart')}</Option>

              </Select>
            </div>
          </div>
          <div className='chart'>

            <Area {...config} />
          </div>
        </div>
      </div>
      <div className='homepage_right'>
        <div className='title_right'>
          {formatMessage('common.tqq')}
        </div>
        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={Math.ceil((activeDevice / devices.length) * 100)} className="device_out" strokeColor={{ '#FF7506': '#FF7506' }} width={60} style={{ top: 11, left: 16, position: 'absolute' }} />
            <Progress type="circle" percent={Math.ceil((notActiveDevice / devices.length) * 100)} className="device_in" width={50} style={{ top: 16, left: 21, position: 'absolute' }} strokeColor={{ '#7E7D88': '#7E7D88' }} />
          </div>
          <div className='tq_name' style={{ color: '#FF7506' }}>
            {devices.length}
            <span>
              <DesktopOutlined style={{ marginRight: 2 }} />
              {formatMessage('common.device')}
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.statusActive')}
              </div>
              <div className='info_item_number'>
                {activeDevice}
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.statusNotActive')}
              </div>
              <div className='info_item_number'>
                {notActiveDevice}
              </div>
            </div>
          </div>
        </div>

        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={Math.ceil((activeService / services.length) * 100)} className="device_out" width={60} style={{ top: 11, left: 16, position: 'absolute' }} />
            <Progress type="circle" percent={Math.ceil((notActiveService / services.length) * 100)} className="device_in" width={50} style={{ top: 16, left: 21, position: 'absolute' }} strokeColor={{ '#7E7D88': '#7E7D88' }} />
          </div>
          <div className='tq_name' >
            {services.length}
            <span style={{ color: '#4277FF' }}>
              <MessageOutlined style={{ marginRight: 2 }} />
              {formatMessage('common.service')}
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.statusActive')}
              </div>
              <div className='info_item_number' style={{ color: '#4277FF' }} >
                {activeService}
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.statusNotActive')}
              </div>
              <div className='info_item_number' style={{ color: '#4277FF' }}>
                {notActiveService}
              </div>
            </div>
          </div>
        </div>

        <div className='tq_item'>
          <div className='progress1'>
            <Progress type="circle" percent={0} className="device_out" width={60} style={{ top: 11, left: 16, position: 'absolute' }} strokeColor={{ '#35C75A': '#35C75A' }} />
            <Progress type="circle" percent={100} className="device_in" width={50} style={{ top: 16, left: 21, position: 'absolute' }} strokeColor={{ '#7E7D88': '#7E7D88' }} />
            <Progress type="circle" percent={0} className="device_inn" width={40} style={{ top: 22, left: 26, position: 'absolute' }} strokeColor={{ '#FF7506': '#FF7506' }} />
          </div>
          <div className='tq_name' style={{ color: '#35C75A' }}>
            {providenumbers.length}
            <span>
              <DatabaseOutlined style={{ marginRight: 2 }} />
              {formatMessage('common.provide.number')}
            </span>
          </div>
          <div className='tq_info'>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#FF7506' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.used')}
              </div>
              <div className='info_item_number' style={{ color: '#35C75A' }}>
                {0}
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.statuswaiting')}
              </div>
              <div className='info_item_number' style={{ color: '#35C75A' }}>
                {providenumbers.length}
              </div>
            </div>
            <div className='tq_info_item'>
              <div className='dot' style={{ backgroundColor: '#7E7D88' }}></div>
              <div className='info_item_name'>
                {formatMessage('common.bq')}
              </div>
              <div className='info_item_number' style={{ color: '#35C75A' }}>
                {0}
              </div>
            </div>
          </div>
        </div>



        <div className="site-calendar-demo-card">
          <CalendarOverview />
        </div>
      </div>


    </div>
  );
};

export default Homepage;
