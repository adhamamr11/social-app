"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const user_repo_1 = require("../../../DB/models/user/user.repo");
const error_1 = require("../../../utils/error");
exports.AuthProvider = {
    async checkOTP(verifyAccDTO) {
        const userRepo = new user_repo_1.UserRepo();
        const userExist = await userRepo.exist({ email: verifyAccDTO.email });
        if (!userExist)
            throw new error_1.NotFoundException("User Not Found");
        if (verifyAccDTO.otp != userExist.otp)
            throw new error_1.BadRequestException("Invalid otp");
        if (userExist.otpExpiryAt < new Date())
            throw new error_1.BadRequestException("otp expired");
    }
};
