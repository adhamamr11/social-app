"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsResponse = exports.postResponse = exports.postType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("../../user/graphql/user-type");
exports.postType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: { type: user_type_1.userType },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString }
    }
});
exports.postResponse = new graphql_1.GraphQLObjectType({
    name: "PostResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.postType }
    }
});
exports.postsResponse = new graphql_1.GraphQLObjectType({
    name: "PostsResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.postType) }
    }
});
