import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const UseClickOutSide = ({ children, onClickOutSide }) => {
  const wrapperRef = useRef();

  const handleClick = (event) => {
    const { target } = event;
    if (!wrapperRef.current.contains(target)) {
      onClickOutSide();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
};

UseClickOutSide.propTypes = {
  onClickOutSide: PropTypes.fun,
  children:PropTypes.any
};

UseClickOutSide.defaultProps = {
  onClickOutSide: () => {},
}

export default UseClickOutSide;
