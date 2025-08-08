"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    var _a;
    const matchedArray = (_a = err.message) === null || _a === void 0 ? void 0 : _a.match(/"([^"]*)"/);
    const field = (matchedArray === null || matchedArray === void 0 ? void 0 : matchedArray[1]) || "Field";
    return {
        statusCode: 400,
        message: `${field} already exists`,
    };
};
exports.handleDuplicateError = handleDuplicateError;
