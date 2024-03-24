import httpStatus from "http-status";
import ApiError from "../../../error/handleApiError";
import {
  IUser,
  ILoginUser,
  ILoginUserResponse,
  IUserSignUpResponse,
} from "./users.interface";
import { User } from "./users.model";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createUser = async (user: IUser): Promise<IUserSignUpResponse | null> => {
  // console.log(user);

  const createUser = await User.create(user);
  const { _id, email: userEmail, role } = createUser;
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

  //console.log(createUser, 'im to check from service is user created')
  return {
    ...createUser.toObject(),
    accessToken,
    refreshToken,
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
  const { _id, email: userEmail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, userEmail },
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
  console.log("verified token from service", verifiedToken);
  const { _id } = verifiedToken;

  const isUserExist = await User.findOne({ _id }, { _id: 1, role: 1 });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
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

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  updateSingleUser,
  deleteSingleUser,
};
