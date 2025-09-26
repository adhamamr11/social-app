import { Schema } from "mongoose";
import { IPOST, IReaction } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";


const reactionSchema = new Schema<IReaction>({

    userId :{
        type : Schema.Types.ObjectId,
    ref : "User",
    required : true
    },
    reaction : {
        type : Number,
        enum : REACTION,
        default : REACTION.like
    }
},{timestamps:true});


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
},{timestamps :true});