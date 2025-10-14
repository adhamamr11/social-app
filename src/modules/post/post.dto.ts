import { ObjectId } from "mongoose";

export interface CreatePostDTO{
    content : string;
    attachments ?: IArguments[];
    mentions ?: ObjectId[]
}