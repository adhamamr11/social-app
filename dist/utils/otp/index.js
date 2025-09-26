"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpiryTime = exports.generateOTP = void 0;
const generateOTP = () => {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
};
exports.generateOTP = generateOTP;
const generateExpiryTime = (time) => {
    return new Date(Date.now() + time * 60 * 1000);
};
exports.generateExpiryTime = generateExpiryTime;
