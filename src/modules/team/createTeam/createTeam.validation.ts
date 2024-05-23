import { z } from "zod";

const createTeamSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("This is not a valid email"),

    phoneNumber: z
      .string({
        required_error: "Phone number is Required",
      })
      .regex(/^\+880\d{10}$/, {
        message:
          "Phone number must start with +880 and be followed by exactly 10 digits",
      }),

    address: z.string({
      required_error: "Address is Required",
    }),
    destination: z.string({
      required_error: "Destination is Required",
    }),
    currentMembers: z.number({
      required_error: "Current members are Required",
    }),
    neededMembers: z.number({
      required_error: "Needed members are Required",
    }),
    nationalIdNumber: z.string({
      required_error: "National ID number is Required",
    }),
    startDate: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z.date({
        required_error: "Start date is Required",
      })
    ),
    endDate: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z.date({
        required_error: "End date is Required",
      })
    ),
  }),
});

export const CreateTeamValidation = {
  createTeamSchema,
};
