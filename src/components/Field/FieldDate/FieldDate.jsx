import { DatePicker, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';
import moment from 'moment';
import timelineFieldIcon from 'assets/icons/timeline-field.png';
import PropTypes from 'prop-types';

const FieldDate = ({value, className, onSubmit}) => {
  const [showTime, setShowTime] = useState(false);
  const [valueDate, setValueDate] = useState(value ? moment(value) : '');

  useEffect(() => {
    if (value) {
      setValueDate(value ? moment(value) : '');
    }
  }, [value]);

  return (
    <div className={`field-date-picker ${className} ${!valueDate && 'empty-date'}`}>
      <DatePicker
        placeholder=""
        inputReadOnly
        defaultValue={valueDate}
        bordered={false}
        showTime={showTime}
        renderExtraFooter={() => (
          <div>
            Add time
            <Switch
              style={{ marginLeft: '10px' }}
              onChange={(checked) => {
                setShowTime(checked);
              }}
            />
          </div>
        )}
        onChange={(format, newValue) => {
          setValueDate(newValue);
          onSubmit(newValue ? new Date(newValue).toISOString() : newValue);
        }}
        onOk={(newValue) => {
          setValueDate(newValue);
        }}
        suffixIcon={!valueDate && <img className="opaciry-field-icon" src={timelineFieldIcon} alt="timeline" />}
      />
    </div>
  );
};

FieldDate.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldDate.defaultProps = {
  value: '',
  onSubmit: (newValue) => console.log(newValue),
  className: '',
};

export default FieldDate;