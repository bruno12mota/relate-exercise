import actionTypes from 'actions';
import {mutation} from 'relate-js';
import {push} from 'redux-router';

export function changeTitle (value) {
  return {
    type: actionTypes.changeTitle,
    value
  };
}

export function changeContent (value) {
  return {
    type: actionTypes.changeContent,
    value
  };
}

export function postResetDefault () {
  return {
    type: actionTypes.resetDefaults
  };
}

export function createPost (title, content) {

}

export function updatePost (id, title, content) {

}

export function removePost (id) {
  
}
