"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = isValid;
const error_1 = require("../utils/error");
function isValid(schema) {
    return (req, res, next) => {
        let data = { ...req.body, ...req.query, ...req.params };
        const result = schema.safeParse(data);
        if (!result.success) {
            let errMessages = result.error.issues.map((issue) => ({
                path: issue.path,
                message: issue.message
            }));
            throw new error_1.BadRequestException(result.error.message, errMessages);
        }
        next();
    };
}
