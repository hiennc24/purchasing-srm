import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import numberFieldIcon from 'assets/icons/number-field.png';
import PropTypes from 'prop-types';
import './FieldNumber.scss';

const FieldNumber = ({value, className, onSubmit}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [isShowInput, setIsShowInput] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  // const [hideOverlay, setHideOverlay] = useState(false);
  const inputRef = useRef(null);

  // Control state of overlay
  const showOverlay = () => {
    if (isShowInput !== 2 && isShowInput !== 3) {
      setIsShowInput(1);
    }
  };
  const hideOverLay = () => {
    if (isShowInput !== 2 && isShowInput !== 3) {
      setIsShowInput(0);
    }
  };
  const showInput = () => {
    setIsShowInput(2);
    setHasFocus(true);
  };
  const resetInputState = () => {
    if (isShowInput !== 3 && isShowInput !== 2) {
      setIsShowInput(0);
    }
    if (inputValue === '') {
      setIsShowInput(0);
      // setHideOverlay(false);
    } else {
      // setHideOverlay(true);
    }
    onSubmit(Number(inputValue));
  };

  // Handle value of input
  const handleInputValue = (e) => {
    let newInput = e.target.value;
    if (newInput.match(/^\d+$/) !== null || e.target.value === '') {
      setInputValue(e.target.value);
    }
    if (e.target.value !== '') {
      setIsShowInput(3);
    }
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (inputValue !== '' || inputValue == 0) {
      setIsShowInput(3);
      // setHideOverlay(inputValue !== '' || inputValue == 0);
    }
    if (inputValue == 0) {
      setInputValue('');
    }
  }, []);

  useLayoutEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={`field-number ${className}`}
      onMouseOver={showOverlay}
      onMouseLeave={hideOverLay}
      onClick={showInput}
    >
      <div className="field-number__overlay">
        {isShowInput === 0 || isShowInput === 1 ? (
          <img
            className="opaciry-field-icon"
            src={numberFieldIcon}
            alt="number"
          />
        ) : !inputValue && isShowInput === 3 ? (
          <img
            className="opaciry-field-icon"
            src={numberFieldIcon}
            alt="number"
          />
        ) : (
          <input
            ref={inputRef}
            autoFocus={hasFocus}
            // onFocus={() => setHideOverlay(false)}
            className="field-number__overlay-content --input"
            type="text"
            onBlur={resetInputState}
            value={inputValue}
            onChange={handleInputValue}
            onKeyDown={handleEnterKeyDown}
          />
        )}
      </div>
    </div>
  );
}

FieldNumber.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldNumber.defaultProps = {
  value: '',
  onSubmit: (newValue) => console.log(newValue),
  className: '',
};

export default FieldNumber;
