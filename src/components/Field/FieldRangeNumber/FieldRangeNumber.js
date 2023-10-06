import React, { useEffect, useRef, useState } from 'react';
import { Input, Dropdown } from 'antd';
import isEmpty from 'lodash/isEmpty';
import numberFieldIcon from 'assets/icons/number-field.png';
import nextIcon from 'assets/icons/next.png';
import PropTypes from 'prop-types';

import './FieldRangeNumber.scss';

const FieldRangeNumber = ({
  value,
  onSubmit,
  width,
  parentType,
  className,
}) => {
  const refInput1 = useRef();
  const refInput2 = useRef();

  const [valueRangeNumber, setValueRangeNumber] = useState(value);
  const [tempValue, setTempValue] = useState({
    from: value?.from.toString(),
    to: value?.to.toString(),
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      (value?.from != valueRangeNumber?.from ||
        value?.to != valueRangeNumber?.to) &&
      parentType == 'ModalItem'
    ) {
      setValueRangeNumber({ ...value });
      setTempValue({
        from: value?.from.toString(),
        to: value?.to.toString(),
      });
    }
    return () => {};
  }, [value]);

  function getNumber(str, defaultValue = 0) {
    return isNaN(parseFloat(str)) ? defaultValue : parseFloat(str);
  }

  const onChange = (e, type = 'input1') => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      if (type === 'input1') {
        if (getNumber(value) > getNumber(tempValue.to)) {
          setTempValue({ from: value, to: value });
        } else {
          setTempValue({ ...tempValue, from: value });
        }
      } else if (type === 'input2') {
        if (getNumber(value) < getNumber(tempValue.from)) {
          setTempValue({ from: value, to: value });
        } else {
          setTempValue({ ...tempValue, to: value });
        }
      }
    }
  };
  
  const overLay = (
    <div
      className="popover-field-rangenumber"
      style={{
        backgroundColor: '#fff',
        padding: '5px',
        display: 'flex',
        border: 'none',
        flexDirection: 'column',
      }}
    >
      <div className="field-rn-input">
        <span>From</span>
        <Input
          ref={refInput1}
          size="small"
          autoFocus
          value={tempValue.from}
          onChange={(e) => {
            onChange(e, 'input1');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter();
            }
          }}
        />
      </div>
      <div className="field-rn-input">
        <span>To</span>
        <Input
          ref={refInput2}
          size="small"
          value={tempValue.to}
          onChange={(e) => {
            onChange(e, 'input2');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter();
            }
          }}
        />
      </div>
    </div>
  );

  const onEnter = () => {
    const val1 = getNumber(refInput1.current?.input?.value);
    const val2 = getNumber(refInput2.current?.input?.value);
    if (value?.from !== val1 || value?.to !== val2) {
      onSubmit({ to: val2, from: val1 });
      setValueRangeNumber({ to: val2, from: val1 });
    }

    setVisible(false);
  };

  const handleVisibleChange = (flag) => {
    if (flag === false) {
      onEnter();
    } else setVisible(flag);
  };

  return (
    <div
      className={`__field-rangenumber-container ${className}`}
      style={{ width: width }}
    >
      <Dropdown
        overlay={overLay}
        visible={visible}
        overlayStyle={{ minWidth: 'fit-content' }}
        overlayClassName="__field-rangenumber-overlay"
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={handleVisibleChange}
      >
        <div className="__field-rangenumber-wrapper" id="Popover1">
          {isEmpty(valueRangeNumber) ? (
            <img
              className="opaciry-field-icon"
              src={numberFieldIcon}
              alt="number"
            />
          ) : (
            <>
              <span className="text-too-long">{valueRangeNumber?.from}</span>
              <span className="__field-rn-icon">
                <img src={nextIcon} alt="next" />
              </span>
              <span className="text-too-long">{valueRangeNumber?.to}</span>
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

FieldRangeNumber.propTypes = {
  value: PropTypes.object,
  defaultField: PropTypes.object,
  onSubmit: PropTypes.func,
  width: PropTypes.string,
  parentType: PropTypes.string,
  className: PropTypes.string,
};

FieldRangeNumber.defaultProps = {
  value: {
    from: 0,
    to: 100,
  },
  defaultField: {
    fieldType: 'Range_Number',
    isFieldSystem: false,
    _id: '612e5e6e5d737736062370d8',
    fieldKey: 'range_number_1',
    fieldName: 'Range Number',
    fieldConfigs: {
      defaultValue: {
        from: 0,
        to: 100,
      },
    },
  },
  onSubmit: function (value) {console.log(value)},
  width: '100%',
  parentType:'ModalItem',
  className: '',
};

export default React.memo(FieldRangeNumber);
