import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import Store, { history } from 'store';
import RouteConfig from './RouteConfig';

export default dom => ReactDom.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>{RouteConfig}</ConnectedRouter>
  </Provider>,
  dom
)