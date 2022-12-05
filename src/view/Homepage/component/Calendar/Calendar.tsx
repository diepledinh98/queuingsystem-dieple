import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Calendar, Col, Radio, Row, Select, Typography } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";

import LocaleProvider from "antd/lib/locale-provider";
import viVN from "antd/lib/locale-provider/az_AZ";
import { Moment } from "moment";
import './calendar.scss'
import React from "react";

const CalendarOverview: React.FC = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => { };

    return (
        <div className="site-calendar-customize-header-wrapper">
            <LocaleProvider locale={viVN}>
                <Calendar
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current.month(i);
                            //   months.push(localeData.monthsShort(current));
                        }
                        const year = value.year();
                        const month = value.month();

                        return (
                            <div style={{ padding: 8 }}>
                                <Typography
                                    className="calendar__overview-header"
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div
                                        className="calendar__overview-header-icon-left calendar__overview-header-icon"
                                        onClick={() => {
                                            const now = value.clone().month(value.month() - 1);
                                            onChange(now);
                                        }}
                                    >
                                        <LeftOutlined />
                                    </div>
                                    <div className="calendar__overview-header-moment">
                                        <Typography.Text className="calendar__overview-header-moment-date">
                                            {value.date()}
                                        </Typography.Text>{" "}
                                        <Typography.Text className="calendar__overview-header-moment-month">
                                            {months[month]}
                                        </Typography.Text>{" "}
                                        <Typography.Text className="calendar__overview-header-moment-year">
                                            {year}
                                        </Typography.Text>{" "}
                                    </div>
                                    <div
                                        className="calendar__overview-header-icon-right calendar__overview-header-icon"
                                        onClick={() => {
                                            const now = value.clone().month(value.month() + 1);
                                            onChange(now);
                                        }}
                                    >
                                        <RightOutlined />
                                    </div>
                                </Typography>
                                <Row gutter={8}></Row>
                            </div>
                        );
                    }}
                    onPanelChange={onPanelChange}
                />
            </LocaleProvider>
        </div>
    );
};

export default CalendarOverview;