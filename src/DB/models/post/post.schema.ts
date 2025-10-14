import { Schema } from "mongoose";
import { IPOST, IReaction } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";
import { reactionSchema } from "../common/react.schema";
import { Comment } from "../comment/comment.model";


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
mentions :[
    {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
]
},{timestamps :true,toJSON : {virtuals : true},toObject:{virtuals:true}});

postSchema.virtual("comments",{
    foreignField:"postId",
    localField : "_id",
    ref : "Comment", 
});

postSchema.pre("deleteOne",async function (next) {

    const filter = this.getFilter();

    await Comment.deleteMany({postId : filter._id});
    next();
})