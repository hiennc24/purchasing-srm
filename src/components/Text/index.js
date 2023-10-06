import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children }) => {
  return <div>{children || ''}</div>;
};

Text.propTypes = {
  children:PropTypes.string
};

Text.defaultProps = {
  children: 'example text'
};
export default Text;
