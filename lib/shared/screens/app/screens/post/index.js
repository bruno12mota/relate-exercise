import * as postActions from 'actions/post';

import {EditorState, convertToRaw} from 'draft-js';
import React, {Component, PropTypes} from 'react';

import Post from './components';
import bind from 'decorators/bind';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    id: state.router.params.id,
    isNew: state.router.params.id === 'new',
    isEdit: !!(state.router.location.query.edit) || state.router.params.id === 'new',
    editPostState: state.post
  }),
  (dispatch) => bindActionCreators(postActions, dispatch),
  (props) => {
    let result = {};

    if (props.id !== 'new') {
      result = {
        fragments: Post.fragments,
        variablesTypes: {
          post: {
            id: 'ID!'
          }
        },
        initialVariables: {
          post: {
            id: props.id
          }
        }
      };
    }

    return result;
  }
)
export default class PostContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    editPostState: PropTypes.object.isRequired,
    changeTitle: PropTypes.func.isRequired,
    changeContent: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    postResetDefault: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    loading: PropTypes.bool,
    relate: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id && nextProps.id !== 'new') {
      this.props.relate.refresh(nextProps);
    }

    if (this.props.id !== 'new' && nextProps.id === 'new') {
      this.props.postResetDefault();
    }
  }

  @bind
  onSubmit () {
    const {id, isNew, editPostState, createPost, updatePost} = this.props;
    let rawContent;

    if (editPostState.content instanceof EditorState) {
      rawContent = convertToRaw(editPostState.content.getCurrentContent());
    } else {
      rawContent = editPostState.content;
    }

    if (isNew) {
      createPost(editPostState.title, rawContent);
    } else {
      updatePost(id, editPostState.title, rawContent);
    }
  }

  @bind
  removePost () {
    const {removePost, id} = this.props;
    removePost(id);
  }

  render () {
    const {
      id,
      isNew,
      isEdit,
      post,
      editPostState,
      loading,
      changeTitle,
      changeContent
    } = this.props;

    return (
      <Post
        id={id}
        isNew={isNew}
        isEdit={isEdit}
        post={isEdit ? editPostState : post}
        loading={loading}
        changeTitle={changeTitle}
        changeContent={changeContent}
        onSubmit={this.onSubmit}
        onRemovePost={this.removePost}
        {...this.state}
      />
    );
  }
}
