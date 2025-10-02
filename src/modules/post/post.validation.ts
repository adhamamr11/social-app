import z from "zod";
import { CreatePostDTO } from "./post.dto";

export const createPostSchema = z.object<CreatePostDTO>({
    content : z.string() as unknown as string
});

