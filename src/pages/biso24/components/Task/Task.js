import { StarOutlined, MoreOutlined } from '@ant-design/icons';
import {Row, Col} from 'antd';
import rankingIcon from 'assets/icons/ranking.png';
import buggetActiveIcon from 'assets/icons/bugget-active.png';
import { Menu, Dropdown } from 'antd';
import React, { useState, useEffect } from 'react';
import { UserSwitchOutlined, PlusCircleOutlined, EditOutlined,CopyOutlined, DeleteOutlined, LockOutlined, SwapOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { List, Divider, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import AvatarGroup from 'components/AvatarGroup/AvatarGroup.js';
import FieldCheckbox from 'components/Field/FieldCheckbox/FieldCheckbox';
import FieldPriority from 'components/Field/FieldPriority/FieldPriority';
import FieldDate from 'components/Field/FieldDate/FieldDate';
import Icon from 'components/Icon/index';
import PropTypes from 'prop-types'; 
import './Task.scss';

// const iconStatus = {
//     done: <CheckCircleOutlined style={{ color: '#2FCE00' }} />,
//     doing: <PlayCircleOutlined style={{ color: '#272727' }} />,
//     pending: <CaretRightOutlined style={{ color: '#FEA800' }} />,
//   };

// console.log(fakeData.map(item => item.taskList.map(item => item)));

const menu = (
    <Menu>
      <Menu.Item>
        <PlusCircleOutlined /> Thêm mới
      </Menu.Item>
      <Menu.Item>
        <EditOutlined /> Chỉnh sửa
      </Menu.Item>
      <Menu.Item>
        <CopyOutlined /> Bản sao
      </Menu.Item>
      <Menu.Item>
        <DeleteOutlined /> Xóa
      </Menu.Item>
      <Menu.Item>
        <SwapOutlined /> Di chuyển
      </Menu.Item>
      <Menu.Item>
        <LockOutlined /> Khóa
      </Menu.Item>
    </Menu>
  );
  
const ContainerHeight = 550;

export default function Task(props) {
    const {taskData} = props;

    const [data, setData] = useState([]);

    const appendData = () => {
        setData(taskData.copyWithin(20));
    };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  return (
    <div className='task'>
         <List 
            grid={{ gutter: 16 }}
         >
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="TaskId"
                onScroll={onScroll}
            >
                {item => {
                    return (
                        <Row key={item.TaskId}>
                            <List.Item>
                                <Card>
                                    <Row className="task__title">
                                        <Col className='task__title--icon'>
                                            <Dropdown overlay={menu}>
                                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                <MoreOutlined />
                                                </a>
                                            </Dropdown>
                                        </Col>
                                        <Col className='task__title--icon'><StarOutlined /></Col>{' '}
                                        <Col>{item.nameTaskLIst}</Col>
                                    </Row>
                                    <Row className='task__content'>
                                        <Col flex={10}>
                                        <Row>
                                                <Col flex={2} style={{ color: '#32A1C8', fontWeight: 'bold' }}>
                                                       <Row>
                                                           <Col style={{marginRight: 10}}><FieldCheckbox /></Col>
                                                           <Col>5/5</Col>
                                                       </Row>
                                                </Col>
                                                <Divider type="vertical" />
                                                <Col flex={3} style={{ color: '#32A1C8', fontWeight: 'bold' }}>{item.percentLast}</Col>
                                            </Row>
                                            <Row>
                                                <Col flex={1}><FieldPriority /></Col>
                                                <Col flex={4}>
                                                    <span className="task__text-child" style={{
                                                    color: '#FF494E',
                                                    }}>
                                                        Hight
                                                    </span>
                                                </Col>
                                            </Row>
                                    
                                            <Row>
                                                <Col flex={1}>
                                                    <FieldDate />
                                                </Col>
                                                <Col flex={4}>
                                                    <span className="task__text-child"></span>
                                                </Col>
                                            </Row>
    
                                            <Row>
                                                <Col flex={1}> <UserSwitchOutlined /></Col>
                                                <Col flex={4}>
                                                    <Row>
                                                        <span className="task__text-child">
                                                            <AvatarGroup />
                                                        </span>
                                                    </Row>
                                                </Col>
                                            </Row>
    
                                            <Row>
                                                <Col flex={1}>
                                                    <Icon />
                                                </Col>
                                                <Col flex={4}>
                                                    Assignee
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Divider type="vertical" style={{height: 130, width: 10}} />
                                        <Col flex={14}>
                                            <Row>{item.description}</Row>
                                                <Row>
                                                    <Col span={24} className="task__detail">
                                                        <a style={{ fontStyle: 'italic', color: '#32A1C8' }}>Chi tiết</a>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Divider style={{ margin: '10px 0' }} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col flex={1}><img alt="ranking" src={rankingIcon} /></Col>
                                                    <Col flex={4}><span className="task__text-child">N/A</span></Col>
                                                </Row>
                                                <Row>
                                                    <Col flex={1}>
                                                        <img
                                                            style={{ paddingRight: 8 }}
                                                            src={buggetActiveIcon}
                                                            alt="bugget"
                                                    />
                                                    </Col>
                                                    <Col flex={4}>
                                                        <p>-</p>
                                                    </Col>
                                                </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </List.Item>
                        </Row>
                    )
                }}
            </VirtualList>
        </List>
    </div>
  )
}

Task.propTypes  = {
    taskData: PropTypes.any,
  }
  
