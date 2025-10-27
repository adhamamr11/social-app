import { GraphQLID } from "graphql";
import { postResponse, postsResponse } from "./post-type";
import { getPosts, getSpecificPost } from "./post-service.graphql";

export const postQuery = {
    getPost :{
        type : postResponse
        ,
        args : { id : {type : GraphQLID}},
        resolve : getSpecificPost
        },
        
    getPosts :{
            type : postsResponse,
            resolve : getPosts
        }
    }
