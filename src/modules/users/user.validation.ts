import { z } from "zod";

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
  }),
  phoneNumber: z.string({
    required_error: "phoneNumber is Required",
  }),
  profileImage: z
    .string({
      required_error: "profileImage is Required",
    })
    .url({ message: "profileImage must be a valid URL" }),
  password: z.string({
    required_error: "Password is Required",
  }),
});

export const AuthValidation = {
  signUpZodSchema,
};
