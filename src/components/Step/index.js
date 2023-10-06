import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import PropTypes from 'prop-types';

const  Step = ({totalStep, currentStep}) => {
  const [listStep, setListStep] = useState([]);

  useEffect(() => {
    const list = [];
    for (let i = 1; i <= 3; i++) {
      list.push(i);
    }

    setListStep(list);
  }, [totalStep]);

  return (
    <>
      <div className="d-flex">
        {listStep.map((step, index) => {
          return (
            <div
              key={index}
              className={classNames(
                styles?.stepWrapper,
                currentStep >= step ? styles?.active : '',
              )}
            >
              {step}
              {index !== listStep.length - 1 && (
                <div className={styles?.divided}></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
  //#endregion
}

Step.propTypes = {
  totalStep: PropTypes.number,
  currentStep: PropTypes.number,
};

Step.defaultProps = {
  totalStep: 3,
  currentStep: 1
};

export default Step;
