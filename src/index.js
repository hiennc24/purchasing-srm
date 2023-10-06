import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import i18n from './languages';
import { I18nextProvider } from 'react-i18next';

import MainRoutes from "./routes/MainRoutes";
import reportWebVitals from './reportWebVitals';
import "./styles/global.scss";
import 'antd/dist/antd.min.css';


import configureStore from "./redux/stores";
import rootSaga from "./redux/sagas";

const store = configureStore();
store.runSaga(rootSaga);

const history = createBrowserHistory({
  basename: "/",
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <CookiesProvider>
        <BrowserRouter history={history} basename="/workapp">
          <MainRoutes />
        </BrowserRouter>
      </CookiesProvider>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
