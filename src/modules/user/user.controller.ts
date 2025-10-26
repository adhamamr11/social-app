import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import userService from "./user.service";
import { isValid } from "../../middleware/validation.middleware";
import { updateInfoSchema } from "./user.validation";




const userRouter = Router();


userRouter.get("/profile",IsAuthenticated(),userService.getProfile);

userRouter.put("/update-info",IsAuthenticated(),isValid(updateInfoSchema),userService.updateInfo);

userRouter.post("/friend-ship-request",IsAuthenticated(),userService.friendShipRequest);

userRouter.get("/list-friend-requests",IsAuthenticated(),userService.listFriendRequests);

userRouter.patch("/response-friend-request",IsAuthenticated(),userService.responseToFriendRequest);

userRouter.patch("/block/:id",IsAuthenticated(),userService.blockUser)

export default userRouter;