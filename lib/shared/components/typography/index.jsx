import React, {Component, PropTypes} from 'react';

import cx from 'classnames';
import styles from './index.less';

export default class Typography extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  render () {
    const {className, children, ...props} = this.props;

    return (
      <div className={cx(styles.root, className)} {...props}>
        {children}
      </div>
    );
  }
}
