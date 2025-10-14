import { Request, Response } from "express";
import { PostRepo } from "../../DB/models/post/post.repo";
import { PostFactory } from "./factory";
import { CreatePostDTO } from "./post.dto";
import { NotFoundException, UnauthorizedException } from "../../utils/error";
import { reactionProvider } from "../../utils/common/providers/rect.provider";
import { IPOST } from "../../utils/common/interface";



class PostService{

    private readonly postFactory = new PostFactory();
    private readonly postRepo = new PostRepo();

    public create = async(req: Request,res : Response)=>{

        const createPostDTO : CreatePostDTO = req.body;

        const post = await this.postFactory.create(createPostDTO,req.user);

        const createdPost = await this.postRepo.create(post);

        return res.status(201).json({message : "Post created successfully",success : true,data : {createdPost}})
    }


    public addReaction = async (req: Request,res : Response)=>{
        const {id} = req.params;
        const {reaction} = req.body;

        await reactionProvider(this.postRepo,id,req.user._id,reaction);
        
        return res.sendStatus(204);
    }


    public getSpecific = async (req: Request,res : Response)=>{

        const {id} = req.params;
        const postExist = await this.postRepo.exist({_id:id},{},
            {populate:[{path : "userId",select:"fullName firstName lastName"}
                ,{path : "reactions.userId",select :"fullName firstName lastName"},
            {path :"comments",match : {parentId : null}}]});
        if(!postExist) throw new NotFoundException("Post not found");
        return res.status(200).json({success : true,post :{postExist}})
     }


    public deletePost = async (req :Request,res :Response)=>{

        const {id} = req.params;
        const postExist = await this.postRepo.exist({_id :id});
        if(!postExist) throw new NotFoundException("Post not found");

        if(req.user._id.toString() != postExist.userId.toString()) throw new UnauthorizedException("You are not authorized to delete this post");

        await this.postRepo.delete({_id : id});

        return res.status(200).json({success :true,message :"Post deleted successfully"});
    } 


}

export default new PostService();