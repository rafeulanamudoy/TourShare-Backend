"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const handleApiError_1 = __importDefault(require("../error/handleApiError"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: config_1.default.nodemailer.email_user,
        pass: config_1.default.nodemailer.email_password,
    },
});
const sendVerificationEmail = (email, token) => {
    try {
        const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;
        const mailOptions = {
            from: `TourShare <${config_1.default.nodemailer.email_user}>`,
            to: email,
            subject: "Email Verification",
            text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        };
        return transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new handleApiError_1.default(400, error);
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
