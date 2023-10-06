/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Tooltip, Space } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import "./HeaderMain.scss";
import PAGES from "../../../routes/constants";
import ChatIcon from "../../../assets/new/header/chat-icon.svg";

import QAIcon from "../../../assets/new/header/qa-icon.svg";
import InviteIcon from "../../../assets/new/header/invite-icon.svg";
import SearchIcon from "../../../assets/new/header/search-icon.svg";

import Logo2 from "../../../assets/new/side-bar/logo2.png";

import AvatarCustom from "../../avatar-custom";

const HeaderMain = () => {
  return (
    <header className="header-social">
      <Link to={`/${PAGES.home}`}>
        <div className="header-search">
          <img src={Logo2} style={{ width: "28px" }} />
          <p className="name">Tên công ty TNHH Balo Việt</p>
        </div>
      </Link>
      <div className="header-info">
        <div className="header-info--item">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <Link to={`/${PAGES.home}`}>
                    <div className="info-account">
                      <AvatarCustom
                        src={null}
                        size={32}
                        fullName={"Anonymous"}
                      />
                      <div>
                        <div className="name-account">{"Anonymous"}</div>
                        <div className="note-account">Thông tin tài khoản</div>
                      </div>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <div className="item-select">
                    <SettingOutlined />
                    <div className="item-name">Cài đặt</div>
                  </div>
                </Menu.Item>
                <Menu.Item key="2">
                  <div className="item-select">
                    <LogoutOutlined />
                    <div className="item-name">Đăng xuất</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            overlayClassName="header--account"
          >
            <Space size={10} className="cursor--pointer">
              <AvatarCustom src={null} size={32} fullName={"Anonymous"} />
            </Space>
          </Dropdown>
        </div>
        <Tooltip placement="bottom" title="Tin nhắn">
          <div className="header-info--item">
            <img src={ChatIcon} />
          </div>
        </Tooltip>
        <div className="header-info--item">
          <img src={QAIcon} />
        </div>
        <div className="header-info--item">
          <img src={InviteIcon} />
        </div>
        <div className="header-info--item">
          <img src={SearchIcon} />
        </div>
      </div>
    </header>
  );
};

HeaderMain.propTypes = {};

export default HeaderMain;
