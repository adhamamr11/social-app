"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
const email_1 = require("../../../utils/email");
exports.userschema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    lastName: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: function () {
            if (this.userAgent == enum_1.USER_AGENT.LOCAL) {
                return true;
            }
            return false;
        } },
    phoneNumber: { type: String },
    gender: { type: Number, enum: enum_1.GENDER, default: enum_1.GENDER.MALE },
    role: { type: Number, enum: enum_1.ROLE, default: enum_1.ROLE.USER },
    userAgent: { type: Number, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.LOCAL },
    otp: { type: String },
    otpExpiryAt: { type: Date },
    credentialUpdatedAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    twoStepVrification: { type: Boolean, default: false },
    blocks: [{ type: mongoose_1.Schema.ObjectId, ref: "User" }],
    friends: [{ type: mongoose_1.Schema.ObjectId, ref: "User" }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.userschema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
exports.userschema.virtual("fullName").set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
});
exports.userschema.pre("save", async function () {
    if (this.userAgent != enum_1.USER_AGENT.GOOGLE && this["isNew"] == true)
        await (0, email_1.sendMail)({ to: this.email, subject: "Confirm Email", html: `<h1>your otp is ${this.otp}</h1>` });
});
