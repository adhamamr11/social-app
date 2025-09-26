"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
const enum_1 = require("../../../utils/common/enum");
const entity_1 = require("../entity");
const otp_1 = require("../../../utils/otp");
const hash_1 = require("../../../utils/hash");
class AuthFactory {
    user = new entity_1.UserEntity();
    async register(registerDTO) {
        this.user.fullName = registerDTO.fullName;
        this.user.email = registerDTO.email;
        this.user.password = await (0, hash_1.hashPassword)(registerDTO.password);
        this.user.phoneNumber = registerDTO.phoneNumber;
        this.user.gender = registerDTO.gender;
        this.user.role = enum_1.ROLE.USER;
        this.user.userAgent = enum_1.USER_AGENT.LOCAL;
        this.user.otp = (0, otp_1.generateOTP)();
        this.user.otpExpiryAt = (0, otp_1.generateExpiryTime)(5);
        this.user.credentialUpdatedAt = new Date();
        this.user.isVerified = false;
        return this.user;
    }
}
exports.AuthFactory = AuthFactory;
