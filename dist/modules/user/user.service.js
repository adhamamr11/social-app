"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = require("../../DB/models/user/user.repo");
const factory_1 = require("./factory");
class UserService {
    userRepo = new user_repo_1.UserRepo();
    userFactory = new factory_1.UserFactory();
    updateInfo = async (req, res) => {
        const updateInfoDTO = req.body;
        const result = this.userFactory.updateInfo(updateInfoDTO, req.user);
        await this.userRepo.findAndUpdate({ _id: req.user._id }, { firstName: result.firstName, lastName: result.lastName, phoneNumber: result.phoneNumber });
        return res.sendStatus(204);
    };
}
exports.default = new UserService();
