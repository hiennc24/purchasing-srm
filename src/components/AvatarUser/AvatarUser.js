import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const AvatarUser = ({ srcAvatar, children, ...props }) => {
  return (
    <Avatar icon={<UserOutlined />} src={srcAvatar || ''} {...props}>
      {children}
    </Avatar>
  );
};

AvatarUser.propTypes = {
  children:PropTypes.any,
  srcAvatar: PropTypes.string
};

AvatarUser.defaultProps = {
  children: null,
  srcAvatar: ''
};

export default AvatarUser
