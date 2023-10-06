import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import './FieldSelectPhase.scss';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const FieldSelectPhase = ({value = null, defaultOptions, onSubmit, width, className}) => {
  const [valueText, setValueText] = useState(value ?? defaultOptions[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setValueText(value);
    return () => {};
  }, [value]);

  const overLay = (
    <div className={`select-text-overlay-container ${className}`}>
      <Scrollbars style={{ height: '150px' }}>
        <div style={{ padding: '1px 10px 1px 2px' }}>
          {defaultOptions?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor:
                    item?.id === valueText?.id
                      ? 'rgb(186, 231, 255)'
                      : '#fff',
                }}
                className="select-text-item"
                data-option_id={item?.id}
                onClick={(e) => {
                  const v =
                    defaultOptions?.find(
                      (item) =>
                        item?.id === e.currentTarget.dataset.option_id,
                    ) ?? {};
                  setValueText({ ...v });
                  onSubmit(v);
                  setVisible(false);
                }}
              >
                <span
                  className="text-too-long"
                  style={{ color: item?.color }}
                >
                  {item?.text}
                </span>
              </div>
            );
          })}
        </div>
      </Scrollbars>
    </div>
  );

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  return (
    <div className="select-text-container" style={{ width: width }}>
      <Dropdown
        overlay={overLay}
        visible={visible}
        trigger={['click']}
        onVisibleChange={handleVisibleChange}
      >
        <div className="select-text-wrapper">
          <div
            className="select-text-icon"
            style={{ backgroundColor: valueText?.color }}
          ></div>
          <div className="select-text">
            <span className="text-too-long">{valueText?.text}</span>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

FieldSelectPhase.propTypes = {
  value: PropTypes.object,
  defaultOptions: PropTypes.array,
  width: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldSelectPhase.defaultProps = {
  defaultOptions: [
    { id: '1', text: 'test', color: 'blue' },
    { id: '2', text: 'test 1', color: 'yellow' },
    { id: '3', text: 'test', color: 'blue' },
    { id: '4', text: 'test 1', color: 'yellow' },
    { id: '5', text: 'test', color: 'blue' },
    { id: '6', text: 'test 1', color: 'yellow' },
    { id: '7', text: 'test', color: 'blue' },
    { id: '8', text: 'test 1', color: 'yellow' },
  ],
  width: '100%',
  value: { id: '1', text: 'test', color: 'blue' }, // %
  onSubmit: (value) => console.log(value),
  className: '',
};

export default React.memo(FieldSelectPhase);
