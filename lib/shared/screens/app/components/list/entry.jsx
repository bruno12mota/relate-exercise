import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import cx from 'classnames';
import moment from 'moment';
import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.bool
  };

  render () {
    const {post, active} = this.props;
    const date = moment(post.date).fromNow();

    return (
      <Link className={cx(styles.root, active && styles.active)} to={`/${post._id}`}>
        <div className={styles.title}>
          {post.title}
        </div>
        <div className={styles.date}>
          {date}
        </div>
      </Link>
    );
  }
}
