"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTION = exports.USER_AGENT = exports.ROLE = exports.GENDER = void 0;
var GENDER;
(function (GENDER) {
    GENDER[GENDER["MALE"] = 0] = "MALE";
    GENDER[GENDER["FEMALE"] = 1] = "FEMALE";
})(GENDER || (exports.GENDER = GENDER = {}));
var ROLE;
(function (ROLE) {
    ROLE[ROLE["USER"] = 0] = "USER";
    ROLE[ROLE["ADMIN"] = 1] = "ADMIN";
    ROLE[ROLE["SUPER_ADMIN"] = 2] = "SUPER_ADMIN";
})(ROLE || (exports.ROLE = ROLE = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT[USER_AGENT["LOCAL"] = 0] = "LOCAL";
    USER_AGENT[USER_AGENT["GOOGLE"] = 1] = "GOOGLE";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var REACTION;
(function (REACTION) {
    REACTION[REACTION["like"] = 0] = "like";
    REACTION[REACTION["love"] = 1] = "love";
    REACTION[REACTION["care"] = 2] = "care";
    REACTION[REACTION["haha"] = 3] = "haha";
    REACTION[REACTION["sad"] = 4] = "sad";
    REACTION[REACTION["angry"] = 5] = "angry";
})(REACTION || (exports.REACTION = REACTION = {}));
