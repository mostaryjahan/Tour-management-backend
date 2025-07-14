import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, {
      message: "Name is too short. Minimum charactere should be 2",
    })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter, 1 digit, and 1 special character",
    }),
  phone: z.string().regex(/^(?:\+8801|01)[0-9]{9}$/, {
    message:
      "Invalid Bangladeshi phone number. Format: +8801XXXXXXXXXX or 01XXXXXXXXX",
  }).optional(),
  address: z
    .string({ invalid_type_error: "Address Must Be String" })
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional(),
});

// update zod schema
export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, {
      message: "Name is too short. Minimum charactere should be 2",
    })
    .max(50)
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter, 1 digit, and 1 special character",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+8801|01)[0-9]{9}$/, {
      message:
        "Invalid Bangladeshi phone number. Format: +8801XXXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  role: z.enum(Object.keys(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address Must Be String" })
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional(),
});
