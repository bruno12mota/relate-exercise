import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import PostModel from '../../models/post';
import getProjection from '../../helpers/get-projection';
import postType from '../../types/post';

export default {
  type: postType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      name: 'content',
      type: new GraphQLNonNull(GraphQLJSON)
    }
  },
  async resolve (root, params, ctx, options) {
    const projection = getProjection(options.fieldASTs[0]);

    const resultPost = await PostModel
      .findByIdAndUpdate(params.id, {
        title: params.title,
        content: params.content
      }, {
        upsert: true,
        new: true
      })
      .select(projection)
      .exec();

    if (!resultPost) {
      throw new Error('Post not found');
    }

    return resultPost;
  }
};
