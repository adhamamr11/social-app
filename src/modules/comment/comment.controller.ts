import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import commentService from "./comment.service";
import { isValid } from "../../middleware/validation.middleware";
import { createCommentSchema } from "./comment.validation";

const commentRouter =  Router({mergeParams :true});

commentRouter.post("{/:id}",IsAuthenticated(),isValid(createCommentSchema),commentService.create);

commentRouter.get("/:id",IsAuthenticated(),commentService.getSpecific);

commentRouter.delete("/:id",IsAuthenticated(),commentService.deleteComment);

commentRouter.patch("/:id",IsAuthenticated(),commentService.addReaction);

export default commentRouter;