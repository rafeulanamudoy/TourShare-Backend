"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFunction = exports.setUserfunction = void 0;
const cloudinary_1 = require("./cloudinary");
const users_model_1 = require("../modules/users/shared/users.model");
const setUserfunction = async (req) => {
    if (req.file) {
        const cloudinaryResponse = await (0, cloudinary_1.cloudinaryUploads)(req.file.path, "profileImage");
        return Object.assign(Object.assign({}, req.body), { profileImage: {
                url: cloudinaryResponse.url,
                public_id: cloudinaryResponse.public_id,
            } });
    }
};
exports.setUserfunction = setUserfunction;
const updateUserFunction = async (req, id) => {
    var _a;
    let profileImage = { url: "", public_id: "" };
    if (req.file) {
        const user = await users_model_1.User.findById(id);
        if (user === null || user === void 0 ? void 0 : user.profileImage.public_id) {
            // Start both deletion and upload operations concurrently
            const deletePromise = (0, cloudinary_1.cloudinaryDelete)((_a = user === null || user === void 0 ? void 0 : user.profileImage) === null || _a === void 0 ? void 0 : _a.public_id);
            const uploadPromise = (0, cloudinary_1.cloudinaryUploads)(req.file.path, "profileImage");
            // Wait for both deletion and upload operations to complete
            const [deleteResponse, cloudinaryResponse] = await Promise.all([
                deletePromise,
                uploadPromise,
            ]);
            profileImage = {
                url: cloudinaryResponse.url,
                public_id: cloudinaryResponse.public_id,
            };
        }
    }
    const updatedUser = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        profileImage: req.file && profileImage,
    };
    return updatedUser;
    // Construct the updated user object with the provided data and the new profileImage
};
exports.updateUserFunction = updateUserFunction;
