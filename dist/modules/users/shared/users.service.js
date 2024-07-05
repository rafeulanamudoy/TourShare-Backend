"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(
  require("../../../error/handleApiError")
);
const users_model_1 = require("./users.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = async (user) => {
  const createUser = await users_model_1.User.create(user);
  const { _id, email: userEmail, role } = createUser;
  const accessToken = jwtHelpers_1.jwtHelpers.createToken(
    { _id, userEmail, role },
    config_1.default.jwt.secret,
    config_1.default.jwt.expires_in
  );
  const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
    { _id, userEmail, role },
    config_1.default.jwt.refresh_secret,
    config_1.default.jwt.refresh_expires_in
  );

  return Object.assign(Object.assign({}, createUser.toObject()), {
    accessToken,
    refreshToken,
  });
};
const loginUser = async (payload) => {
  const { email, password } = payload;
  const isUserExist = await users_model_1.User.isUserExist(email);

  if (!isUserExist) {
    throw new handleApiError_1.default(
      http_status_1.default.NOT_FOUND,
      "User Doesn,t Exist"
    );
  }
  if (
    isUserExist.password &&
    !(await users_model_1.User.isPasswordMatched(
      password,
      isUserExist.password
    ))
  ) {
    throw new handleApiError_1.default(
      http_status_1.default.UNAUTHORIZED,
      "Password is incorrect"
    );
  }
  const { _id, email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers_1.jwtHelpers.createToken(
    { _id, userEmail, role },
    config_1.default.jwt.secret,
    config_1.default.jwt.expires_in
  );
  const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
    { _id, userEmail, role },
    config_1.default.jwt.refresh_secret,
    config_1.default.jwt.refresh_expires_in
  );
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
      token,
      config_1.default.jwt.refresh_secret
    );
  } catch (err) {
    throw new handleApiError_1.default(
      http_status_1.default.FORBIDDEN,
      "Invalid Refresh Token"
    );
  }

  const { _id } = verifiedToken;
  const isUserExist = await users_model_1.User.findOne(
    { _id },
    { _id: 1, role: 1 }
  );
  if (!isUserExist) {
    throw new handleApiError_1.default(
      http_status_1.default.NOT_FOUND,
      "User does not exist"
    );
  }
  const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
      userEmail: isUserExist.email,
    },
    config_1.default.jwt.secret,
    config_1.default.jwt.expires_in
  );
  return {
    accessToken: newAccessToken,
  };
};
const updateSingleUser = async (id, payload) => {
  const result = await users_model_1.User.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
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
exports.UserService = {
  createUser,
  loginUser,
  refreshToken,
  updateSingleUser,
  deleteSingleUser,
  getSingleUser,
};
