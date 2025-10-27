import { PostRepo } from "../../../DB/models/post/post.repo";
import { IsAuthenticatedGraphQl } from "../../../middleware/auth.graphql.middleware";
import { isValidGraphQl } from "../../../middleware/validation.graphql.middleware";
import { ObjectIdSchema } from "../../../utils/common/validation/objectId.valid";
import { NotFoundException } from "../../../utils/error";
import { getPostSchema } from "./post-validation";

export const getSpecificPost = async (parent, args,context) => {

            await IsAuthenticatedGraphQl(context);

            isValidGraphQl(getPostSchema,args)

            const postRepo = new PostRepo();

            const post = await postRepo.exist({_id : args.id},{},{populate : [{path : "userId",select : "fullName email"}]});

            if(!post) throw new NotFoundException("Post not found");

            return {
                message : "Done",
                success : true,
                data : post
            };
};


export const getPosts = async (parent, args) => {

            const postRepo = new PostRepo();

            const posts = await postRepo.findAll({},{},{populate : [{path : "userId",select : "fullName email"}]});

            if(!posts) throw new NotFoundException("Post not found");

            return {
                message : "Done",
                success : true,
                data : posts
            };
}

