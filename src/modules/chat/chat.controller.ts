import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import chatService from "./chat.service";

const chatRouter = Router()

chatRouter.get("/:userId",IsAuthenticated(),chatService.get)

export default chatRouter;