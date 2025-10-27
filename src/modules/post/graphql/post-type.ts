import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { userType } from "../../user/graphql/user-type";


export const postType = new GraphQLObjectType({
            name : "Post",
            fields :{
            _id : {type : GraphQLID},
            content : {type : GraphQLString},
            userId : {type : userType},
            createdAt : {type : GraphQLString},
            updatedAt : {type : GraphQLString}
            }
        });



export const postResponse = new GraphQLObjectType({
            name : "PostResponse",
            fields : {
                message : {type : GraphQLString},
                success : {type : GraphQLBoolean},
                data : {type : postType}
            }});




export const postsResponse = new GraphQLObjectType({
            name : "PostsResponse",
            fields : {
                message : {type : GraphQLString},
                success : {type : GraphQLBoolean},
                data : {type : new GraphQLList(postType)}
            }});

