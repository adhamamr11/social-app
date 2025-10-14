"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const entity_1 = require("../entity");
class UserFactory {
    updateInfo(updateInfoDTO, user) {
        const entity = new entity_1.UserEntity();
        entity.firstName = updateInfoDTO.firstName ?? user.firstName,
            entity.lastName = updateInfoDTO.lastName ?? user.lastName,
            entity.phoneNumber = updateInfoDTO.phoneNumber ?? user.phoneNumber;
        return entity;
    }
}
exports.UserFactory = UserFactory;
