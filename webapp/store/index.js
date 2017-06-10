import { createStore, applyMiddleware, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createBrowserHistory from 'history/createBrowserHistory';
import reducers from "reducers";
import promiseMiddleware from './promise_middleware';
import ActionFactory from 'actions/createAction';

export const history = createBrowserHistory();

const rootReducer = (state, action) => {
  let newState = reducers(state, action);
  newState.routing = routerReducer(state.routing, action);
  return newState;
}

function configureStore() {
  let middlewares = [promiseMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    { routing: {} },
    applyMiddleware(...middlewares)
  );
}

const store = configureStore();
ActionFactory.init(store);

if (process.env.NODE_ENV !== 'production') {
  window.__store__ = store;
}

export default store;
