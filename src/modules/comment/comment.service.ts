import { Request, Response } from "express";
import { PostRepo } from "../../DB/models/post/post.repo";
import { CommentRepo } from "../../DB/models/comment/comment.repo";
import { NotFoundException } from "../../utils/error";
import { CreateCommentDTO } from "./comment.dto";
import { CommentFactory } from "./factory";


class CommentService{
    private readonly postRepo = new PostRepo();
    private readonly commentRepo = new CommentRepo();
    private readonly commentFactory = new CommentFactory();

    create = async (req:Request,res: Response) => {
        
        const {postId,id} = req.params;
        const createCommentDTO:CreateCommentDTO = req.body;

        const postExist = await this.postRepo.exist({_id : postId});
        if(!postExist) throw new NotFoundException("Post not found");

        let commentExist ;

        if(id){
            commentExist = await this.commentRepo.exist({_id:id});
            if(!commentExist) throw new NotFoundException("Comment not found");
        }

        const comment = this.commentFactory.create(req.user,postExist,createCommentDTO,commentExist);

        const createdComment = await this.commentRepo.create(comment);

        return res.status(200).json({message :"comment created successfully",success : true,createdComment})

    }
}

export default new CommentService();