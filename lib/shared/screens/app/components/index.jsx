import React, {Component, PropTypes} from 'react';

import List from './list';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <div>
        <List />
        {this.props.children}
      </div>
    );
  }
}
