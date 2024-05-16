import { z } from "zod";

const createTeamSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("this is not a valid email"),

    phoneNumber: z.string({
      required_error: "phoneNumber is Required",
    }),

    address: z.string({
      required_error: "address is Required",
    }),
    destination: z.string({
      required_error: "destination is Required",
    }),
    currentMembers: z.number({
      required_error: "currentMembers is Required",
    }),
    neededMembers: z.number({
      required_error: "neededMembers is Required",
    }),
    nationalIdNumber: z.string({
      required_error: "phoneNumber is Required",
    }),
    startDate: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date)
          return new Date(arg);
      },
      z.date({
        required_error: "StartDate is Required",
      })
    ),
    endDate: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date)
          return new Date(arg);
      },
      z.date({
        required_error: "EndDate is Required",
      })
    ),
  }),
});

export const CreateTeamValidation = {
  createTeamSchema,
};
