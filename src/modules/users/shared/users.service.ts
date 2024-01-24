import httpStatus from "http-status";
import ApiError from "../../../error/handleApiError";
import { IUser, ILoginUser, ILoginUserResponse } from "./users.interface";
import { User } from "./users.model";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createUser = async (user: IUser): Promise<IUser | null> => {
  // console.log(user)

  const createUser = (await User.create(user)).toObject();
  //console.log(createUser, 'im to check from service is user created')
  return createUser;
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
    email: userEmail,
  };
};
export const UserService = {
  createUser,
  loginUser,
};
