import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFilePowerpoint, faPlusCircle, } from '@fortawesome/free-solid-svg-icons';
import wordIcon from 'assets/icons/word.png';
import excelIcon from 'assets/icons/excel.png';
import pdfIcon from 'assets/icons/pdf.png';
import fileFieldIcon from 'assets/icons/file-field.png';

import api from '../../../services/api/axios';
import ModalPreviewFile from './ModalPreviewFile';

// import 'antd/dist/antd.css';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';

const urlFileManager = 'https://filemanager.crmdemo.net';
const FieldFile = ({value, className, onSubmit}) => {
  const [imagePreviewUrls, setImagePreviewUrls] = useState([...value]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    if (value && value.length) {
      setImagePreviewUrls([...value]);
    }
  }, [value]);

  const inputId = uuidv4();
  const handleChangeImage = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    if (file) {
      const resp = await api.post(
        `${urlFileManager}/file/upload/document`,
        formData,
      );
      if (resp && resp.docsId) {
        const tmpValue = [...value];
        const fileSelected = {
          fileName: resp.name,
          fileId: resp.docsId,
          fileMimeType: resp.type,
        };
        tmpValue.push(fileSelected);
        onSubmit(tmpValue);
        // preview image
        reader.onloadend = () => {
          const tmpImagePreviewUrls = [...imagePreviewUrls];
          tmpImagePreviewUrls.push({
            url: reader.result,
            type: resp.type,
            ...fileSelected,
          });
          setImagePreviewUrls(tmpImagePreviewUrls);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const downloadFile = async (file) => {
    if (file && file.fileId) {
      window.open(`${urlFileManager}/uploads/${file.fileId}`, '_blank');
      // const resp = await axiosClient.get(
      //   `${urlFileManager}/uploads/${file.fileId}`,
      // );
    }
  };

  const getUrlImgFile = (file) => `${urlFileManager}/uploads/${file.fileId}`;

  const handleDeleteFile = (item) => {
    const tmpImagePreviewUrls = [...imagePreviewUrls];
    let index = -1;
    tmpImagePreviewUrls.map((file, i) => {
      if (file.fileId === item.fileId) index = i;
    });
    tmpImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(tmpImagePreviewUrls);
    onSubmit(tmpImagePreviewUrls);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  }

  const handleClickFile = (item) => {
    setVisibleModal(true);
    setSelectedFile(item);
  }

  const showIcon = (
    imagePreviewUrl = {
      fileId: '',
      fileMimeType: '',
      fileName: '',
    },
    className = '',
  ) => {
    let component = <></>;
    const extension = imagePreviewUrl?.fileId?.split('.').pop();
    switch (extension) {
      case 'pdf':
        component = <img src={pdfIcon} className={className} />;
        break;
      case 'xlsx':
        component = <img src={excelIcon} className={className} />;
        break;
      case 'pptx':
        component = <FontAwesomeIcon style={{ color: '#C54122' }} icon={faFilePowerpoint} className={className} />
        break;
      case 'docx':
      case 'doc':
        component = <img src={wordIcon} className={className} />;
        break;
      default:
        component = <FontAwesomeIcon icon={faFileAlt} className={className} />
        break;
    }

    return (
      <Tooltip title={imagePreviewUrl?.fileName}>
        {component}
      </Tooltip>
    );
  };

  const getIconFile = (item, i, width = 20, height = 20) => {
    if (i === 3)
      return (
        <div className="file-more-icon">
          {imagePreviewUrls.length - 3}
        </div>
      );
    if (i > 3) return '';
    if (item?.fileMimeType?.indexOf('image') > -1) {
      return (
        <img
          className="file-item"
          src={getUrlImgFile(item)}
          alt=""
          height={height}
          width={width}
        />
      );
    }
    return (
      <div>
        {showIcon(item, 'file-document-icon file-item')}
      </div>
    );
  }
  const showFilePreview = () => {
    if (imagePreviewUrls && imagePreviewUrls.length) {
      return imagePreviewUrls.map((item, i) => {
        return (
          <div key={i} onClick={() => handleClickFile(item)}>
            {getIconFile(item, i)}
          </div>
        )
      });
    }
    return <img className="opaciry-field-icon" src={fileFieldIcon} alt="file" />;
  };

  return (
    <div className={`field-file ${className}`}>
      <ModalPreviewFile
        visible={visibleModal}
        onClose={handleCloseModal}
        selectedFile={selectedFile}
        files={imagePreviewUrls}
        showIcon={getIconFile}
        downloadFile={downloadFile}
        handleDeleteFile={handleDeleteFile}
        handleChangeImage={handleChangeImage}
        />
      <FontAwesomeIcon className="field-file__icon" icon={faPlusCircle} />
      <div className="field-file__text">
        <div className="filePreview">{showFilePreview()}</div>
      </div>
      <label className="label-file-upload" htmlFor={inputId}>
        <input
          type="file"
          name="uploadFile"
          id={inputId}
          onChange={handleChangeImage}
          className="fileInput"
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

FieldFile.propTypes = {
  value: PropTypes.array,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

FieldFile.defaultProps = {
  value: [] ,
  onSubmit: (newValue) => console.log(newValue),
  className: '',
};

export default FieldFile;
