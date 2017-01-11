import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLFloat
} from 'graphql';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    text: {type: GraphQLString}
  }
});

export default commentType;
