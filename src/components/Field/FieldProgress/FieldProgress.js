import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, InputNumber, Progress, Slider, Tooltip } from 'antd';
import './FieldProgress.scss';
import { useTranslation } from 'react-i18next';
import fieldApi from 'api/fieldApi';
import { select } from 'helpers/reselect';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetail } from 'containers/app/screens/Workspace/action';
import precentageDoneFieldIcon from 'assets/icons/precentage-done-field.png';

const FieldProgress = React.memo(
  ({
    value = 0, // %
    defaultField = {
      fieldType: 'Progress',
      isFieldSystem: false,
      _id: '612e5e6e5d737736062370dc',
      fieldKey: 'progress_1',
      fieldName: 'Progress 1',
      fieldConfigs: {
        defaultValue: 0,
        percentage_jump: 9,
      },
    },
    onSubmit = function (value) {},
    width = '100%',
    className = '',
  }) => {
    const dispatch = useDispatch();
    const [valueSlider, setValueSlider] = useState(value);
    const [valueOnSubmit, setValueOnSubmit] = useState(value);
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(
      defaultField?.fieldConfigs?.percentage_jump ?? 5,
    );
    const { t } = useTranslation();

    const projectId = useSelector((state) =>
      select(state, 'workspace.currentProject.data._id'),
    );

    const fields = useSelector((state) =>
      select(state, 'workspace.currentProject.detail.fields', []),
    );
    const _defaultField_ = useMemo(() => {
      return fields.find((item) => item?.fieldKey === defaultField?.fieldKey);
    }, [fields]);
    const _statusField_ = useMemo(() => {
      const status = fields.find((item) => item?.fieldKey === 'status');
      return status?.fieldConfigs?.options.find(
        (item) => item?.value === status?.fieldConfigs?.defaultValue,
      );
    }, [fields]);

    useEffect(() => {
      setValueSlider(value);
      setValueOnSubmit(value);
      return () => {};
    }, [value]);

    useEffect(() => {
      setStep(_defaultField_?.fieldConfigs?.percentage_jump ?? 5);
      return () => {};
    }, [_defaultField_]);

    const sliderRef = useRef();

    const overLay = (
      <div
        className="prog-slider-container"
        style={{
          backgroundColor: '#fff',
          padding: '10px',
        }}
      >
        <div>
          <Slider
            ref={sliderRef}
            value={valueSlider}
            onChange={setValueSlider}
            max={100}
            min={0}
            step={step}
            onAfterChange={() => {
              handleVisibleChange();
            }}
          ></Slider>
        </div>
        <div>
          <span>{t('field.progress.step')}</span>
          <InputNumber
            className="field-progress-step-input"
            min={1}
            max={100}
            style={{}}
            value={step}
            onChange={(value) => {
              // console.log(sliderRef.current.state.value);
              // sliderRef.current.state.value = valueSlider;
              // setValueSlider(sliderRef.current.state.value);
              setStep(value);
            }}
          />
        </div>
      </div>
    );

    const handleVisibleChange = async () => {
      if (value !== valueSlider) {
        onSubmit(valueSlider);
        setValueOnSubmit(valueSlider);
      }
      setVisible(false);

      const resp = await fieldApi.updatePercentageJump({
        projectId,
        fieldKey: defaultField?.fieldKey,
        percentage_jump: step,
      });

      dispatch(getProjectDetail({ projectId }));
      // if (resp?.code === 200) {
      //   setStep(step);
      // }
    };
    return (
      <div
        className={`field-progress-container ${className}`}
        style={{ width: width }}
      >
        <Dropdown
          overlay={overLay}
          visible={visible}
          trigger={['click']}
          placement="bottomCenter"
          overlayStyle={{ minWidth: 'fit-content' }}
          onVisibleChange={(flag) => setVisible(flag)}
        >
          <Tooltip title={`${valueOnSubmit}%`}>
            <div className="field-progress">
              {valueOnSubmit ? (
                <Progress
                  trailColor="rgba(39, 39, 39, 0.1)"
                  format={(percent) => `${percent}%`}
                  type="circle"
                  strokeColor={_statusField_?.color}
                  percent={valueOnSubmit}
                  width={28.5}
                  strokeWidth={9}
                />
              ) : (
                <img src={precentageDoneFieldIcon} alt="precentage" />
              )}
            </div>
          </Tooltip>
        </Dropdown>
      </div>
    );
  },
);

export default FieldProgress;
