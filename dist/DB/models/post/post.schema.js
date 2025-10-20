"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const react_schema_1 = require("../common/react.schema");
const comment_model_1 = require("../comment/comment.model");
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    reactions: [react_schema_1.reactionSchema],
    mentions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    deletedAt: { type: Date }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    foreignField: "postId",
    localField: "_id",
    ref: "Comment",
});
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = this.getFilter();
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
exports.postSchema.pre("deleteMany", async function (next) {
    const filter = this.getFilter();
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
