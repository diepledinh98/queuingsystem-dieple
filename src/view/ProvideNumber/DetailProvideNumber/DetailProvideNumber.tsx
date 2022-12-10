import React from "react";
import MainTitleComponent from "@shared/components/MainTitleComponent";
import { routerViewDetailProvideNumber } from "./router";
import { Avatar, Col, Row, Input, Select } from 'antd';
import { useParams } from "react-router";
import { useAppSelector } from "@shared/hook/reduxhook";
import { Link } from "react-router-dom";
import CircleLabel from '@shared/components/CircleLabel';
import { routerViewProvideNumber } from "../router";
import { useAltaIntl } from '@shared/hook/useTranslate';
import { RollbackOutlined } from "@ant-design/icons";
const DetailProvideNumber = () => {
    const { formatMessage } = useAltaIntl();
    const { id } = useParams()

    const providenumber: Array<any> | undefined = useAppSelector((state) => {
        return state.providenumber.Number
    });
    const provide = providenumber?.find((value) => value.id == id);
    return (
        <div className='detail__device_page'>
            <MainTitleComponent breadcrumbs={[routerViewProvideNumber, routerViewDetailProvideNumber]} />
            <div className="detail__device">
                <div className="title__detail__device">
                    Quản lý cấp số


                </div>
                <div className='d-flex'>

                    <div className="content__detail__device">
                        <div className="title_info__device">
                            Thông tin cấp số
                        </div>
                        <div >
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Họ tên:</Col>
                                        <Col flex="auto" className="text__info">{provide.customer.username}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Nguồn cấp:</Col>
                                        <Col flex="auto" className="text__info">Kiosk</Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Tên dịch vụ:</Col>
                                        <Col flex="auto" className="text__info">{provide.service.serviceName}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Trạng thái:</Col>
                                        <Col flex="auto" className="text__info">

                                            <CircleLabel text={formatMessage('common.statuswaiting')} colorCode="blue" />
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Số thứ tự:</Col>
                                        <Col flex="auto" className="text__info">{provide.stt}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Số điện thoại:</Col>
                                        <Col flex="auto" className="text__info">{provide.customer.phone}</Col>
                                    </Row>
                                </Col>

                            </Row>

                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Thời gian cấp:</Col>
                                        <Col flex="auto" className="text__info">{provide.timeprovide}</Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Địa chỉ Email:</Col>
                                        <Col flex="auto" className="text__info">{provide.customer.email}</Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row justify="start" style={{ marginLeft: 24, marginTop: 20 }}>
                                <Col span={12}>
                                    <Row>
                                        <Col flex="130px" className="text__info_name">Hạn sử dụng:</Col>
                                        <Col flex="auto" className="text__info">{provide.dateduse}</Col>
                                    </Row>
                                </Col>



                            </Row>
                        </div>
                    </div>
                    <Link to={`/provide`} className="update__device" >
                        <RollbackOutlined style={{ fontSize: 25 }} />
                        Quay lại
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default DetailProvideNumber