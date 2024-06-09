"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamValidation = void 0;
const zod_1 = require("zod");
const joinTeamStatus_1 = require("../../../enums/joinTeamStatus");
const createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is Required",
        })
            .email("This is not a valid email"),
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone number is Required",
        })
            .regex(/^\+880\d{10}$/, {
            message: "Phone number must start with +880 and be followed by exactly 10 digits",
        }),
        address: zod_1.z.string({
            required_error: "Address is Required",
        }),
        destination: zod_1.z.string({
            required_error: "Destination is Required",
        }),
        currentMembers: zod_1.z.number({
            required_error: "Current members are Required",
        }),
        neededMembers: zod_1.z.number({
            required_error: "Needed members are Required",
        }),
        nationalIdNumber: zod_1.z.string({
            required_error: "National ID number is Required",
        }),
        startDate: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
            required_error: "Start date is Required",
        })),
        endDate: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
            required_error: "End date is Required",
        })),
    }),
});
const acceptTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        members: zod_1.z.number({
            required_error: "members is Required",
        }),
        joinTeamId: zod_1.z.string({
            required_error: "joinTeamId is Required",
        }),
        status: zod_1.z
            .string({
            required_error: "status is Required",
        })
            .refine((value) => {
            return Object.values(joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS).includes(value);
        }, { message: "Invalid Status" }),
    }),
});
exports.CreateTeamValidation = {
    createTeamSchema,
    acceptTeamSchema,
};
