import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import textFieldIcon from 'assets/icons/text-field.png';
import PropTypes from 'prop-types';

import './FieldText.scss';

const FieldText = ({
  value,
  // defaultField,
  onSubmit,
  width,
  className,
}) => {
  const [valueText, setValueText] = useState(value);

  useEffect(() => {
    setValueText(value ?? '');
    return () => {};
  }, [value]);
  return (
    <div
      className={`__field-text-container ${className}`}
      style={{ width: width }}
    >
      <Tooltip title={''}>
        <div className="__field-text-wrapper">
          <input
            className="text-too-long"
            value={valueText}
            onChange={(e) => {
              setValueText(e.target.value);
            }}
            onBlur={() => {
              if (
                valueText !== '' &&
                valueText !== null &&
                valueText !== value
              )
                onSubmit(valueText);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
                if (
                  valueText !== '' &&
                  valueText !== null &&
                  valueText !== value
                )
                  onSubmit(valueText);
              }
            }}
          />
          {(valueText === '' ||
            valueText === null ||
            valueText === undefined) && (
            <div className="__field-text-icon">
              <span>
                <img
                  className="opaciry-field-icon"
                  src={textFieldIcon}
                  alt="text"
                />
              </span>
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

FieldText.propTypes = {
  value: PropTypes.string,
  defaultField: PropTypes.object,
  width:PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldText.defaultProps = {
  value: '',
  defaultField: {
    fieldType: 'Text',
    isFieldSystem: false,
    _id: '612e5e6e5d737736062370d2',
    fieldKey: 'text_1',
    fieldName: 'T/đề T1',
  },
  onSubmit: (newValue) => console.log(newValue),
  className: '',
  width: '100%',
};


export default React.memo(FieldText);
