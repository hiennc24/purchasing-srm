import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout } from "antd";
import HeaderMain from "../../components/page-layout/header-main/HeaderMain";
import SideBar from "../../components/page-layout/sidebar";
// import { AppRoutes } from "../../routes/AppRoutes";
// import PAGES from "../../routes/constants";
import Home from "../../pages/home/Home";
import DemoCommon from "../../pages/demoCommon";
import Biso from "../../pages/biso24/index.js";
import "./style.scss";

const { Content } = Layout;
const AppContainer = () => {
  return (
    <Layout>
      <HeaderMain />
      <Content className="container-app-layout">
        <Layout style={{ height: "100%" }}>
          <SideBar />
          <Content className="content-wrapper">
            <div className="content-area">
              <Switch>
                <Route exact path="/demo-common" component={DemoCommon}/>
                <Route exact path="/" component={Home} />
                <Route exact path="/biso" component={Biso} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

AppContainer.propTypes = { match: PropTypes.object };
export default AppContainer;