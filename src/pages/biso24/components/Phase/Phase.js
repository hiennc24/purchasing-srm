import React from 'react'
import './Phase.scss';
import { Divider, List, Tooltip } from 'antd';
import { ExclamationCircleOutlined, MoreOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'; 

export default function Phase(props) {
  const {handleSetPhaseSelected, fakeData} = props;
  // console.log(fakeData);
  return (
    <div className="phase">
       <List
          itemLayout="horizontal"
          dataSource={fakeData}
          renderItem={item => (
            <List.Item onClick = {() => handleSetPhaseSelected(item.phaseId)} key={item.phaseId}>
              <List.Item.Meta
                className='phase__meta'
                title={
                  <div className="d-flex justify-content-between">
                    <a>{item.name}</a>
                    <Tooltip title="Chỉnh sửa">
                      <ExclamationCircleOutlined />{' '}
                      <MoreOutlined />
                    </Tooltip>
                  </div>
                }
                description={<p>{item.className}</p>}
              />
            </List.Item>
          )}
        />,
      <Divider style={{ margin: '0 10px 0 0', height: 20 }} />
    </div>
  )
}

Phase.propTypes  = {
  handleSetPhaseSelected : PropTypes.any,
  fakeData: PropTypes.any,
}
