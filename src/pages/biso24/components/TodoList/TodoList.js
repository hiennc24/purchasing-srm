import { Col, Row } from 'antd';
import DropdownStatusTodoList from 'components/Dropdown/DropdownStatusTodoList/DropdownStatusTodoList';
import { StarOutlined, MoreOutlined } from '@ant-design/icons';
import rankingIcon from 'assets/icons/ranking.png'
import buggetActiveIcon from 'assets/icons/bugget-active.png';
import clock from 'assets/icons/clock.png';
import './TodoList.scss';
import React, { useState, useEffect } from 'react';
import { List, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import AvatarUser from 'components/AvatarUser/AvatarUser.js';
import FieldPriority from 'components/Field/FieldPriority/FieldPriority.js'
import PropTypes from 'prop-types'; 

const ContainerHeight = 455;

export default function TodoList(props) {
    const {todoListData} = props;
    console.log(todoListData);
    const [data, setData] = useState([]);

    const appendData = () => {
        setData(todoListData.copyWithin(20));
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
    <div className='todoList'>
        <List  grid={{ gutter: 16 }}>
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="id"
                onScroll={onScroll}
            >
                {(item) => (
                
                <Row key={item.id}>
                    <List.Item>
                        <Card className="">
                            <Row className='todoList__title'>
                                <Col><MoreOutlined /></Col>
                                <Col><StarOutlined /></Col>
                                <Col style={{ paddingLeft: '16px' }}>
                                    <DropdownStatusTodoList />
                                </Col>
                                <Row>
                                    <p style={{ paddingLeft: '16px', fontStyle: 'italic', fontSize: '14px' }}>Name checklist</p>
                                </Row>
                            </Row>

                            <Row className='todoList__content'>
                                <Col span={6}>
                                    <Row>
                                        <Col span={4}>
                                            <img src={rankingIcon} alt="rankingIcon" />
                                        </Col>
                                        <Col span={20}>
                                        5.000.000.000 vnd
                                        </Col>
                                    </Row>
                                    </Col>

                                    <Col span={4}>
                                        <AvatarUser />
                                    </Col>

                                    <Col span={4}>
                                        <FieldPriority />
                                    </Col>

                                    <Col span={4}>
                                        <Row>
                                            <Col flex={4}>
                                                <img src={clock} alt="clock" />
                                            </Col>
                                            <Col flex={20}><p style={{ paddingLeft: 4 }}>25/10/21</p></Col>
                                        </Row>
                                    </Col>
                                    <Col span={6}>
                                        <Row>
                                            <Col span={4}>
                                                <img src={buggetActiveIcon} alt="bugget" />
                                            </Col>
                                            <Col span={20}>
                                                <p style={{ paddingLeft: 4 }}>10.000.000đ</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                        </Card>
                    </List.Item>
                </Row>
                )}
            </VirtualList>
        </List>
    </div>
  )
}

TodoList.propTypes  = {
    todoListData: PropTypes.any,
  }
  
