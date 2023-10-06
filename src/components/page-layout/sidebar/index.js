import React, { useState } from "react";
import { Divider, Image, Tooltip, Layout } from "antd";
import { useHistory } from "react-router-dom";
import MenuSideBar from "./MenuSideBar";

import bankIcon from "../../../assets/images/bank.png";
import businessIcon from "../../../assets/images/business.png";
import DropboxIcon from "../../../assets/new/side-bar/dropbox-icon.svg";
import EmailIcon from "../../../assets/new/side-bar/email-icon.svg";
import ExitIcon from "../../../assets/new/side-bar/exit-icon.png";
import AppIcon from "../../../assets/new/side-bar/app.svg";
import dashboardIcon from "../../../assets/images/dashbroad.png";
import LanguageIcon from "../../../assets/new/side-bar/language-icon.svg";
import SettingIcon from "../../../assets/new/side-bar/setting-icon.svg";
import mediaIcon from "../../../assets/images/media.png";
import Logo from "../../../assets/new/common/logo.png";
import LogoMini from "../../../assets/new/common/logo-mini.png";
import "./styles.scss";
import "./menuStyle.scss";

const { Sider } = Layout;

const getSiderWidth = (collapseLeft, collapseRight) => {
  let width = 80;
  if (!collapseLeft) width += 158;
  if (!collapseRight) width += 215;
  return width;
};

const SideBar = () => {
  const history = useHistory();
  const [collapseLeft, setCollapseLeft] = useState(true);
  const [collapseRight, setCollapseRight] = useState(false);

  const gotoLink = () => {
    history.push("/");
  };

  const expandLeft = () => {
    setCollapseLeft(!collapseLeft);
  };

  const expandRight = () => {
    setCollapseRight(!collapseRight);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClick = (e) => {
    console.log("click ", e);
  };

  let siderWidth = getSiderWidth(collapseLeft, collapseRight);

  return (
    <Sider theme="light" width={siderWidth}>
      <div className="sidebar">
        <div className="sidebar--layout">
          <div
            className={`sidebar--layout__left ${
              collapseLeft ? "collapsed" : ""
            }`}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={`name-module ${collapseLeft && "center"}`}>
                <p style={collapseLeft ? { display: "none" } : {}}>
                  CHỌN MODULE
                </p>
                <img
                  src={collapseLeft ? AppIcon : ExitIcon}
                  style={{ width: 25 }}
                  onClick={expandLeft}
                />
              </div>
              {collapseLeft ? (
                <>
                  <div className="module  center">
                    <Tooltip placement="right" title="Truyền thông">
                      <img src={mediaIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                  <div className="module active center">
                    <Tooltip placement="right" title="Project and Task">
                      <img src={dashboardIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                  <div className="module center">
                    <Tooltip placement="right" title="Tài chính">
                      <img src={bankIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                  <div className="module center">
                    <Tooltip placement="right" title="Biso Core">
                      <img src={businessIcon} width={24} height={24} />
                    </Tooltip>
                  </div>
                </>
              ) : (
                <>
                  <div className="module ">
                    <img
                      className="logo"
                      src={mediaIcon}
                      width={24}
                      height={24}
                    />
                    <div className="title ">Truyền thông</div>
                  </div>
                  <div className="module active">
                    <img
                      className="logo"
                      src={dashboardIcon}
                      width={24}
                      height={24}
                    />
                    <div className="title active">Project and Task</div>
                  </div>
                  <div className="module">
                    <img
                      className="logo"
                      src={bankIcon}
                      width={24}
                      height={24}
                    />
                    <div className="title">Tài chính</div>
                  </div>
                  <div className="module">
                    <img
                      className="logo"
                      src={businessIcon}
                      width={24}
                      height={24}
                    />
                    <div className="title">Biso core</div>
                  </div>
                </>
              )}
            </div>
            <div className="sidebar--layout__left--bottom">
              <div
                className={`sidebar--layout__left--bottom-icon ${
                  collapseLeft && "center"
                }`}
              >
                <Tooltip placement="right" title="Ngôn ngữ">
                  <img src={LanguageIcon} width={24} height={24} />
                </Tooltip>
                {!collapseLeft && (
                  <div className="sidebar--layout__left--bottom-icon-title">
                    Thiết lập ngôn ngữ
                  </div>
                )}
              </div>
              <div
                className={`sidebar--layout__left--bottom-icon ${
                  collapseLeft && "center"
                }`}
              >
                <Tooltip placement="right" title="Cloud">
                  <img src={DropboxIcon} width={24} height={24} />
                </Tooltip>
                {!collapseLeft && (
                  <div className="sidebar--layout__left--bottom-icon-title">
                    Cloud
                  </div>
                )}
              </div>
              <div
                className={`sidebar--layout__left--bottom-icon ${
                  collapseLeft && "center"
                }`}
              >
                <Tooltip placement="right" title="Email">
                  <img src={EmailIcon} width={24} height={24} />
                </Tooltip>
                {!collapseLeft && (
                  <div className="sidebar--layout__left--bottom-icon-title">
                    Email
                  </div>
                )}
              </div>
              <div
                className={`sidebar--layout__left--bottom-icon ${
                  collapseLeft && "center"
                }`}
              >
                <Tooltip placement="right" title="Settings">
                  <img src={SettingIcon} width={24} height={24} />
                </Tooltip>
                {!collapseLeft && (
                  <div className="sidebar--layout__left--bottom-icon-title">
                    Cài đặt
                  </div>
                )}
              </div>
              <Divider style={{ margin: 0, width: "100%" }} />
              <div className="sidebar--layout__left--bottom-logo center">
                {collapseLeft ? (
                  <Image src={LogoMini} preview={false} />
                ) : (
                  <Image src={Logo} preview={false} />
                )}
              </div>
            </div>
          </div>
          <div
            className={`sidebar--layout__right ${
              collapseRight ? "collapsed" : ""
            } ${collapseLeft ? "left-collapsed" : ""}`}
          >
            {collapseRight ? null : (
              <div>
                <div
                  className="sidebar--layout__right--title"
                  style={
                    collapseRight
                      ? {
                          marginRight: 0,
                          marginLeft: 0,
                          justifyContent: "center"
                        }
                      : {}
                  }
                >
                  {!collapseRight && (
                    <>
                      <span onClick={() => gotoLink()}>Project & Task</span>
                    </>
                  )}
                </div>
                <Divider
                  style={{
                    margin: "0px 10px",
                    width: "unset",
                    minWidth: "unset"
                  }}
                />
                <div className="menu-sidebar">
                  <p className="menu-sibar-item" onClick={gotoLink}>
                    <span
                      className="icon-dashboard"
                      style={{ marginBottom: "-2px" }}
                    />
                    <span className="menu-head">Dashboard</span>
                  </p>
                  <MenuSideBar />
                </div>
              </div>
            )}
          </div>
          <div
            className={`exit-icon ${collapseRight ? "rotate-180" : ""}`}
            onClick={expandRight}
            style={{ width: 25 }}
          >
            <img src={ExitIcon} />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
