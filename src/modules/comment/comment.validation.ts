import z from "zod";
import { CreateCommentDTO } from "./comment.dto";


export const createCommentSchema= z.object<CreateCommentDTO>({
    content : z.string() as unknown as string
})