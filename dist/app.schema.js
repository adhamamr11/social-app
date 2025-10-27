"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSchema = void 0;
const graphql_1 = require("graphql");
const post_query_1 = require("./modules/post/graphql/post-query");
const query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: { ...post_query_1.postQuery }
});
exports.appSchema = new graphql_1.GraphQLSchema({ query });
