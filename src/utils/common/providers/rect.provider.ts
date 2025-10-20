import { ObjectId } from "mongoose";
import { CommentRepo } from "../../../DB/models/comment/comment.repo";
import { PostRepo } from "../../../DB/models/post/post.repo";
import { BadRequestException, NotFoundException } from "../../error";
import { REACTION } from "../enum";
import { IUser } from "../interface";
import { UserRepo } from "../../../DB/models/user/user.repo";


export const reactionProvider = async(repo :PostRepo|CommentRepo ,id:string,userId:ObjectId,reaction : string,user :IUser)=>{

    const userRepo = new UserRepo();

    const postExist = await repo.exist({_id : id});
        if(!postExist) throw new NotFoundException("Post not found");

        const userExist = await userRepo.exist({_id : postExist.userId});
        if(userExist.blocks.includes(user._id)) throw new BadRequestException("you can't react because you are blocked");
        

    let userReactionIndex = postExist.reactions.findIndex((reaction)=>{
            return reaction.userId.toString() == userId.toString(); 
        })

        if(userReactionIndex == -1) await repo.update({_id : id}
            ,{$push : {reactions : {reaction : ["",null,undefined].includes(reaction)
                ? REACTION.like
                :reaction
                ,userId : userId}}});
        else if(["",null,undefined].includes(reaction)) await repo.update({_id:id}
            ,{$pull : {reactions :postExist.reactions[userReactionIndex]}});
        else {
            await repo.update({_id : id,"reactions.userId" : userId},{"reactions.$.reaction" : reaction});
        }    


}