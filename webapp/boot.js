import React from 'react';
import ReactDom from 'react-dom';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import Store, { history } from 'store';
import App from './views/App';

const AppContainer = connect(v => v)(App);
export default dom => ReactDom.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}><AppContainer /></ConnectedRouter>
  </Provider>,
  dom
)