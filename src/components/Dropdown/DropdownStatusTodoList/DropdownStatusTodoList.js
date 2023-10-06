import { Dropdown, Menu } from 'antd';
import checkIcon from 'assets/icons/check.png';
import downGrayIcon from 'assets/icons/down-gray.png';
import downGreenIcon from 'assets/icons/down-green.png';
import downOrangeIcon from 'assets/icons/down-orange.png';
import rightIcon from 'assets/icons/right.png';
import PropTypes from 'prop-types';
// import 'containers/app/screens/Ogsm/components/TodoList/TodoList.sass';
import React from 'react';
import { useTranslation } from 'react-i18next';
import "./style.scss"

const defaultMenuStatus = [
  {
    key: 1,
    name: 'Pending',
    value: 'pending',
    color: '#FEA800',
  },
  {
    key: 2,
    name: 'Doing',
    value: 'doing',
    color: '#C4C4C4',
  },
  {
    key: 3,
    name: 'Done',
    value: 'done',
    color: '#2FCE00',
  },
];

const mapStatus = (value) => {
  return defaultMenuStatus.filter((item) => item.value === value)[0];
};

const DropdownStatusTodoList = ({ checklist }) => {
  const { t } = useTranslation();

  const menu = (
    <Menu className="checklist-dropdown-menu">
      {defaultMenuStatus.map((item) => {
        return (
          <Menu.Item
            className="priority_option"
            style={{ color: '#FFF', backgroundColor: item.color }}
            key={item.key}
            primary="true"
          >
            {t('checklist.' + item.value)}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className="checklist-priority-option">
        {checklist.status &&
          mapStatus(checklist.status) &&
          mapStatus(checklist.status).value === 'doing' && (
            <>
              <div
                className="checklist-priority-option-content"
                style={{
                  backgroundColor: checklist.status
                    ? mapStatus(checklist.status).color
                    : '#C4C4C4',
                }}
              >
                <img height={8} src={rightIcon} />
              </div>
              <div style={{ width: '10px' }}>
                <img src={downOrangeIcon} />
              </div>
            </>
          )}
        {checklist.status &&
          mapStatus(checklist.status) &&
          mapStatus(checklist.status).value === 'done' && (
            <>
              <div
                className="checklist-priority-option-content"
                style={{
                  backgroundColor: checklist.status
                    ? mapStatus(checklist.status).color
                    : '#2FCE00',
                }}
              >
                <img height={8} src={checkIcon} />
              </div>
              <div style={{ width: '10px' }}>
                <img src={downGreenIcon} />
              </div>
            </>
          )}
        {((checklist.status &&
          mapStatus(checklist.status) &&
          mapStatus(checklist.status).value === 'pending') ||
          !checklist.status ||
          !mapStatus(checklist.status)) && (
          <>
            <div
              className="checklist-priority-option-content"
              style={{
                backgroundColor:
                  checklist.status && mapStatus(checklist.status)
                    ? mapStatus(checklist.status).color
                    : '#FEA800',
              }}
            ></div>
            <div style={{ width: '10px' }}>
              <img src={downGrayIcon} />
            </div>
          </>
        )}
      </div>
    </Dropdown>
  );
};


DropdownStatusTodoList.propTypes = {
  checklist: PropTypes.object,
};

DropdownStatusTodoList.defaultProps = {
  checklist: {
    name: 'Doing',
    value: 'doing',
    color: '#C4C4C4',
  },
};

export default DropdownStatusTodoList
