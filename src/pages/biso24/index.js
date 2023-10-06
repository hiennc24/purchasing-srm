import { Tooltip } from 'antd';
import {CalendarOutlined, ProfileOutlined} from '@ant-design/icons'
import {Row, Col} from 'antd';
import React from 'react';
import Classify from './components/Classify/Classify';
import DateTime from './components/DateTime/DateTime';
import Phase from './components/Phase/Phase';
import Task from './components/Task/Task';
import TodoList from './components/TodoList/TodoList';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DashedInput from 'components/Input/DashedInput/DashedInput.js';
import phasesData from './phaseData.js';
import taskListData from './taskListData.js';
import todoListData from './todoListData.js';
import PropTypes from 'prop-types';
import './styles.scss';

const menu = (
    <Menu>
      <Menu.Item>
        Dự án
      </Menu.Item>
      <Menu.Item>
        Chiến dịch
      </Menu.Item>
      <Menu.Item>
        Hợp đồng
      </Menu.Item>
      <Menu.Item>
        Vụ việc
      </Menu.Item>
    </Menu>
  );

// console.log(phasesData);
const handleCreatePhase = (e) =>{
    if(e.key === 'Enter'){
        const name = e.target.value;
        phasesData.push(name);
    }

}

const handleCreateTaskList = (e) =>{
    console.log('task lisk: ', e.target.value);
    if(e.key === 'Enter'){
        const name = e.target.value;
        taskListData.push(name);
    }
}

const handleCreateTodoList = (e) =>{
    console.log('todolist: ', e.target.value);
    if(e.key === 'Enter'){
        const name = e.target.value;
        todoListData.push(name);
    }
}
const handleSetPhaseSelected = (setPhaseId) =>{
    console.log(setPhaseId);
    const data = taskListData.map(item => item.phaseId);
    console.log(data);
}

export default function index() {
  return (
    <div className='ogsm'>
        <Row>
            <Col span={4} className='ogsm__content-left'>
               <div className='content'>
               <Col>
                    <Row>
                        <Col className="ogsm__background-panel ogsm__background-title" flex={23}> 
                            Phân loại: <span>Dự án</span>
                        </Col>
                        <Col className='ogsm__background-panel ogsm__background-title' flex={1}>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <DownOutlined style={{ color: '#FFFFFF', fontSize: 12 }}  />
                                </a>
                            </Dropdown>
                        </Col>
                        <Col span={24}>
                            <Classify />
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <Row>
                        <Col className='ogsm__background-panel ogsm__background-title' span={24}>
                            <CalendarOutlined />
                            <span className="span__child">Thời Gian</span>
                        </Col>
                        <Col span={24}>
                            <DateTime />
                        </Col>
                    </Row>
                </Col>

                <Row>
                    <Col span={24} className="ogsm__background-panel ogsm__background-title">
                        <ProfileOutlined />
                        <span className="span__child">Phase</span>
                    </Col>
                    <Col span={24}>
                        <Phase
                            handleSetPhaseSelected={handleSetPhaseSelected}
                            fakeData={phasesData}
                        />
                    </Col>
                    <Col className='ogsm__button-add'>
                    <div>
                        <Tooltip>
                            <DashedInput
                                onKeyDown={handleCreatePhase}
                                placeholder=" + Thêm phase mới"
                            />
                        </Tooltip>
                        </div>
                    </Col>
                </Row>
               </div>
            </Col>

            <Col span={8} className='ogsm__content-center'>
                <div className='content'>
                    <Row className='ogsm__background-panel'>
                        <Col flex={22} className="ogsm__background-title">Task list</Col>
                        <Col flex={2} style={{ color: '#FFFFFF', fontSize: 12 }}>7 in Phase / 20 Total</Col>
                    </Row>
                    <Row>
                    <Col span={24}> 
                            <Task  taskData={taskListData} />
                        </Col>
                    </Row>
                    <Row className='add-task'>
                        <Tooltip title="pressEnterToAddPhase">
                            <input
                                className="add-phase-input"
                                type="text"
                                placeholder=" + Thêm tasklist mới"
                                onKeyDown={handleCreateTaskList}
                            />
                        </Tooltip>
                    </Row>
                </div>
            </Col>
            <Col span={12} className='ogsm__content-right'>
                <div>
                    <Row className="ogsm__background-todo-list">
                        <Col flex={22} className="ogsm__background-title">To do list</Col>
                        <Col flex={2}>6 in Task / 7 in Phase / 120 Total</Col>
                    </Row>
                    <Row>
                        <Col span={24}><TodoList todoListData = {todoListData} /> </Col>
                    </Row>
                    <Row>
                        <div>
                            <DashedInput 
                                placeholder =" + Thêm todoList mới" 
                                onKeyDown={handleCreateTodoList}
                                />
                        </div>
                    </Row>
                    <Row>
                        <Col span={24} className="ogsm__background-list-to-do"></Col>
                    </Row>
                </div>
                
            </Col>
        </Row>
    </div>
  )
}

index.propTypes = {
    handleSetPhaseSelected : PropTypes.any,
}
  
  