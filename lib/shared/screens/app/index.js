import 'styles/normalize.less';

import React, {Component} from 'react';

import App from './components';

export default class AppContainer extends Component {
  render () {
    return (
      <App {...this.props} />
    );
  }
}
