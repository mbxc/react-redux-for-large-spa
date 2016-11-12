import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, RouterContext, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Store from 'store';
import RouteConfig from './RouteConfig';

export default dom => ReactDom.render(
  <Provider store={Store}>
    <Router
      history={syncHistoryWithStore(hashHistory, Store)}
      routes={RouteConfig}
      />
  </Provider>,
  dom
)