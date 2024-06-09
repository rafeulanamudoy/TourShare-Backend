"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last  Name is Required",
            }),
        }),
        email: zod_1.z
            .string({
            required_error: "Email is Required",
        })
            .email("this is not a valid email"),
        role: zod_1.z
            .string({
            required_error: "Role is Required",
        })
            .refine((value) => {
            return Object.values(user_1.ENUM_USER_ROLE).includes(value);
        }, { message: "Invalid role" }),
        phoneNumber: zod_1.z
            .string({
            required_error: "phoneNumber is Required",
        })
            .regex(/^\+880\d{10}$/, {
            message: "Phone number must start with +880 and be followed by exactly 10 digits",
        }),
        profileImage: zod_1.z
            .string({
        // required_error: "profileImage is Required",
        })
            .refine((value) => {
            return value.startsWith("uploads");
        }, { message: "profileImage must be a valid file path" })
            .optional(),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
        secret_key: zod_1.z.string({}).optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email("this is not a valid email"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const updateProfile = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last  Name is Required",
            }),
        }),
        profileImage: zod_1.z
            .string({
            required_error: "profileImage is Required",
        })
            .refine((value) => {
            // Add your custom logic to check if the value is a valid file path
            // For example, you can check if it starts with "uploads" or use other criteria
            return value.startsWith("uploads");
        }, { message: "profileImage must be a valid file path" }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
        secret_key: zod_1.z.string({}).optional(),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    loginZodSchema,
    updateProfile,
};
