import React, {Component, PropTypes} from 'react';

import Button from 'components/button';
import Entry from './entry';
import Scrollable from 'components/scrollable';
import styles from './list.less';

export default class List extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    currentId: PropTypes.string,
    loadMore: PropTypes.func.isRequired
  };

  render () {
    const {loading, posts, loadMore} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!posts) {
      result = this.renderError();
    } else {
      result = this.renderContent();
    }

    return (
      <div className={styles.root}>
        <Scrollable className={styles.content} lazyLoad loadMore={loadMore}>
          {result}
        </Scrollable>
        <div className={styles.footer}>
          <Button url='/new' primary block>
            Create new post
          </Button>
        </div>
      </div>
    );
  }

  renderLoading () {
    return (
      <div>Loading</div>
    );
  }

  renderError () {
    return (
      <div>Error loading posts</div>
    );
  }

  renderContent () {
    const {posts} = this.props;

    return (
      <div>
        {posts.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (post) {
    const {currentId} = this.props;

    return (
      <Entry
        key={post._id}
        post={post}
        active={currentId === post._id}
      />
    );
  }
}
