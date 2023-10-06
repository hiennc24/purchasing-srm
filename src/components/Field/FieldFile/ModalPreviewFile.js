import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { notifSuccess } from 'utils/notificatiton';
import PropTypes from 'prop-types';

import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import empty_file from 'assets/images/empty-file.png';
import addFileIcon from 'assets/icons/add-file.png';
import userIcon from 'assets/icons/user.png';


const { confirm } = Modal;

const ModalPreviewFile = ({
  visible,
  onClose,
  selectedFile,
  files,
  showIcon,
  downloadFile,
  handleDeleteFile,
  handleChangeImage,
}) => {
  const { t } = useTranslation();
  const [currentFile, setCurrentFile] = useState({});

  const onDelete = () => {
    if (isEmpty(currentFile)) return;
    confirm({
      title: t('confirmDeleteFile'),
      icon: <ExclamationCircleOutlined />,
      okText: t('yes'),
      okType: 'danger',
      cancelText: t('no'),
      async onOk() {
        handleDeleteFile(currentFile);
        setCurrentFile(files[0]);
        notifSuccess(t('success'), t('deleteFileSuccessfully'));
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    setCurrentFile(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    const newFile = !isEmpty(files) ? files[files.length - 1] : {};
    setCurrentFile(newFile);
  }, [files]);

  useEffect(() => {
    return setCurrentFile({});
  }, []);

  const showFilePreview = () => {
    if (files && files.length) {
      return files.map((item, i) => {
        return (
          <div key={i}
            className="icon-file"
            style={{ backgroundColor: item === currentFile ? '#FFF' : '' }}
            onClick={() => setCurrentFile(item)}
          >
            {showIcon(item)}
          </div>
        );
      });
    }
    return '';
  };

  return (
    <Modal
      className="modal-task-container modal-preview-file"
      visible={visible}
      onCancel={onClose}
      closable={false}
      footer={null}
      width={800}
      height={475}
    >
      <Row>
        <Col span={2} className="preview-left">
          {isEmpty(currentFile) ? (
            <>
              <label
                htmlFor="getFile"
                className="add-file-icon add-file-icon-empty"
              >
                <img src={addFileIcon} alt="addFileIcon"></img>
                <input
                  id="getFile"
                  type="file"
                  name="uploadFile"
                  onChange={handleChangeImage}
                  className="field-file-empty__input"
                  style={{ display: 'none', width: '0px' }}
                />
              </label>
            </>
          ) : (
            <div className="file-preview">
              <label htmlFor="getFile" className="add-file-icon">
                <img src={addFileIcon} alt="addFileIcon"></img>
                <input
                  id="getFile"
                  type="file"
                  name="uploadFile"
                  onChange={handleChangeImage}
                  className="field-file-empty__input"
                  style={{ display: 'none', width: '0px' }}
                />
              </label>
              <div className="show-file-preview">{showFilePreview()}</div>
            </div>
          )}
        </Col>
        <Col span={16} className="preview-center">
          <div
            className={`preview-content ${
              currentFile?.fileMimeType?.indexOf('image') > -1
                ? 'full-width'
                : 'file-content'
            }`}
          >
            {isEmpty(currentFile) ? (
              <div className="field-file-empty">
                <div className="field-file-empty__content">
                  <img src={empty_file} width="100%" />
                  <div className="field-file-empty__item">
                    <small>{t('emptyFileSubTitle')}</small>{' '}
                  </div>
                  <div className="field-file-empty__item">
                    <label htmlFor="getFile" className="field-file-empty__label">
                      {t('uploadFile')}
                      <input
                        id="getFile"
                        type="file"
                        name="uploadFile"
                        onChange={handleChangeImage}
                        className="field-file-empty__input"
                        style={{ display: 'none', width: '0px' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div>{showIcon(currentFile, '', '100%', 'auto')}</div>
            )}
          </div>
        </Col>
        <Col span={6} className="preview-right">
          <Row className="info-title">
            <Col span={20}>{t('previewFileInfo')}</Col>
            <Col span={4} className="icon-close">
              <CloseOutlined onClick={onClose} />
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={10}>{t('previewFileName')}:</Col>
            <Col span={14} className="preview-text">
              {currentFile.fileName}
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={10}>{t('previewFileType')}:</Col>
            <Col span={14} className="preview-text">
              {currentFile.fileMimeType}
            </Col>
          </Row>
          <Row className="info-item">
            <Col span={10}>{t('previewFileDate')}:</Col>
            <Col span={14} className="preview-text"></Col>
          </Row>
          <Row className="info-item">
            <Col span={10}>{t('previewFileSize')}:</Col>
            <Col span={14} className="preview-text"></Col>
          </Row>
          <Row className="info-item">
            <Col span={10}>{t('previewFileUploadBy')}:</Col>
            <Col span={14} className="preview-text">
              <img src={userIcon} alt="user" />
            </Col>
          </Row>
          <div className="preview-action">
            <div
              className={`action-item ${
                isEmpty(currentFile) ? 'action-item-disabled' : ''
              }`}
              onClick={() => downloadFile(currentFile)}
            >
              <DownloadOutlined />
              <div className="action-text" style={{ lineHeight: '12px' }}>
                {t('downloadFile')}
              </div>
            </div>
            <div
              className={`action-item ${
                isEmpty(currentFile) ? 'action-item-disabled' : ''
              }`}
              onClick={onDelete}
              style={{ paddingLeft: '10px' }}
            >
              <DeleteOutlined />
              <div className="action-text" style={{ lineHeight: '12px' }}>
                {t('deleteFile')}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

ModalPreviewFile.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  selectedFile: PropTypes.object,
  files: PropTypes.array,
  showIcon: PropTypes.func,
  downloadFile:PropTypes.func,
  handleDeleteFile:PropTypes.func,
  handleChangeImage: PropTypes.func,
};

ModalPreviewFile.defaultProps = {
  visible: false,
  onClose: (value) => { console.log(value)},
  selectedFile: {},
  files: [],
  showIcon: (value) => { console.log(value)},
  downloadFile:(value) => { console.log(value)},
  handleDeleteFile:(value) => { console.log(value)},
  handleChangeImage: (value) => { console.log(value)},
};

export default ModalPreviewFile;
