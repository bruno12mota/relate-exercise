import {ContentState, convertToRaw} from 'draft-js';

import Relate from 'relate-js';
import actionTypes from 'actions';

const defaultState = {
  title: 'New Post Title',
  content: convertToRaw(ContentState.createFromText(''))
};

export default function postReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.resetDefaults:
      return defaultState;
    case actionTypes.changeTitle:
      return Object.assign({}, state, {
        title: action.value
      });
    case actionTypes.changeContent:
      return Object.assign({}, state, {
        content: action.value
      });
    default:
      return state;
  }
}
