import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

import commentType from '../../types/comment';
import CommentModel from '../../models/comment';

export default {
  type: commentType,
  args: {
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params) {
    const commentModel = new CommentModel(params);
    const comment = await commentModel.save();

    if (!comment) {
      throw new Error('Error adding new comment');
    }

    return comment;
  }
};
