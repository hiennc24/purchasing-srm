import { Dropdown, Menu, Input, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import linkFieldIcon from 'assets/icons/link-field.png';
import PropTypes from 'prop-types';
import './style.scss';

const FieldLink = ({value, onSubmit,className}) => {
  const [visible, setVisible] = useState(false);
  const [isShowOverlay, setIsShowOverlay] = useState(0);
  const [webAddress, setWebAddress] = useState(value?.url);
  const [webName, setWebName] = useState(value?.displayText);
  const [textWeb, setTextWeb] = useState('');
  const [linkObject, setLinkObject] = useState(null);

  useEffect(() => {
    if (value) {
      if (value.url) setWebAddress(value.url);
      if (value.displayText) setWebName(value.displayText);
    }
  }, [value]);

  const showOverlay = () => {
    setIsShowOverlay(1);
  };
  const hideOverLay = () => {
    setIsShowOverlay(0);
  };

  const handleMenuClick = (e) => {
    if (e.key === '3' || e.key === '4') {
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
    if (!flag) {
      const newValue = { ...value };
      if (webAddress) {
        const tmpWebAddress = webAddress;
        if (tmpWebAddress.slice(0, 5) === 'http:') {
          setWebAddress(tmpWebAddress);
          if (webName) {
            setTextWeb(webName);
          } else {
            setTextWeb(tmpWebAddress);
          }
          newValue.url = tmpWebAddress;
          newValue.displayText = webName;
        } else {
          setWebAddress(`http://${tmpWebAddress}`);
          if (webName) {
            setTextWeb(webName);
          } else {
            setTextWeb(`http://${tmpWebAddress}`);
          }
          newValue.url = `http://${tmpWebAddress}`;
          newValue.displayText = webName;
        }
      } else {
        setTextWeb('');
      }
      onSubmit(newValue);
      setLinkObject(newValue);
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{ paddingTop: '0px', width: '250px' }}
    >
      <div className="field-link__menu">
        <div className="field-link__menu-label">Web address</div>
        <Input
          placeholder="www.example.com"
          onChange={(e) => {
            let { value } = e.target;
            if (value && value.slice(0, 4) === 'http') {
              value = value.split('://')[1] || '';
            }
            setWebAddress(value);
          }}
        />
        <div className="field-link__menu-label">Text to display</div>
        <Input
          placeholder="Text to display"
          onChange={(e) => {
            setWebName(e.target.value);
          }}
        />
      </div>
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
    >
      <div
        className={`field-link ${className}`}
        onMouseOver={showOverlay}
        onMouseLeave={hideOverLay}
      >
        {linkObject ? (
          <div
            className={`field-link__overlay ${
              isShowOverlay === 0 ? '' : 'field-link__overlay-background'
            }`}
          >
            <Tooltip title={linkObject?.url || ''}>
              <div className="field-link__overlay-text">
                <a href={linkObject?.url || ''}
                  target="_blank"
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                  rel="noreferrer"
                >
                  {textWeb}
                </a>
              </div>
            </Tooltip>
          </div>
        ) : (
          <img className="opaciry-field-icon" src={linkFieldIcon} alt="link" />
        )}
      </div>
    </Dropdown>
  );
};

FieldLink.propTypes = {
  value: PropTypes.object,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldLink.defaultProps = {
  value: {
    url: '',
    displayText: '',
  },
  onSubmit: (newValue) => console.log(newValue),
  className: '',
};

export default FieldLink;
