"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGraphQl = isValidGraphQl;
const error_1 = require("../utils/error");
function isValidGraphQl(schema, args) {
    const result = schema.safeParse(args);
    if (!result.success) {
        let errMessages = result.error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message
        }));
        throw new error_1.BadRequestException(JSON.stringify(errMessages));
    }
}
