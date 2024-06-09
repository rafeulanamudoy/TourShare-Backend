"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTeamValidation = void 0;
const zod_1 = require("zod");
const createJoinTeamSchema = zod_1.z.object({
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
        groupMember: zod_1.z.number({
            required_error: "groupMembers are Required",
        }),
        nationalIdNumber: zod_1.z.string({
            required_error: "National ID number is Required",
        }),
        teamInfo: zod_1.z.string({
            required_error: "teamInfo is Required",
        }),
    }),
});
exports.JoinTeamValidation = {
    createJoinTeamSchema,
};
