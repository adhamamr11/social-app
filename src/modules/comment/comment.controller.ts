import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import commentService from "./comment.service";

const commentRouter =  Router({mergeParams :true});

commentRouter.post("{/:id}",IsAuthenticated(),commentService.create)

export default commentRouter;