"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const error_1 = require("../../../utils/error");
exports.AuthProvider = {
    checkOTP(DTO, user) {
        if (DTO.otp != user.otp)
            throw new error_1.BadRequestException("Invalid otp");
        if (user.otpExpiryAt < new Date())
            throw new error_1.BadRequestException("otp expired");
    }
};
