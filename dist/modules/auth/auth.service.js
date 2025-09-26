"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repo_1 = require("../../DB/models/user/user.repo");
const factory_1 = require("./factory");
const auth_provider_1 = require("./providers/auth.provider");
const hash_1 = require("../../utils/hash");
const token_1 = require("../../utils/token");
class AuthService {
    userRepo = new user_repo_1.UserRepo();
    authFactory = new factory_1.AuthFactory();
    constructor() { }
    register = async (req, res) => {
        const registerDTO = req.body;
        const userExist = await this.userRepo.exist({ email: registerDTO.email });
        if (userExist) {
            throw new error_1.ConflictException("User already exists");
        }
        const user = await this.authFactory.register(registerDTO);
        const createdUser = await this.userRepo.create(user);
        return res.status(201).json({ message: "User created successfully", success: true, data: createdUser });
    };
    verifyAcc = async (req, res) => {
        const verifyAccDTO = req.body;
        await auth_provider_1.AuthProvider.checkOTP(verifyAccDTO);
        await this.userRepo.update({ email: verifyAccDTO.email }, { $unset: { otp: "", otpExpiryAt: "" }, isVerified: true });
        return res.sendStatus(204);
    };
    login = async (req, res) => {
        const loginDTO = req.body;
        const userExist = await this.userRepo.exist({ email: loginDTO.email });
        if (!userExist)
            throw new error_1.ForbiddenException("invalid credentials");
        if (!await (0, hash_1.comparePassword)(loginDTO.password, userExist.password))
            throw new error_1.ForbiddenException("invalid credentials");
        const accessToken = (0, token_1.generateToken)({ payload: { _id: userExist._id, role: userExist.role }, options: { expiresIn: "1d" } });
        return res.status(200).json({ message: "User login successfully", success: true, data: { accessToken } });
    };
}
exports.default = new AuthService();
