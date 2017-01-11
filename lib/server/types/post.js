import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    title: {type: GraphQLString},
    content: {type: GraphQLJSON}
  }
});

export default postType;
