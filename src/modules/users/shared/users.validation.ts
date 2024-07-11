import { z } from "zod";
import { ENUM_USER_ROLE } from "../../../enums/user";

const signUpZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is Required",
      }),
      lastName: z.string({
        required_error: "Last  Name is Required",
      }),
    }),
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("this is not a valid email"),

    role: z
      .string({
        required_error: "Role is Required",
      })
      .refine(
        (value) => {
          return (Object.values(ENUM_USER_ROLE) as string[]).includes(value);
        },
        { message: "Invalid role" }
      ),
    phoneNumber: z
      .string({
        required_error: "phoneNumber is Required",
      })
      .regex(/^\+880\d{10}$/, {
        message:
          "Phone number must start with +880 and be followed by exactly 10 digits",
      }),
    profileImage: z
      .string({
        required_error: "profileImage is Required",
      })
      .refine(
        (value) => {
          return value.startsWith("uploads");
        },
        { message: "profileImage must be a valid file path" }
      )
      .optional(),
    password: z.string({
      required_error: "Password is Required",
    }),
    secret_key: z.string({}).optional(),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("this is not a valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
const updateProfile = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is Required",
      }),
      lastName: z.string({
        required_error: "Last  Name is Required",
      }),
    }),

    profileImage: z
      .string({
        required_error: "profileImage is Required",
      })
      .refine(
        (value) => {
          return value.startsWith("uploads");
        },
        { message: "profileImage must be a valid file path" }
      ),
    password: z.string({
      required_error: "Password is Required",
    }),
    secret_key: z.string({}).optional(),
  }),
});

export const AuthValidation = {
  signUpZodSchema,
  loginZodSchema,
  updateProfile,
};
