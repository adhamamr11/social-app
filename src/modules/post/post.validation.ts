import z from "zod";
import { CreatePostDTO } from "./post.dto";
import { ObjectIdSchema } from "../../utils/common/validation/objectId.valid";
import { ObjectId } from "mongoose";


export const createPostSchema = z.object<CreatePostDTO>({
    content : z.string() as unknown as string,
    mentions : z.array(ObjectIdSchema).optional() as unknown as ObjectId[]
});

