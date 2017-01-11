import React, {Component, PropTypes} from 'react';

import Animate from 'components/animate';
import Button from 'components/button';
import DraftHtml from 'components/draft-html';
import Editor from 'components/editor';
import Scrollable from 'components/scrollable';
import Typography from 'components/typography';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './index.less';

export default class Post extends Component {
  static fragments = {
    post: {
      _id: 1,
      title: 1,
      content: 1
    }
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    changeTitle: PropTypes.func.isRequired,
    changeContent: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRemovePost: PropTypes.func.isRequired
  };

  @bind
  onChangeTitle (event) {
    this.props.changeTitle(event.target.value);
  }

  render () {
    const {isEdit} = this.props;

    return (
      <div className={cx(styles.root, isEdit && styles.editing)}>
        <Scrollable className={styles.scrollArea}>
          <div className={styles.content}>
            {this.renderContent()}
          </div>
        </Scrollable>
        <div className={styles.footer}>
          {this.renderFooterContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    const {isEdit, post = {}} = this.props;
    let result;

    if (isEdit) {
      const {changeContent} = this.props;

      result = (
        <div>
          <input
            className={styles.input}
            value={post.title}
            onChange={this.onChangeTitle}
          />
          <Editor
            value={post.content}
            onChange={changeContent}
          />
        </div>
      );
    } else {
      result = (
        <Typography>
          <h1>{post.title}</h1>
          <DraftHtml raw={post.content} />
        </Typography>
      );
    }

    return result;
  }

  renderFooterContent () {
    const {isEdit, isNew, id, onSubmit, onRemovePost} = this.props;
    let result;

    if (isEdit) {
      result = (
        <Animate key='edit'>
          <div>
            <Button cancel margins url={isNew ? '/' : `/${id}`}>
              {isNew ? 'Cancel new' : 'Cancel edit'}
            </Button>
            <Button primary margins onClick={onSubmit}>
              {isNew ? 'Create post' : 'Save post'}
            </Button>
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='post'>
          <div>
            <Button primary margins url={`/${id}?edit=1`}>
              Edit post
            </Button>
            <Button cancel margins onClick={onRemovePost}>
              Remove Post
            </Button>
          </div>
        </Animate>
      );
    }

    return result;
  }
}
