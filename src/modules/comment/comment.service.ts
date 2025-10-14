import { Request, Response } from "express";
import { PostRepo } from "../../DB/models/post/post.repo";
import { CommentRepo } from "../../DB/models/comment/comment.repo";
import { NotFoundException, UnauthorizedException } from "../../utils/error";
import { CreateCommentDTO } from "./comment.dto";
import { CommentFactory } from "./factory";
import { IPOST } from "../../utils/common/interface";
import { reactionProvider } from "../../utils/common/providers/rect.provider";



class CommentService{
    private readonly postRepo = new PostRepo();
    private readonly commentRepo = new CommentRepo();
    private readonly commentFactory = new CommentFactory();

    public create = async (req:Request,res: Response) => {
        
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

        return res.status(201).json({message :"comment created successfully",success : true,createdComment})

    }

    public getSpecific = async (req : Request,res : Response)=>{

        const {id} = req.params;
         
        const comment = await this.commentRepo.exist({_id :id},{},{populate : [{path : "replies"}]});
        if(!comment) throw new NotFoundException("Comment not found");
        
        return res.status(200).json({success :true,comment})
    }

    public deleteComment = async (req: Request,res :Response)=>{
        const {id} = req.params;

        const commentExist = await this.commentRepo.exist({_id :id},{},{
            populate : [{path : "postId",select : "userId"}]
        });
        if(!commentExist) throw new NotFoundException("Comment not found");

        if(req.user._id.toString() != commentExist.userId.toString() || 
        req.user._id.toString() != (commentExist.postId as unknown as IPOST).userId.toString())
         throw new UnauthorizedException("You are not authorized to delet this comment");

        await this.commentRepo.delete({_id : id});

        return res.status(200).json({message : "Comment deleted successfully",success :true});
    }

     public addReaction = async (req: Request,res : Response)=>{
            const {id} = req.params;
            const {reaction} = req.body;
    
            await reactionProvider(this.commentRepo,id,req.user._id,reaction);
            
            return res.sendStatus(204);
        }

}

export default new CommentService();