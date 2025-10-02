import { Request, Response } from "express";
import { PostRepo } from "../../DB/models/post/post.repo";
import { PostFactory } from "./factory";
import { CreatePostDTO } from "./post.dto";
import { NotFoundException } from "../../utils/error";
import { REACTION } from "../../utils/common/enum";



class PostService{

    private readonly postFactory = new PostFactory();
    private readonly postRepo = new PostRepo();

    public create = async(req: Request,res : Response)=>{

        const createPostDTO : CreatePostDTO = req.body;

        const post = this.postFactory.create(createPostDTO,req.user);

        const createdPost = await this.postRepo.create(post);

        return res.status(201).json({message : "Post created successfully",success : true,data : {createdPost}})
    }


    public addReaction = async (req: Request,res : Response)=>{
        const {id} = req.params;
        const {reaction} = req.body;

        const postExist = await this.postRepo.exist({_id : id});
        if(!postExist) throw new NotFoundException("Post not found");

        let userReactionIndex = postExist.reactions.findIndex((reaction)=>{
            return reaction.userId.toString() == req.user._id.toString(); 
        })

        if(userReactionIndex == -1) await this.postRepo.update({_id : id}
            ,{$push : {reactions : {reaction : ["",null,undefined].includes(reaction)
                ? REACTION.like
                :reaction
                ,userId : req.user._id}}});
        else if(["",null,undefined].includes(reaction)) await this.postRepo.update({_id:id}
            ,{$pull : {reactions :postExist.reactions[userReactionIndex]}});
        else {
            await this.postRepo.update({_id : id,"reactions.userId" : req.user._id},{"reactions.$.reaction" : reaction});
        }
        return res.sendStatus(204);
    }


     public getSpecific = async (req: Request,res : Response)=>{

        const {id} = req.params;
        const postExist = await this.postRepo.exist({_id:id},{},
            {populate:[{path : "userId",select:"fullName firstName lastName"}
                ,{path : "reactions.userId",select :"fullName firstName lastName"},
            {path :"comments",match : {parentIds : []}}]});
        if(!postExist) throw new NotFoundException("Post not found");
        return res.status(200).json({success : true,post :{postExist}})
     }

}

export default new PostService();