"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = [];
    const errors = Object.values(err.errors);
    errors.forEach((errorObjects) => errorSources.push({
        path: errorObjects.path,
        message: errorObjects.message,
    }));
    return {
        statusCode: 400,
        message: "Validation error",
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
