import React from 'react';
import { Divider } from 'antd';
import './Classify.scss';
// import userIcon from 'assets/images/user-outline.svg';
import rankingIcon from 'assets/icons/ranking.png';
import buggetActiveIcon from 'assets/icons/bugget-active.png';
import {Row, Col} from 'antd';

export default function Classify() {
  return (
    <div className="classify">
      <Row>
          <Col span={24}    >
            <p>
            Đối tác:{' '}
            <span style={{ fontWeight: 'bold', color: '#32A1C8' }}>
                Công ty cổ phần công nghệ ABC
            </span>
            </p>
            <Divider style={{ margin: '10px 0' }} />
          </Col>
      </Row>
      <Row>
        <Col flex={1}>Admin:</Col>
        <Col flex={4}>
            {/* <img className="classify__img-item" src={} alt="" /> */}
            Mr.ABC
        </Col>
      </Row>

      <Row>
        <Col flex={1}>Value:</Col>
        <Col flex={10}>
            <img style={{ paddingRight: 8 }} src={rankingIcon} alt="ranking" />
            N/A
        </Col>
      </Row>

      <Row>
        <Col flex={1}>Budget:</Col>
        <Col flex={10}>
            <img
                style={{ paddingRight: 8 }}
                src={buggetActiveIcon}
                alt="bugget"
              />
              -
        </Col>
      </Row>
      <Row>
          <Col><p style={{ fontStyle: 'italic', color: '#32A1C8' }}>Attach file:</p></Col>
      </Row>
    </div>
  )
}
