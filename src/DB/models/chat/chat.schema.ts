import { Schema } from "mongoose";
import { IChat } from "../../../utils/common/interface";

export const chatSchema = new Schema<IChat>({
    users : [{type : Schema.ObjectId,ref: "User",required :true}],
    messages : [{type : Schema.ObjectId,ref: "Message",required :true}]
},{timestamps : true})