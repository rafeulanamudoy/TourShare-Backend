"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const users_service_1 = require("../shared/users.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = require("../../../utilities/cloudinary");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    let profileImage = { url: "", public_id: "" };
    if (req.file) {
        const cloudinaryResponse = await (0, cloudinary_1.cloudinaryUploads)(req.file.path, "profileImage");
        profileImage = {
            url: cloudinaryResponse.url,
            public_id: cloudinaryResponse.public_id,
        };
        console.log(cloudinaryResponse, "cloudenray response");
    }
    const user = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        profileImage,
    };
    const result = await users_service_1.UserService.createUser(user);
    if (result !== null) {
        const { password } = result, others = __rest(result, ["password"]);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Super Admin  Account created successfully",
            data: others,
        });
    }
});
exports.SuperAdminController = {
    createUser,
};
