import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import personIcon from 'assets/icons/person.png';
import PropTypes from 'prop-types';

const observerOptions = {
  root: null,
  rootMargin: '200px',
  threshold: 0,
};

const StyledIcon = styled.div`
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-size: ${(props) => (props.cover ? 'cover' : 'contain')};
  background-position: center;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursorPointer && 'pointer'};
  min-width: ${(props) => props.minWidth}px; ;
`;

const Icon = ({ src, width, height, cursorPointer, cover, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    let observer;

    if (ref.current) {
      const div = ref.current;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            div.style.backgroundImage = `url("${src}")`;
            observer.disconnect();
          }
        });
      }, observerOptions);
      observer.observe(div);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <StyledIcon
      ref={ref}
      width={width}
      height={height}
      cursorPointer={cursorPointer}
      cover={cover}
      {...props}
    />
  );
};

Icon.propTypes = {
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cursorPointer: PropTypes.string,
  cover:PropTypes.bool,
};

Icon.defaultProps = {
  src: personIcon,
  width: '15',
  height: '17',
  cursorPointer:'pointer',
  cover:true,
};

export default Icon;
