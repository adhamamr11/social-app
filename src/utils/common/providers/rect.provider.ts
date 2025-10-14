import { ObjectId } from "mongoose";
import { CommentRepo } from "../../../DB/models/comment/comment.repo";
import { PostRepo } from "../../../DB/models/post/post.repo";
import { NotFoundException } from "../../error";
import { REACTION } from "../enum";

export const reactionProvider = async(repo :PostRepo|CommentRepo,id:string,userId:ObjectId,reaction : string)=>{

    const postExist = await repo.exist({_id : id});
        if(!postExist) throw new NotFoundException("Post not found");

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