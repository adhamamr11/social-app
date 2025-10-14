"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repo_1 = require("../../DB/models/user/user.repo");
const factory_1 = require("./factory");
const auth_provider_1 = require("./providers/auth.provider");
const hash_1 = require("../../utils/hash");
const token_1 = require("../../utils/token");
const otp_1 = require("../../utils/otp");
const email_1 = require("../../utils/email");
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
        await this.userRepo.create(user);
        return res.status(201).json({ message: "User created successfully", success: true });
    };
    verifyAcc = async (req, res) => {
        const verifyAccDTO = req.body;
        const userExist = await this.userRepo.exist({ email: verifyAccDTO.email });
        if (!userExist)
            throw new error_1.NotFoundException("User Not Found");
        auth_provider_1.AuthProvider.checkOTP(verifyAccDTO, userExist);
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
        if (userExist.twoStepVrification) {
            const result = await this.userRepo.findAndUpdate({ email: userExist.email }, { otp: (0, otp_1.generateOTP)(), otpExpiryAt: (0, otp_1.generateExpiryTime)(5) }, { new: true });
            (0, email_1.sendMail)({ to: userExist.email, html: `<h1> your otp is ${result.otp} </h1>` });
            return res.status(200).json({ message: "Check Your Email" });
        }
        const accessToken = (0, token_1.generateToken)({ payload: { _id: userExist._id, role: userExist.role }, options: { expiresIn: "1d" } });
        return res.status(200).json({ message: "User login successfully", success: true, data: { accessToken } });
    };
    updatePassOTP = async (req, res) => {
        const result = await this.userRepo.findAndUpdate({ _id: req.user._id }, { otp: (0, otp_1.generateOTP)(), otpExpiryAt: (0, otp_1.generateExpiryTime)(5) }, { new: true });
        (0, email_1.sendMail)({ to: req.user.email, html: `<h1>your otp is ${result.otp}</h1>` });
        return res.status(200).json({ message: "Check Your Email" });
    };
    updatePass = async (req, res) => {
        const updatePassDTO = req.body;
        auth_provider_1.AuthProvider.checkOTP(updatePassDTO, req.user);
        await this.userRepo.update({ _id: req.user._id }, { password: await (0, hash_1.hashPassword)(updatePassDTO.password),
            $unset: { otp: "", otpExpiryAt: "" }, credentialUpdatedAt: Date.now() });
        return res.status(200).json({ success: true, massage: "Password updated successfully" });
    };
    updateEmailOTP = async (req, res) => {
        const updateEmailDTO = req.body;
        const result = await this.userRepo.findAndUpdate({ _id: req.user._id }, { email: updateEmailDTO.email,
            otp: (0, otp_1.generateOTP)(),
            otpExpiryAt: (0, otp_1.generateExpiryTime)(5),
            isVerified: false
        }, { new: true });
        await (0, email_1.sendMail)({ to: result.email, html: `<h1>your otp is ${result.otp}</h1>` });
        return res.status(200).json({ message: "Check Your Email" });
    };
    confirmEmail = async (req, res) => {
        const confirmEmailDTO = req.body;
        auth_provider_1.AuthProvider.checkOTP(confirmEmailDTO, req.user);
        if (confirmEmailDTO.email != req.user.email)
            throw new error_1.BadRequestException("invalid email");
        await this.userRepo.update({ _id: req.user._id }, { $unset: { otp: "", otpExpiryAt: "" }, isVerified: true });
        return res.status(200).json({ success: true, message: "Email updated successfully" });
    };
    twoStepVerification = async (req, res) => {
        const twoStepVerificationDTO = req.body;
        const result = await this.userRepo.findAndUpdate({ email: twoStepVerificationDTO.email }, { otp: (0, otp_1.generateOTP)(), otpExpiryAt: (0, otp_1.generateExpiryTime)(5) }, { new: true });
        await (0, email_1.sendMail)({ to: result.email, html: `<h1>your otp is ${result.otp}</h1>` });
        return res.status(200).json({ message: "Check Your Email" });
    };
    confirm2StepVerification = async (req, res) => {
        const confirm2StepVerification = req.body;
        const user = await this.userRepo.find({ email: confirm2StepVerification.email });
        auth_provider_1.AuthProvider.checkOTP(confirm2StepVerification, user);
        await this.userRepo.update({ email: confirm2StepVerification.email }, { $unset: { otp: "", otpExpiryAt: "" }, twoStepVrification: true });
        return res.status(200).json({ success: true, message: "2 step verification confirmed" });
    };
    loginConfirmation = async (req, res) => {
        const confirm2StepVerification = req.body;
        const user = await this.userRepo.find({ email: confirm2StepVerification.email });
        auth_provider_1.AuthProvider.checkOTP(confirm2StepVerification, user);
        await this.userRepo.update({ email: confirm2StepVerification.email }, { $unset: { otp: "", otpExpiryAt: "" } });
        const accessToken = (0, token_1.generateToken)({ payload: { _id: user._id, role: user.role }, options: { expiresIn: "1d" } });
        return res.status(200).json({ success: true, message: "user login successfully", data: { accessToken } });
    };
}
exports.default = new AuthService();
