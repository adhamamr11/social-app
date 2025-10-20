"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const friendship_model_1 = require("./friendship.model");
class FriendShipRepo extends abstract_repo_1.AbstractRepo {
    constructor() {
        super(friendship_model_1.FriendShipModel);
    }
}
exports.FriendShipRepo = FriendShipRepo;
