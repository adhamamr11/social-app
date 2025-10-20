"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipModel = void 0;
const mongoose_1 = require("mongoose");
const frindship_schema_1 = require("./frindship.schema");
exports.FriendShipModel = (0, mongoose_1.model)("FriendShip", frindship_schema_1.friendShipSchema);
