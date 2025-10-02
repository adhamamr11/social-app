import { Schema } from "mongoose";
import { IReaction } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";


export const reactionSchema = new Schema<IReaction>({

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
