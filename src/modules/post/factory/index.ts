import { IUser } from "../../../utils/common/interface";
import { PostEntity } from "../entity";
import { CreatePostDTO } from "../post.dto";

export class PostFactory{

    create(createPostDTO : CreatePostDTO,user : IUser){
        const post = new PostEntity();

        post.userId = user._id,
        post.content = createPostDTO.content,
        post.reactions = []

        return post;
    }
}