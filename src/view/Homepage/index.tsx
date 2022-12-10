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
import { AiFillCaretDown } from 'react-icons/ai';
import { values } from 'lodash';
const { Option } = Select;
const Homepage = () => {
  const { formatMessage } = useAltaIntl();
  const dispatch = useAppDispatch()
  const devices = useAppSelector((state) => state.devicenew.devices)
  const services = useAppSelector((state) => state.service.services)
  const providenumbers = useAppSelector((state) => state.providenumber.Number)
  const [selectChart, setSelectChart] = useState('week')
  useEffect(() => {

    dispatch(fetchRoles())
    dispatch(fetchDevicesNew())
    dispatch(fetchServices())
    dispatch(fetchProvideNumber())
    dispatch(fetchAccounts())
  }, [dispatch]);

  const handleChart = (values: string) => {
    setSelectChart(values)
  }
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

  //data days 
  var dataDays: { day: string; val: number; }[]
  dataDays = [
    { day: '01', val: 0 },
    { day: '02', val: 0 },
    { day: '03', val: 0 },
    { day: '04', val: 0 },
    { day: '05', val: 0 },
    { day: '06', val: 0 },
    { day: '07', val: 0 },
    { day: '08', val: 0 },
    { day: '09', val: 0 },
    { day: '10', val: 0 },
    { day: '11', val: 0 },
    { day: '12', val: 0 },
    { day: '13', val: 0 },
    { day: '14', val: 0 },
    { day: '15', val: 0 },
    { day: '16', val: 0 },
    { day: '17', val: 0 },
    { day: '18', val: 0 },
    { day: '19', val: 0 },
    { day: '20', val: 0 },
    { day: '21', val: 0 },
    { day: '22', val: 0 },
    { day: '23', val: 0 },
    { day: '24', val: 0 },
    { day: '25', val: 0 },
    { day: '26', val: 0 },
    { day: '27', val: 0 },
    { day: '28', val: 0 },
    { day: '29', val: 0 },
    { day: '30', val: 0 },
    { day: '31', val: 0 },
  ]

  for (var i: number = 0; i < dataDays.length; i = i + 1) {
    for (var j: number = 0; j < providenumbers.length; j = j + 1) {
      var dayset = Number(dataDays[i].day)
      var daynum = Number(providenumbers[j].timeprovide.slice(8, 10))
      if (Number(providenumbers[j].timeprovide.slice(11, 13)) === 12) {
        if (dayset === daynum) {
          dataDays[i].val = dataDays[i].val + 1
        }
      }
    }
  }

  // data chart week
  var dataWeek: { week: string; val: number; }[]
  dataWeek = [
    { week: 'Tuần 1', val: 0 },
    { week: 'Tuần 2', val: 0 },
    { week: 'Tuần 3', val: 0 },
    { week: 'Tuần 4', val: 0 },
  ]

  for (var index: number = 0; index < providenumbers.length; index = index + 1) {
    var month = Number(providenumbers[index].timeprovide.slice(11, 13));
    var day = Number(providenumbers[index].timeprovide.slice(8, 10))

    if (month === 11) {
      if (day >= 1 && day <= 8) { // tuan 1
        dataWeek[0].val = dataWeek[0].val + 1
      }
      if (day >= 9 && day <= 16) { // tuan 2
        dataWeek[1].val = dataWeek[1].val + 1
      }
      if (day >= 17 && day <= 24) {
        dataWeek[2].val = dataWeek[2].val + 1
      }
      if (day >= 25 && day <= 31) {
        dataWeek[3].val = dataWeek[3].val + 1
      }
    }
  }

  //data month 
  var dataMonths: { month: string; val: number; }[]
  dataMonths = [
    { month: '1', val: 0 },
    { month: '2', val: 0 },
    { month: '2', val: 0 },
    { month: '3', val: 0 },
    { month: '4', val: 0 },
    { month: '5', val: 0 },
    { month: '6', val: 0 },
    { month: '7', val: 0 },
    { month: '8', val: 0 },
    { month: '9', val: 0 },
    { month: '10', val: 0 },
    { month: '11', val: 0 },
    { month: '12', val: 0 },

  ]


  for (var i: number = 0; i < dataMonths.length; i = i + 1) {
    for (var j: number = 0; j < providenumbers.length; j = j + 1) {
      var monthset = Number(dataMonths[i].month)
      var monthnum = Number(providenumbers[j].timeprovide.slice(11, 13))
      if (monthset === monthnum) {
        dataMonths[i].val = dataMonths[i].val + 1
      }
    }
  }

  var dataset: any[] = []
  var xfield: string = 'week'
  if (selectChart === 'day') {
    dataset = dataDays
    xfield = 'day'
  }
  else if (selectChart === 'month') {
    dataset = dataMonths
    xfield = 'month'
  }
  else {
    dataset = dataWeek
    xfield = 'week'
  }


  const config = {
    dataset,
    xField: xfield,
    yField: 'val',
    smooth: true,
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
                {formatMessage('common.thangchart')} 11/2022
              </span>
            </div>
            <div className='select'>

              <Select defaultValue={selectChart} suffixIcon={<AiFillCaretDown />} onChange={handleChart}>
                <Option value='day'> {formatMessage('common.day')}</Option>
                <Option value='week'> {formatMessage('common.week')}</Option>
                <Option value='month'> {formatMessage('common.thangchart')}</Option>

              </Select>
            </div>
          </div>
          <div className='chart'>

            <Area data={dataset} {...config} />
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
