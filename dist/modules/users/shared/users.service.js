"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(require("../../../error/handleApiError"));
const users_model_1 = require("./users.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const crypto_1 = __importDefault(require("crypto"));
const nodmailer_1 = require("../../../utilities/nodmailer");
const createUser = async (user) => {
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 3600000);
    const createUser = await users_model_1.User.create(Object.assign(Object.assign({}, user), { emailVerificationToken: verificationToken, emailVerificationTokenExpires: verificationTokenExpires }));
    const { email: userEmail } = createUser;
    (0, nodmailer_1.sendVerificationEmail)(userEmail, verificationToken).catch((error) => {
        throw new handleApiError_1.default(400, error);
    });
    return Object.assign({}, createUser.toObject());
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const isUserExist = await users_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, "User Doesn,t Exist");
    }
    if (isUserExist.password &&
        !(await users_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    if (isUserExist.password && !isUserExist.emailVerified) {
        throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, "   First Verify Your Email.Then Try To Login");
    }
    const { _id, email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, userEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, userEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new handleApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { _id } = verifiedToken;
    const isUserExist = await users_model_1.User.findOne({ _id }, { _id: 1, role: 1 });
    if (!isUserExist) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        _id: isUserExist._id,
        role: isUserExist.role,
        userEmail: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
};
const updateSingleUser = async (id, payload) => {
    const result = await users_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteSingleUser = async (id) => {
    const deleteUser = await users_model_1.User.findByIdAndDelete(id);
    return deleteUser;
};
const getSingleUser = async (id) => {
    const user = await users_model_1.User.findById(id);
    return user;
};
const getAllUsers = async () => {
    const users = await users_model_1.User.find({});
    return users;
};
const verifilyEmail = async (token) => {
    const user = await users_model_1.User.findOneAndUpdate({
        emailVerificationToken: token,
        emailVerificationTokenExpires: { $gt: Date.now() },
    }, {
        emailVerified: true,
        emailVerificationToken: undefined,
        emailVerificationTokenExpires: undefined,
    }, { new: true });
    if (!user) {
        throw new handleApiError_1.default(400, "Token Expired.Please Resend Email Again");
    }
    return user;
};
const resendVerifyEmail = async (email) => {
    const user = await users_model_1.User.findOne({ email });
    if (!user) {
        throw new handleApiError_1.default(400, "User Not Found");
    }
    if (user.emailVerified) {
        throw new handleApiError_1.default(400, "Email Already Verified");
    }
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 3600000);
    user.emailVerificationToken = verificationToken;
    user.emailVerificationTokenExpires = verificationTokenExpires;
    await user.save();
    await (0, nodmailer_1.sendVerificationEmail)(email, verificationToken);
    return user;
};
exports.UserService = {
    createUser,
    loginUser,
    refreshToken,
    updateSingleUser,
    deleteSingleUser,
    getSingleUser,
    getAllUsers,
    verifilyEmail,
    resendVerifyEmail,
};
