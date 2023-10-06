import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'antd';
import { calculateTextSize } from 'utils';
import PropTypes from 'prop-types';

import './InputBlock.scss';

const InputBlock =({value, type, autoFocus, onSubmit, isTooltip = false, placeholder})  => {
  const [valueInput, setValueInput] = useState(value);
  useEffect(() => {
    setValueInput(value);
    return () => {};
  }, [value]);

  const styleInput = useMemo(() => {
    switch (type) {
      case 'title':
        return {
          fontSize: '25px',
          fontWeight: 'bold',
          width: '100%',
        };
      case 'title-header':
        return {
          fontSize: '24px',
          fontWeight: 'bold',
          maxWidth: '500px',
        };
      default:
        return {
          width: '100%',
        };
    }
  }, []);

  return (
    <div className="input-block-container">
      <Tooltip title={isTooltip ? valueInput : ''}>
        <input
          onChange={(e) => {
            setValueInput(e.target.value);
          }}
          autoFocus={autoFocus}
          className="input-block text-too-long"
          style={{
            ...styleInput,
            width:
              type === 'title-header'
                ? `${calculateTextSize(valueInput, styleInput).width + 10}px`
                : '100%',
          }}
          value={valueInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {
            if (value !== valueInput) {
              onSubmit(valueInput);
            }
          }}
          placeholder={placeholder}
        />
      </Tooltip>
    </div>
  );
};

InputBlock.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  onSubmit: PropTypes.func,
  isTooltip: PropTypes.bool,
  placeholder: PropTypes.string,
};

InputBlock.defaultProps = {
  value: 'New Item',
  type: 'title',
  autoFocus: true,
  onSubmit: function (value) { console.log(value)},
  isTooltip: false,
  placeholder:''
};

export default React.memo(InputBlock);
