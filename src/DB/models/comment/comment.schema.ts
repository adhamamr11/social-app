import { Schema } from "mongoose";
import { IComment } from "../../../utils/common/interface";
import { reactionSchema } from "../common/react.schema";


export const commentSchema = new Schema<IComment>({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    postId : {
        type : Schema.Types.ObjectId,
        ref : "Post",
        required : true
    },
    parentIds: [{
        type : Schema.Types.ObjectId,
        ref : "Comment",
    }],
    content : {
        type : String,
        trim : true
    },
    reactions : [reactionSchema],
},{timestamps : true})