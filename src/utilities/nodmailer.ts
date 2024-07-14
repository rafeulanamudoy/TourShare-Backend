import config from "../config";
import nodemailer from "nodemailer";
import ApiError from "../error/handleApiError";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,

  auth: {
    user: config.nodemailer.email_user,
    pass: config.nodemailer.email_password,
  },
});

export const sendVerificationEmail = (email: string, token: string) => {
  try {
    const verificationUrl = `${config.front_end_url}/verify-email?token=${token}`;

    const mailOptions = {
      from: `TourShare <${config.nodemailer.email_user}>`,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(400, error as string);
  }
};
