import {match, reduxReactRouter} from 'redux-router/server';

import configureStore from 'helpers/configure-store';
import {createMemoryHistory as createHistory} from 'history';

export default function routeHandler (routes, req, res, next) {
  const store = configureStore(reduxReactRouter({
    createHistory,
    routes
  }));
  const url = req.originalUrl;

  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (routerState) {
      req.routerState = routerState;
      req.store = store;
      next();
    } else {
      res.status(404).send('Not found');
    }
  }));
}