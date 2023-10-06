import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import React from 'react';
import AvatarUser from '../AvatarUser/AvatarUser';
import PropTypes from 'prop-types';
import './styles.scss';

const AvatarGroup = ({ data }) => {
  const hasUserGroup = data.length > 2;
  return (
    <Avatar.Group
      className="avatar-group"
      maxCount={1}
      size={18}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      {!hasUserGroup && (
        <>
          {data.length === 1 && (
            <div className="d-flex align-items-center">
              <AvatarUser size={18} srcAvatar={data[0].srcAvatar} />
              <div>
                <span className="avatar-group__text-child">
                  {`${data[0].fullName}`}
                </span>
              </div>
            </div>
          )}
          {data.length > 1 &&
            data.map((item, index) => (
              <Tooltip
                key={index}
                title={`${item.fullName}`}
                placement="top"
              >
                <AvatarUser
                  size={18}
                  srcAvatar={item.srcAvatar}
                />
              </Tooltip>
            ))}
        </>
      )}
      {hasUserGroup && (
        <>
          <Tooltip title={`${data[0].fullName}`} placement="top">
            <AvatarUser
              icon={<UserOutlined />}
              size={18}
              srcAvatar={data[0].srcAvatar}
            />
          </Tooltip>
          {data.map((item, index) => {
            if (index !== 0) {
              return (
                <Tooltip
                  key={index}
                  title={`${item.fullName}`}
                  placement="top"
                >
                  <AvatarUser
                    icon={<UserOutlined />}
                    size={18}
                    srcAvatar={item.srcAvatar}
                  />
                </Tooltip>
              );
            }
          })}
        </>
      )}
    </Avatar.Group>
  );
}

AvatarGroup.propTypes = {
  data: PropTypes.array
};

AvatarGroup.defaultProps = {
  data: [
    {
      fullName: 'Nguyễn Văn An',
      srcAvatar:'',
    },
  ]
};

export default AvatarGroup
