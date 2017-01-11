/* global document, window */

import {ReduxRouter, reduxReactRouter} from 'redux-router';

import {Provider} from 'react-redux';
import React from 'react';
import configureStore from 'helpers/configure-store';
import {createHistory} from 'history';
import {render} from 'react-dom';

export default function renderRoutes (routes) {
  // eslint-disable-next-line no-underscore-dangle
  const state = window.__initialState;
  state.router = undefined;

  const store = configureStore(
    reduxReactRouter({createHistory, routes}),
    state
  );

  render(
    <Provider store={store}>
      <ReduxRouter routes={routes} />
    </Provider>,
    document.getElementById('view')
  );
}
