"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const users_const_1 = require("./users.const");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    role: {
        type: String,
        enum: users_const_1.UserRole,
    },
    phoneNumber: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    profileImage: {
        url: {
            type: String,
            requird: true,
        },
        public_id: {
            type: String,
            requird: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
userSchema.statics.isUserExist = async function (email) {
    return await exports.User.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    const isPasswordMatched = await bcrypt_1.default.compare(givenPassword, savedPassword);
    //console.log(isPasswordMatched, "if password matched");
    return await bcrypt_1.default.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
    this.password = await bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
