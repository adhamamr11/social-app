import { string } from "zod";
import { IUser } from "../../../utils/common/interface";
import { PostEntity } from "../entity";
import { CreatePostDTO } from "../post.dto";
import { NotFoundException } from "../../../utils/error";
import { sendMail } from "../../../utils/email";
import { UserRepo } from "../../../DB/models/user/user.repo";
import { ObjectId } from "mongoose";

export class PostFactory{

    async create(createPostDTO : CreatePostDTO,user : IUser){
        const post = new PostEntity();
        const repo = new UserRepo();

        post.userId = user._id,
        post.content = createPostDTO.content,
        post.reactions = [];
        
        let validMentionUsers :String[] = [];

        if(createPostDTO.mentions?.length){
           
            for(const userId of  createPostDTO.mentions){
               const userExist = await repo.find({_id : userId});
                
                if(!userExist) throw new NotFoundException("user not found");

                validMentionUsers.push(userExist._id.toString());

                sendMail({to: userExist.email,from : user.email,html : `<h1> ${user.fullName} mention you in a post</h1>`})
            }
        }

        post.mentions = validMentionUsers as unknown as ObjectId[]

        return post;
    }
}