import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import PostModel from '../../models/post';
import getProjection from '../../helpers/get-projection';
import postType from '../../types/post';

export default {
  type: postType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, request, options) {
    const projection = getProjection(options.fieldASTs[0]);

    const post = await PostModel
      .findById(params.id)
      .select(projection)
      .exec();

    if (!post) {
      throw new Error('Not post found');
    }

    return post;
  }
};
