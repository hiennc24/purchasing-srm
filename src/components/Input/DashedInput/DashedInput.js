import { Input } from 'antd';
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const DashedInput = ({className, ...props}) => {
  return (
    <Input
      placeholder=" + Thêm phase mới"
      className={`${className} dashed-input`}
      {...props}
    />
  );
}

DashedInput.propTypes = {
  className: PropTypes.string,
};

DashedInput.defaultProps = {
  className: '',
};

export default DashedInput;
