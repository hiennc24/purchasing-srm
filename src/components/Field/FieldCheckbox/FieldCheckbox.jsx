import React, { useEffect, useState } from 'react';
import './style.scss';
import checkboxIcon from 'assets/icons/checkbox.png';
import checkedCheckboxIcon from 'assets/icons/checked-checkbox.png';
import PropTypes from 'prop-types';

const FieldCheckbox = ({value, className, onSubmit}) => {
  const [isChecked, setIsChecked] = useState(value || false);

  useEffect(() => {
    if (value && (value === false || value === true)) {
      setIsChecked(value || false);
    }
  }, [value]);

  const handleClick = () => {
    onSubmit(!isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div
      className={`field-checkbox ${className}`}
      onClick={() => handleClick()}
      role="button"
      tabIndex={0}
    >
      {isChecked ? (
        <img
          src={checkedCheckboxIcon}
          className="field-checkbox__icon"
          alt="checkbox"
        />
      ) : (
        <img
          src={checkboxIcon}
          className="field-checkbox__icon opaciry-field-icon"
          alt="checkbox"
        />
      )}
    </div>
  );
};

FieldCheckbox.propTypes = {
  value: PropTypes.bool,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldCheckbox.defaultProps = {
  value: true,
  onSubmit: (newValue) => console.log(newValue),
  className: '',
};

export default FieldCheckbox;
