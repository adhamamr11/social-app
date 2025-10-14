import { ObjectId } from "mongoose"
import { IAttachment, IReaction } from "../../../utils/common/interface"

export class Comment{
    userId : ObjectId;
        postId : ObjectId;
        content : string;
        parentId : ObjectId;
        reactions : IReaction[];
        attachments ?: IAttachment[]
}