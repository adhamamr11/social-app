import { Schema } from "mongoose";
import { IPOST, IReaction } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";
import { reactionSchema } from "../common/react.schema";


export const postSchema = new Schema<IPOST>({
userId :{
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
},
content : {
    type : String,
    required : true,
    trim : true
},
reactions : [reactionSchema],
},{timestamps :true,toJSON : {virtuals : true},toObject:{virtuals:true}});

postSchema.virtual("comments",{
    foreignField:"postId",
    localField : "_id",
    ref : "Comment", 
})