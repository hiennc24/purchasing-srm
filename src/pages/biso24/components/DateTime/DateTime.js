import React from 'react';
import { Col, Row, Input } from 'antd';
import './DateTime.scss';

export default function DateTime() {
  return (
    <div className="DateTime">
        <Row>
            <Col flex={2}>Start date</Col>
            <Col flex={3}><Input style={{width: 150, height: 25}}/></Col>
        </Row>
        <Row>
            <Col flex={2}>Start date</Col>
            <Col flex={3}><Input style={{width: 150, height: 25}}/></Col>
        </Row>
        <Row>
            <Col flex={2}>Start date</Col>
            <Col flex={3}><Input style={{width: 150, height: 25}}/></Col>
        </Row>
    </div>
  );
}