import {combineReducers} from 'redux';
import post from './post';
import {routerStateReducer as router} from 'redux-router';

export const reducersToCombine = {
  router,
  post
};

export default combineReducers(reducersToCombine);
