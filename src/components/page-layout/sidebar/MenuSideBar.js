import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import PAGES from "../../../routes/constants";

const { Panel } = Collapse;

const renderMenuHead = (text) => <span className="menu-head">{text}</span>;

const MenuSidebarItem = ({ children, onClick, currentPath, path }) => {
  const active = currentPath && path && currentPath.indexOf(path) > -1;
  return (
    <p
      onClick={() => onClick(path)}
      className={active ? "menu-sibar-item active" : "menu-sibar-item"}
    >
      <span className="icon-sidebar-menu" style={{ marginBottom: "1px" }} />
      <span>{children}</span>
    </p>
  );
};

MenuSidebarItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  currentPath: PropTypes.string,
  path: PropTypes.string,
};

MenuSidebarItem.defaultProps = {
  onClick: () => {},
  currentPath: PAGES.home,
  path: "",
};

const MenuSideBar = () => {
  const location = useLocation();
  const history = useHistory();
  console.log(location, history);

  const onClick = (path) => history.push(`/core/${path}`);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1", "2", "3", "4"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          width="14px"
          style={{ marginBottom: "2px" }}
        />
      )}
      className="site-collapse-custom-collapse"
    >
      <Panel
        header={renderMenuHead("Setup Doanh nghiệp")}
        key="1"
        className="site-collapse-custom-panel"
      >
        <MenuSidebarItem
          id="1"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Tổ chức vận hành
        </MenuSidebarItem>
        <MenuSidebarItem
          id="2"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Hoạch định mục tiêu (BSC)
        </MenuSidebarItem>
        <MenuSidebarItem
          id="3"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Hoạch định nhân lực
        </MenuSidebarItem>
      </Panel>
      <Panel
        header={renderMenuHead("Kế hoạch kinh doanh")}
        key="2"
        className="site-collapse-custom-panel"
      >
        <MenuSidebarItem
          id="4"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Định mức Sản xuất / Dịch vụ
        </MenuSidebarItem>
        <MenuSidebarItem
          id="5"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Dự báo tài chính
        </MenuSidebarItem>
        <MenuSidebarItem
          id="6"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Kế hoạch tài chính kinh doanh
        </MenuSidebarItem>
      </Panel>
      <Panel
        header={renderMenuHead("Công cụ Quản trị")}
        key="3"
        className="site-collapse-custom-panel"
      >
        <MenuSidebarItem
          id="7"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Công cụ dự báo
        </MenuSidebarItem>
        <MenuSidebarItem
          id="8"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Nhật ký & kiểm soát dòng tiền
        </MenuSidebarItem>
        <MenuSidebarItem
          id="9"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Phân tích tài chính
        </MenuSidebarItem>
      </Panel>
      <Panel
        header={renderMenuHead("Danh mục hệ thống")}
        key="4"
        className="site-collapse-custom-panel"
      >
        <MenuSidebarItem
          id="10"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Danh mục vật tư hàng hóa
        </MenuSidebarItem>
        <MenuSidebarItem
          id="11"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Danh mục đối tượng
        </MenuSidebarItem>
        <MenuSidebarItem
          id="12"
          currentPath={location.pathname}
          onClick={onClick}
        >
          Danh mục quản trị
        </MenuSidebarItem>
      </Panel>
    </Collapse>
  );
};

export default MenuSideBar;
