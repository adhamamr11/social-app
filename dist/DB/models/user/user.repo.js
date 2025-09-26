"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const user_model_1 = require("./user.model");
class UserRepo extends abstract_repo_1.AbstractRepo {
    constructor() {
        super(user_model_1.User);
    }
}
exports.UserRepo = UserRepo;
