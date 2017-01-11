import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import PostModel from '../../models/post';
import postType from '../../types/post';

export default {
  type: postType,
  args: {
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      name: 'content',
      type: new GraphQLNonNull(GraphQLJSON)
    }
  },
  async resolve (root, params) {
    const postModel = new PostModel({
      title: params.title,
      content: params.content
    });
    const post = await postModel.save();

    if (!post) {
      throw new Error('Error creating post');
    }

    return post;
  }
};
