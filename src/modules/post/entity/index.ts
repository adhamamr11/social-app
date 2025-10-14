import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utils/common/interface";

export class PostEntity{
    userId:ObjectId;
        content :string;
        reactions: IReaction[];
        attachments? : IAttachment[];
        mentions?: ObjectId[]
}