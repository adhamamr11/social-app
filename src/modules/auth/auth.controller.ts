import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware";
import { LoginSchema, registerShcema, VerifyAccShcema } from "./auth.validation";
import authService from "./auth.service";

export const authRouter = Router();

authRouter.post("/register",isValid(registerShcema),authService.register);

authRouter.post("/verify-acc",isValid(VerifyAccShcema),authService.verifyAcc);

authRouter.post("/login",isValid(LoginSchema),authService.login);