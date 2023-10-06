import React from "react";
import { Route, Switch} from "react-router-dom";
import AppContainer from "../containers/app";

const MainRoutes = () => {
  return (
    <Switch>
      <Route path='/' component={AppContainer} />
    </Switch>
  );
};

export default MainRoutes
