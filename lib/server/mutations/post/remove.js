import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import PostModel from '../../models/post';
import postType from '../../types/post';

export default {
  type: postType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    const removedPost = await PostModel.findByIdAndRemove(params.id).exec();

    if (!removedPost) {
      throw new Error('Post not found');
    }

    return removedPost;
  }
};
