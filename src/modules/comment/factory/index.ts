import { ObjectId } from "mongoose";
import {IComment, IPOST, IUser } from "../../../utils/common/interface";
import { Comment } from "../entity";
import { CreateCommentDTO } from "../comment.dto";

export class CommentFactory {

    create (user:IUser,post : IPOST,createCommentDTO : CreateCommentDTO,comment ?:IComment){
        const newComment = new Comment();

        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.reactions = [],
        newComment.content = createCommentDTO.content,
        newComment.parentIds = comment ?[...comment.parentIds ,comment._id] : [] 
        
        return newComment;
    }
}