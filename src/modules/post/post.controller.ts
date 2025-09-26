import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import postService from "./post.service";
import { isValid } from "../../middleware/validation.middleware";
import { createPostSchema } from "./post.validation";

const postRouter = Router();

postRouter.post("/",isValid(createPostSchema),IsAuthenticated(),postService.create);

postRouter.patch("/:id",IsAuthenticated(),postService.addReaction);

export default postRouter;