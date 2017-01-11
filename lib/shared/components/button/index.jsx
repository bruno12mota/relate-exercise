import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import cx from 'classnames';
import forEach from 'lodash.foreach';
import styles from './index.less';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    url: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    primary: PropTypes.bool,
    block: PropTypes.bool,
    cancel: PropTypes.bool,
    margins: PropTypes.bool
  };

  render () {
    const {onClick, url, className, ...classes} = this.props;
    let result;

    let resultClassName = cx(styles.button, className);
    forEach(classes, (value, key) => {
      if (styles[key] && value) {
        resultClassName = cx(resultClassName, styles[key]);
      }
    });

    if (url) {
      result = (
        <Link to={url} className={resultClassName}>
          {this.props.children}
        </Link>
      );
    } else {
      result = (
        <div onClick={onClick} className={resultClassName}>
          {this.props.children}
        </div>
      );
    }

    return result;
  }
}
