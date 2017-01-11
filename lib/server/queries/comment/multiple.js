import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import commentType from '../../types/comment';
import getProjection from '../../helpers/get-projection';
import CommentModel from '../../models/comment';

export default {
  type: new GraphQLList(commentType),
  args: {
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, request, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return CommentModel
      .find({
        postId: params.postId
      })
      .select(projection)
      .exec();
  }
};
