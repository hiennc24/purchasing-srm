import React, { useEffect, useRef, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import './FieldTag.scss';
import { Dropdown, Tooltip } from 'antd';
import { calculateTextSize } from 'utils';
import { useTranslation } from 'react-i18next';
import { select } from 'utils/reselect';
// import { useSelector } from 'react-redux';
// import { getTagsInProject } from 'containers/app/screens/Workspace/action';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

export const Tag = () => {
  return <div className="field-tag__item"></div>;
};

const styleInput = {
  fontSize: '13px',
  width: '100%',
  maxWidth: '100%',
};

const FieldTag = ({
  // value = ['aaaaaa', 'bb', 'ccccc', 'dddd', 'eeee'],
  value,
  // defaultField = {
  //   fieldType: 'Tags',
  //   isFieldSystem: false,
  //   isSubtask: false,
  //   _id: '61655a2b407894b8cf425c42',
  //   fieldKey: 'tags_5',
  //   fieldName: 'Tags ví dụ',
  //   fieldConfigs: {
  //     defaultValue: [],
  //   },
  // },
  onSubmit,
  width,
  className,
}) => {
  const { t } = useTranslation();
  const fieldTagWrapperRef = useRef();
  const [valueTag, setValueTag] = useState([]);
  const [countTagShow, setCountTagShow] = useState(value.length);
  const [newTag, setNewTag] = useState('');
  const [visible, setVisible] = useState(false);
  const [availableTagsInProject, setAvailableTagsInProject] = useState([]);

  // const dispatch = useDispatch();

  // const tagsInProject = useSelector((state) =>
  //   select(state, 'workspace.currentProject.data.tags', []),
  // );
  const tagsInProject = select([], null, []);

  // const projectId = useSelector((state) =>
  //   select(state, 'workspace.currentProject.data._id'),
  // );

  useEffect(() => {
    const tempTags =
      tagsInProject?.filter((t) => !valueTag?.includes(t)) ?? [];
    setAvailableTagsInProject(tempTags);
    return () => {};
  }, [tagsInProject, valueTag]);

  const overLay = (
    <div className="__field-tag-overlay-container">
      <div className="__field-tag-overlay">
        {valueTag?.map((t) => (
          <div key={t} className="__field-tag-item">
            <div className="text-too-long">{t}</div>
            <div
              className="__field-tag-action"
              onClick={async () => {
                const filterValue = valueTag.filter((i) => i != t);
                await onSubmit([...filterValue]);
                // dispatch(getTagsInProject({ projectId }));
                setValueTag([...filterValue]);
              }}
            >
              <CloseCircleOutlined />
            </div>
          </div>
        ))}
        <input
          style={{
            ...styleInput,
            // width: `${calculateTextSize(newTag, styleInput).width + 10}px`,
          }}
          placeholder={t('enterTag')}
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !valueTag.includes(newTag)) {
              await onSubmit([...valueTag, newTag]);
              // dispatch(getTagsInProject({ projectId }));
              setValueTag([...valueTag, newTag]);
              setNewTag('');
              // setVisible(false);
            }
          }}
        />
      </div>
      <div className="__field-tag-available-container">
        <Scrollbars
          style={{
            paddingRight: '6px',
            height: `${availableTagsInProject.length * 25 + 7}px`,
            maxHeight: '250px',
          }}
        >
          <div style={{ padding: '0 7px 7px 7px' }}>
            {availableTagsInProject?.map((t) => (
              <div
                key={t}
                className="__field-tag-available text-too-long"
                onClick={async () => {
                  await onSubmit([...valueTag, t]);
                  setValueTag([...valueTag, t]);
                }}
              >
                #{t}
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  );

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const styleTagShow = {
    fontSize: '13px',
    paddingLeft: '2px',
    paddingRight: '2px',
  };

  useEffect(() => {
    let _countTagShow = valueTag.length;

    const widthOfContainer = fieldTagWrapperRef.current.clientWidth;
    let w = 20;
    for (let i = 0; i < valueTag?.length; i++) {
      const tagWidth = calculateTextSize(
        `#${valueTag?.[i]}`,
        styleTagShow,
      ).width;
      w += tagWidth;
      if (w >= widthOfContainer) {
        _countTagShow = i;
        break;
      }
    }
    setCountTagShow(_countTagShow);
    return () => {};
  }, [valueTag]);

  useEffect(() => {
    setValueTag(value ?? []);
    return () => {};
  }, [JSON.stringify(value)]);

  return (
    <div
      className={`__field-tag-container ${className}`}
      style={{ width: width }}
    >
      <Tooltip title={''}>
        <Dropdown
          overlay={overLay}
          visible={visible}
          trigger={['click']}
          placement="bottomCenter"
          overlayStyle={{ minWidth: 'fit-content', borderRadius: '4px' }}
          onVisibleChange={handleVisibleChange}
        >
          <div
            className="__field-tag-wrapper"
            ref={fieldTagWrapperRef}
            onClick={() => {
              setVisible(true);
            }}
          >
            {valueTag?.map((item, index) => (
              <div
                key={item}
                className="__field-tag-show"
                style={{
                  ...styleTagShow,
                  display: index < countTagShow ? 'inline-block' : 'none',
                }}
              >
                #{item}
              </div>
            ))}
            {valueTag.length - countTagShow > 0 && (
              <div className="__field-tag-count-addition">
                +{valueTag.length - countTagShow}
              </div>
            )}
          </div>
        </Dropdown>
      </Tooltip>
    </div>
  );
};

FieldTag.propTypes = {
  value: PropTypes.array,
  defaultField: PropTypes.object,
  width:PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldTag.defaultProps = {
  value: [],
  defaultField: {
    fieldType: 'Tags',
    isFieldSystem: false,
    isSubtask: false,
    _id: '61655a2b407894b8cf425c42',
    fieldKey: 'tags_5',
    fieldName: 'Tags ví dụ',
    fieldConfigs: {
      defaultValue: [],
    },
  },
  onSubmit: (newValue) => console.log(newValue),
  className: '',
  width: '100%',
};

export default  React.memo(FieldTag);
