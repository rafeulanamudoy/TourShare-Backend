"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamValidation = void 0;
const zod_1 = require("zod");
const joinTeamStatus_1 = require("../../../enums/joinTeamStatus");
const teamStatus_1 = require("../../../enums/teamStatus");
const createTeamStatus_1 = require("../../../enums/createTeamStatus");
const createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("This is not a valid email"),
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .regex(/^\+880\d{10}$/, {
            message: "Phone number must start with +880 and be followed by exactly 10 digits",
        }),
        teamName: zod_1.z.string({
            required_error: "Team name is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        destination: zod_1.z.string({
            required_error: "Destination is required",
        }),
        currentMembers: zod_1.z.number({
            required_error: "Current members are required",
        }),
        neededMembers: zod_1.z.number({
            required_error: "Needed members are required",
        }),
        nationalIdNumber: zod_1.z.string({
            required_error: "National ID number is required",
        }),
        startDate: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
            required_error: "Start date is required",
        })),
        endDate: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
            required_error: "End date is required",
        })),
        budget: zod_1.z.number({
            required_error: "Budget is required",
        }),
        teamStatus: zod_1.z
            .string()
            .default(teamStatus_1.ENUM_TEAM_STATUS.ONGOING)
            .refine((value) => Object.values(Object.values(teamStatus_1.ENUM_TEAM_STATUS)).includes(value), {
            message: "Invalid status type",
        }),
        teamDetails: zod_1.z
            .object({
            description: zod_1.z.string({
                required_error: "description is required",
            }),
            depurtureTime: zod_1.z.string({
                required_error: "depurtureTime is required",
            }),
            returnTime: zod_1.z.string({
                required_error: "returnTime is required",
            }),
            depurture: zod_1.z.string({
                required_error: "depurture is required",
            }),
            accommodations: zod_1.z.string({
                required_error: "accommodations is required",
            }),
            transportation: zod_1.z
                .string()
                .refine((value) => Object.values(Object.values(createTeamStatus_1.ENUM_TRANSPORTATION)).includes(value), {
                message: "Invalid transportation type",
            }),
            activities: zod_1.z
                .array(zod_1.z.object({
                activity: zod_1.z.string().default(""),
            }))
                .optional(),
            costBreakDown: zod_1.z.string({
                required_error: "Cost Break Down is required",
            }),
            responsibilities: zod_1.z
                .array(zod_1.z.object({
                responsibility: zod_1.z.string().default(""),
            }))
                .optional(),
        })
            .optional(),
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
