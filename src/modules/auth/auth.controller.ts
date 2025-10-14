import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware";
import { LoginSchema, registerShcema, updateEmailSchema, VerifyAccShcema } from "./auth.validation";
import authService from "./auth.service";
import { IsAuthenticated } from "../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register",isValid(registerShcema),authService.register);

authRouter.post("/verify-acc",isValid(VerifyAccShcema),authService.verifyAcc);

authRouter.post("/login",isValid(LoginSchema),authService.login);

authRouter.get("/update-pass-otp",IsAuthenticated(),authService.updatePassOTP);

authRouter.patch("/update-pass",IsAuthenticated(),authService.updatePass);

authRouter.patch("/update-email",IsAuthenticated(),isValid(updateEmailSchema),authService.updateEmailOTP);

authRouter.patch("/confirm-email",IsAuthenticated(),isValid(VerifyAccShcema),authService.confirmEmail);

authRouter.get("/2-step-verfifcation",authService.twoStepVerification);

authRouter.patch("/confirm-2-step",authService.confirm2StepVerification);

authRouter.post("/confirm-login",authService.loginConfirmation);