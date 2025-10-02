import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import postService from "./post.service";
import { isValid } from "../../middleware/validation.middleware";
import { createPostSchema } from "./post.validation";
import commentService from "../comment/comment.service";
import commentRouter from "../comment/comment.controller";

const postRouter = Router();

postRouter.post("/",isValid(createPostSchema),IsAuthenticated(),postService.create);

postRouter.patch("/:id",IsAuthenticated(),postService.addReaction);

postRouter.get("/:id",IsAuthenticated(),postService.getSpecific);

postRouter.use("/:postId/comment",commentRouter);

export default postRouter;