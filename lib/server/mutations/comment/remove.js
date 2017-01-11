import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import commentType from '../../types/comment';
import getProjection from '../../helpers/get-projection';
import CommentModel from '../../models/comment';

export default {
  type: commentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, request, options) {
    const removedComment = await CommentModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

    if (!removedComment) {
      throw new Error('Comment not found');
    }

    return removedComment;
  }
};
