import React, {Component, PropTypes} from 'react';

import List from './list';
import bind from 'decorators/bind';
import {dataConnect} from 'relate-js';
import getLazyFilters from 'helpers/get-lazy-load-filters';

@dataConnect(
  (state) => ({
    currentId: state.router.params.id,
    search: state.router.location.query.s || ''
  }),
  (props) => ({
    fragments: {},
    variablesTypes: {},
    initialVariables: {},
    mutations: {}
  })
)
export default class ListContainer extends Component {
  static propTypes = {
    currentId: PropTypes.string,
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    search: PropTypes.string,
    relate: PropTypes.object
  };

  @bind
  loadMore () {

  }

  render () {
    const {posts, loading, currentId} = this.props;

    return (
      <List
        posts={posts}
        loading={loading}
        currentId={currentId}
        loadMore={this.loadMore}
      />
    );
  }
}
