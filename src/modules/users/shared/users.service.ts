import httpStatus from "http-status";
import ApiError from "../../../error/handleApiError";
import { IUser, ILoginUser, ILoginUserResponse } from "./users.interface";
import { User } from "./users.model";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import crypto from "crypto";
import { sendVerificationEmail } from "../../../utilities/nodmailer";
const createUser = async (user: IUser): Promise<IUser | null> => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 3600000);
  const createUser = await User.create({
    ...user,
    emailVerificationToken: verificationToken,
    emailVerificationTokenExpires: verificationTokenExpires,
  });

  const { email: userEmail } = createUser;

  sendVerificationEmail(userEmail, verificationToken).catch((error) => {
    throw new ApiError(400, error);
  });
  return {
    ...createUser.toObject(),
  };
};

const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn,t Exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  if (isUserExist.password && !isUserExist.emailVerified) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "   First Verify Your Email.Then Try To Login"
    );
  }
  const { _id, email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { _id } = verifiedToken;

  const isUserExist = await User.findOne({ _id }, { _id: 1, role: 1 });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
      userEmail: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const deleteUser = await User.findByIdAndDelete(id);
  return deleteUser;
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const verifilyEmail = async (token: string) => {
  const user = await User.findOneAndUpdate(
    {
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: Date.now() },
    },
    {
      emailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationTokenExpires: undefined,
    },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, "Token Expired.Please Resend Email Again");
  }
  return user;
};

const resendVerifyEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User Not Found");
  }
  if (user.emailVerified) {
    throw new ApiError(400, "Email Already Verified");
  }
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 3600000);
  user.emailVerificationToken = verificationToken;
  user.emailVerificationTokenExpires = verificationTokenExpires;
  await user.save();
  await sendVerificationEmail(email, verificationToken);
  return user;
};
export const UserService = {
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
