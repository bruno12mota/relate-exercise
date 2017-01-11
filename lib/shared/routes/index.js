import App from 'screens/app';
import Post from 'screens/app/screens/post';
import React from 'react';
import {Route} from 'react-router';

export default [
  <Route path='/' component={App}>
    <Route path=':id' component={Post} />
  </Route>
];
