"use strict";
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const users_service_1 = require("./users.service");
const cloudenrayUpload_1 = require("../../../utilities/cloudenrayUpload");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
  const userBody = await (0, cloudenrayUpload_1.setUserfunction)(req);
  // Check if userBody is undefined
  if (userBody === undefined) {
    // Handle the case where setUserfunction returns undefined
    (0, sendResponse_1.default)(res, {
      success: false,
      statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
      message: "Error creating user: user data is undefined",
      data: null,
    });
    return;
  }
  const result = await users_service_1.UserService.createUser(userBody);
  const cookieOptions = {
    secure: config_1.default.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  if (result !== null) {
    const { password, refreshToken } = result,
      others = __rest(result, ["password", "refreshToken"]);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: `${others.role} Account created successfully`,
      data: others,
    });
  }
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
  const loginData = __rest(req.body, []);

  const result = await users_service_1.UserService.loginUser(loginData);
  const cookieOptions = {
    secure: config_1.default.env === "development",
    httpOnly: true,
  };
  if (result !== null) {
    const { refreshToken } = result,
      others = __rest(result, ["refreshToken"]);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User logged in successfully!",
      data: others,
    });
  }
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await users_service_1.UserService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config_1.default.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  (0, sendResponse_1.default)(res, {
    success: true,
    statusCode: http_status_1.default.OK,
    message: "New access token generated successfully !",
    data: result,
  });
});
const updateSingleUser = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const updateData = await (0, cloudenrayUpload_1.updateUserFunction)(req, id);

  const result = await users_service_1.UserService.updateSingleUser(
    id,
    updateData
  );
  (0, sendResponse_1.default)(res, {
    success: true,
    statusCode: http_status_1.default.OK,
    message: "User updated successfully",
    data: result,
  });
});
const deleteSingleUser = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result = await users_service_1.UserService.deleteSingleUser(id);
  (0, sendResponse_1.default)(res, {
    success: true,
    statusCode: http_status_1.default.OK,
    message: "User deleted  successfully",
    data: result,
  });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
  const id = req.params.id;
  const result = await users_service_1.UserService.getSingleUser(id);
  (0, sendResponse_1.default)(res, {
    success: true,
    statusCode: http_status_1.default.OK,
    message: "User get  successfully",
    data: result,
  });
});
exports.UserController = {
  createUser,
  loginUser,
  refreshToken,
  updateSingleUser,
  deleteSingleUser,
  getSingleUser,
};
