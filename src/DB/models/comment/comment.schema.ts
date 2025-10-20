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
    parentId: {
        type : Schema.Types.ObjectId,
        ref : "Comment",
    },
    content : {
        type : String,
        trim : true
    },
    reactions : [reactionSchema],
    deletedAt : {type : Date}
},{timestamps : true,toJSON : {virtuals :true},toObject : {virtuals : true}})


commentSchema.virtual("replies",{
    localField : "_id",
    foreignField : "parentId",
    ref : "Comment"
});

commentSchema.pre("deleteOne",async function (next) {
    
    const filter = this.getFilter();
    
    const replies = await this.model.find({parentId : filter._id});
    
    if(replies.length){
        for(const reply of replies){
        await this.model.deleteOne({_id : reply._id})
        }
    }
    next();
});