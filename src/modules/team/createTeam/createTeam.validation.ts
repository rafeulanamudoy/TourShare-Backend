import { z } from "zod";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";
import { ENUM_TRANSPORTATION } from "../../../enums/createTeamStatus";

const createTeamSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("This is not a valid email"),

    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .regex(/^\+880\d{10}$/, {
        message:
          "Phone number must start with +880 and be followed by exactly 10 digits",
      }),

    teamName: z.string({
      required_error: "Team name is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    destination: z.string({
      required_error: "Destination is required",
    }),
    currentMembers: z.number({
      required_error: "Current members are required",
    }),
    neededMembers: z.number({
      required_error: "Needed members are required",
    }),
    nationalIdNumber: z.string({
      required_error: "National ID number is required",
    }),

    startDate: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z.date({
        required_error: "Start date is required",
      })
    ),
    endDate: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z.date({
        required_error: "End date is required",
      })
    ),
    budget: z.number({
      required_error: "Budget is required",
    }),
    teamStatus: z
      .string()
      .default(ENUM_TEAM_STATUS.ONGOING)
      .refine(
        (value) =>
          Object.values(Object.values(ENUM_TEAM_STATUS) as string[]).includes(
            value
          ),
        {
          message: "Invalid status type",
        }
      ),
    teamDetails: z
      .object({
        description: z.string().default(""),
        meetingPoint: z.string().default(""),
        meetingDate: z.preprocess(
          (arg) =>
            typeof arg === "string" || arg instanceof Date
              ? new Date(arg)
              : arg,
          z.date({
            required_error: "Meeting date is required",
          })
        ),
        meetingTime: z.string({
          required_error: "Meeting time is required",
        }),

        accommodations: z.string().default(""),
        transportation: z
          .string()
          .refine(
            (value) =>
              Object.values(
                Object.values(ENUM_TRANSPORTATION) as string[]
              ).includes(value),
            {
              message: "Invalid transportation type",
            }
          ),
        activities: z
          .array(
            z.object({
              activity: z.string().default(""),
            })
          )
          .optional(),
        costBreakdown: z.string().default(""),
        responsibilities: z
          .array(
            z.object({
              responsibility: z.string().default(""),
            })
          )
          .optional(),
      })
      .optional(),
  }),
});

const acceptTeamSchema = z.object({
  body: z.object({
    members: z.number({
      required_error: "members is Required",
    }),

    joinTeamId: z.string({
      required_error: "joinTeamId is Required",
    }),
    status: z
      .string({
        required_error: "status is Required",
      })
      .refine(
        (value) => {
          return (Object.values(ENUM_jOIN_TEAM_STATUS) as string[]).includes(
            value
          );
        },
        { message: "Invalid Status" }
      ),
  }),
});

export const CreateTeamValidation = {
  createTeamSchema,
  acceptTeamSchema,
};
