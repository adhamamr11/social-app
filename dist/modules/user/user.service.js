"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = require("../../DB/models/user/user.repo");
const factory_1 = require("./factory");
const friendship_repo_1 = require("../../DB/models/friendship/friendship.repo");
const error_1 = require("../../utils/error");
const enum_1 = require("../../utils/common/enum");
class UserService {
    userRepo = new user_repo_1.UserRepo();
    userFactory = new factory_1.UserFactory();
    friendShipRepo = new friendship_repo_1.FriendShipRepo();
    getProfile = async (req, res) => {
        return res.status(200).json({ message: " Done", success: true, data: { user: req.user } });
    };
    updateInfo = async (req, res) => {
        const updateInfoDTO = req.body;
        const result = this.userFactory.updateInfo(updateInfoDTO, req.user);
        await this.userRepo.findAndUpdate({ _id: req.user._id }, { firstName: result.firstName, lastName: result.lastName, phoneNumber: result.phoneNumber });
        return res.sendStatus(204);
    };
    friendShipRequest = async (req, res) => {
        const { requestTo } = req.body;
        const user = await this.userRepo.exist({ _id: requestTo });
        if (!user)
            throw new error_1.NotFoundException("User not found");
        const result = await this.friendShipRepo.find({ requestFrom: req.user._id, requestTo });
        if (result) {
            await this.friendShipRepo.delete({ requestFrom: req.user._id, requestTo });
            return res.status(200).json({ success: true, message: "FriendShip request canceled successfully" });
        }
        await this.friendShipRepo.create({ requestFrom: req.user._id, requestTo });
        return res.status(200).json({ success: true, message: "FriendShip request sent successfully" });
    };
    listFriendRequests = async (req, res) => {
        const { status } = req.body;
        const user = req.user._id;
        const filter = { status: status ? status : enum_1.STATUS.PENDING };
        if (filter.status == enum_1.STATUS.ACCEPTED)
            filter.$or = [{ requestTo: user }, { requestFrom: user }];
        else
            filter.requestTo = user;
        const requests = await this.friendShipRepo.findAll(filter, {}, { populate: [{ path: "requestTo", select: "firstName lastName fullName" }, { path: "requestFrom", select: "firstName lastName fullName" }] });
        return res.status(200).json({ success: true, requests });
    };
    responseToFriendRequest = async (req, res) => {
        const responseToFriendRequestDTO = req.body;
        const request = await this.friendShipRepo.findAndUpdate({ _id: responseToFriendRequestDTO.requestId, requestTo: req.user._id, status: enum_1.STATUS.PENDING }, { status: responseToFriendRequestDTO.response }, { new: true });
        return res.status(200).json({ success: true, request });
    };
    blockUser = async (req, res) => {
        const { id } = req.params;
        const user = await this.userRepo.exist({ _id: id });
        if (!user)
            throw new error_1.NotFoundException("User not found");
        await this.userRepo.update({ _id: req.user._id }, { blocks: id });
        return res.status(200).json({ success: true, message: "user blocked successfully " });
    };
}
exports.default = new UserService();
