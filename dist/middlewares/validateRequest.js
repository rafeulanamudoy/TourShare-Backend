"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => async (req, res, next) => {
    try {
        if (req.file) {
            req.body.profileImage = req.file.path;
        }
        if (typeof req.body.name === "string") {
            req.body.name = JSON.parse(req.body.name);
        }
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateRequest;
