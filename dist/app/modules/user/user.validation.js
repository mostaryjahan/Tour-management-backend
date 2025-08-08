"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(2, {
        message: "Name is too short. Minimum charactere should be 2",
    })
        .max(50),
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must include at least 1 uppercase letter, 1 digit, and 1 special character",
    }),
    phone: zod_1.default.string().regex(/^(?:\+8801|01)[0-9]{9}$/, {
        message: "Invalid Bangladeshi phone number. Format: +8801XXXXXXXXXX or 01XXXXXXXXX",
    }).optional(),
    address: zod_1.default
        .string({ invalid_type_error: "Address Must Be String" })
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
});
// update zod schema
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(2, {
        message: "Name is too short. Minimum charactere should be 2",
    })
        .max(50)
        .optional(),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801|01)[0-9]{9}$/, {
        message: "Invalid Bangladeshi phone number. Format: +8801XXXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    role: zod_1.default.enum(Object.keys(user_interface_1.Role)).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.IsActive)).optional(),
    isDeleted: zod_1.default
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),
    isVerified: zod_1.default
        .boolean({ invalid_type_error: "isVerified must be true or false" })
        .optional(),
    address: zod_1.default
        .string({ invalid_type_error: "Address Must Be String" })
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
});
