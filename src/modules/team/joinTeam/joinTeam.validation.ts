import { z } from "zod";

const joinTeamSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("This is not a valid email"),

    phoneNumber: z.string({
      required_error: "Phone number is Required",
    }),

    address: z.string({
      required_error: "Address is Required",
    }),

    groupMember: z.number({
      required_error: "groupMembers are Required",
    }),
    nationalIdNumber: z.string({
      required_error: "National ID number is Required",
    }),
    teamInfo: z.string({
      required_error: "teamInfo is Required",
    }),
  }),
});

export const JoinTeamValidation = {
  joinTeamSchema,
};