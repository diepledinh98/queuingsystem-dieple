import React from "react";
import { Space, Row, Col, Tag } from 'antd';
import { ArrowDownOutlined } from "@ant-design/icons";
import IconNumberProvied from "@shared/components/iconsComponent/IconNumberProvied";
import IconNumericalorderUsed from "@shared/components/iconsComponent/IconNumberOrdered";
import IconNumericalorderWait from "@shared/components/iconsComponent/IconNumberUserWait";
import IconNumericalorderSkiped from "@shared/components/iconsComponent/IconUserShiped";
import { useAltaIntl } from '@shared/hook/useTranslate';
import { useAppSelector } from "@shared/hook/reduxhook";
import './ListOVerView.scss'
const ListOVerView = () => {
    const providenumbers = useAppSelector((state) => state.providenumber.Number)
    const { formatMessage } = useAltaIntl();
    return (
        <Row className="homepage__list-information" gutter={13}>
            <Col span={6} className="homepage__item-information">
                <div className="homepage__item-information-card">
                    <div className="homepage__item-information-card-head">
                        <div className="homepage__item-information-card-head-icon">
                            <IconNumberProvied />
                        </div>
                        <span className="homepage__item-information-card-head-title">
                            {formatMessage('common.provided')}
                        </span>
                    </div>
                    <div className="homepage__item-information-card-body">
                        <span className="homepage__item-information-card-body-number">
                            {providenumbers.length}
                        </span>
                        <Tag
                            className="homepage__item-information-card-body-percen"
                            icon={<ArrowDownOutlined />}
                            style={{ marginBottom: 13 }}
                        >
                            32.4%
                        </Tag>
                    </div>
                </div>
            </Col>
            <Col span={6} className="homepage__item-information">
                <div className="homepage__item-information-card">
                    <div className="homepage__item-information-card-head">
                        <div className="homepage__item-information-card-head-icon">
                            <IconNumericalorderUsed />
                        </div>
                        <span className="homepage__item-information-card-head-title">
                            {formatMessage('common.provideused')}
                        </span>
                    </div>
                    <div className="homepage__item-information-card-body">
                        <span className="homepage__item-information-card-body-number">
                            {0}
                        </span>
                        <Tag
                            className="homepage__item-information-card-body-percen"
                            icon={<ArrowDownOutlined />}
                            style={{ marginBottom: 13 }}
                        >
                            32.4%
                        </Tag>
                    </div>
                </div>
            </Col>
            <Col span={6} className="homepage__item-information">
                <div className="homepage__item-information-card">
                    <div className="homepage__item-information-card-head">
                        <div className="homepage__item-information-card-head-icon">
                            <IconNumericalorderWait />
                        </div>
                        <span className="homepage__item-information-card-head-title">
                            {formatMessage('common.providewait')}
                        </span>
                    </div>
                    <div className="homepage__item-information-card-body">
                        <span className="homepage__item-information-card-body-number">
                            {providenumbers.length}
                        </span>
                        <Tag
                            className="homepage__item-information-card-body-percen"
                            icon={<ArrowDownOutlined />}
                            style={{ marginBottom: 13 }}
                        >
                            32.4%
                        </Tag>
                    </div>
                </div>
            </Col>
            <Col span={6} className="homepage__item-information">
                <div className="homepage__item-information-card">
                    <div className="homepage__item-information-card-head">
                        <div className="homepage__item-information-card-head-icon">
                            <IconNumericalorderSkiped />
                        </div>
                        <span className="homepage__item-information-card-head-title">
                            {formatMessage('common.provideskip')}
                        </span>
                    </div>
                    <div className="homepage__item-information-card-body">
                        <span className="homepage__item-information-card-body-number">
                            {0}
                        </span>
                        <Tag
                            className="homepage__item-information-card-body-percen"
                            icon={<ArrowDownOutlined />}
                            style={{ marginBottom: 13 }}
                        >
                            32.4%
                        </Tag>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ListOVerView