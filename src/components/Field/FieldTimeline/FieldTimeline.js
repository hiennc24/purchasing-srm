import React, { useEffect, useState } from 'react';
import { DatePicker, Tooltip } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import timelineFieldIcon from 'assets/icons/timeline-field.png';
import PropTypes from 'prop-types';

import './FieldTimeline.scss';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const FieldTimeline =({
  value,
  // defaultField,
  onSubmit,
  width,
  className = '',
}) => {
  const customFormat = (value) => `${value.format(dateFormat)}`;
  const [fromToMoment, setFromToMoment] = useState(
    _.isNil(value?.from) || _.isNil(value?.to)
      ? null
      : [moment(value.from), moment(value.to)],
  );

  useEffect(() => {
    setFromToMoment(
      _.isNil(value?.from) || _.isNil(value?.to)
        ? null
        : [moment(value.from), moment(value.to)],
    );
    return () => {};
  }, [value]);

  return (
    <div
      style={{ width: width, minWidth: '100px' }}
      className={`field-timeline-container flex-jcenter ${className}`}
    >
      <Tooltip
        title={
          fromToMoment == null
            ? ''
            : `${moment(fromToMoment[0]).format(dateFormat)} - ${moment(
                fromToMoment[1],
              ).format(dateFormat)}`
        }
      >
        <RangePicker
          style={{ width: '100%' }}
          allowClear={true}
          inputReadOnly={true}
          className="field-timeline"
          locale={null}
          size="middle"
          suffixIcon={''}
          bordered={false}
          placeholder={['', '']}

          onChange={(value) => {
            if (value) {
              value[0].set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
              const from = value[0].toISOString();
             
              const to = value[1].endOf('day').toISOString();
              onSubmit({ from, to });

              setFromToMoment(value);
            } else {
              setFromToMoment(null);
              onSubmit({ from: null, to: null });
            }
          }}
          separator={
            fromToMoment ? (
              <span className="date-initial"></span>
            ) : (
              <img
                className="opaciry-field-icon"
                src={timelineFieldIcon}
                alt="timeline"
              />
            )
          }
          value={fromToMoment}
          defaultValue={fromToMoment}
          format={customFormat}
        />
      </Tooltip>
    </div>
  );
};

FieldTimeline.propTypes = {
  value: PropTypes.object,
  defaultField: PropTypes.object,
  width:PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldTimeline.defaultProps = {
  value: {
    from: null,
    to: null,
  },
  defaultField: {
    fieldType: 'Timeline',
    isFieldSystem: false,
    _id: '612e5e6e5d737736062370ce',
    fieldKey: 'timeline',
    fieldName: 'Timeline',
  },
  onSubmit: (newValue) => console.log(newValue),
  className: '',
  width: '100%',
};

export default React.memo(FieldTimeline);
