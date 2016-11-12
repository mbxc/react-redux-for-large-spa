import { createStore, applyMiddleware, compose } from "redux";
import { routerReducer } from "react-router-redux";
import reducers from "reducers";
import promiseMiddleware from './promise_middleware';
import ActionFactory from 'actions/createAction';

const rootReducer = (state, action) => {
  let newState = reducers(state, action);
  newState.routing = routerReducer(state.routing, action);
  return newState;
}

function configureStore() {
  let middlewares = [promiseMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    middlewares.push(createLogger());
  }

  return createStore(
    rootReducer,
    { routing: {} },
    compose(applyMiddleware(...middlewares))
  )
}

const store = configureStore();
ActionFactory.init(store);

if (process.env.NODE_ENV !== 'production') {
  window.__store__ = store;
}

export default store
