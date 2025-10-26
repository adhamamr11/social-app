import { Schema } from "mongoose";
import { IMessage } from "../../../utils/common/interface";

export const messageSchema = new Schema<IMessage>({
    content : {type : String,required : true},
    sender : {type : Schema.ObjectId,ref: "User",required :true}
},{timestamps : true})