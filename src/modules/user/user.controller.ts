import { Router } from "express";
import { IsAuthenticated } from "../../middleware/auth.middleware";
import userService from "./user.service";
import { isValid } from "../../middleware/validation.middleware";
import { updateInfoSchema } from "./user.validation";



const userRouter = Router();

userRouter.put("/update-info",IsAuthenticated(),isValid(updateInfoSchema),userService.updateInfo);

export default userRouter;