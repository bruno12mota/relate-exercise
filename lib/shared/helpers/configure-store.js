import {applyMiddleware, compose, createStore} from 'redux';

import reducer from 'reducers';
import thunkMiddleware from 'redux-thunk';

const middleware = [];

middleware.push(thunkMiddleware);

if (typeof window !== 'undefined' && module.hot) {
  // eslint-disable-next-line global-require
  const createLogger = require('redux-logger');

  middleware.push(createLogger());
}

export default function configureStore (routerMiddleware, initialState = {}) {
  const store = compose(
    applyMiddleware(
      ...middleware
    ),
    routerMiddleware
  )(createStore)(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
