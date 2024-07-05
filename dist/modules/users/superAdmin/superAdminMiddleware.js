"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(
  require("../../../error/handleApiError")
);
const user_1 = require("../../../enums/user");
const config_1 = __importDefault(require("../../../config"));
const superAdminCredential = () => async (req, res, next) => {
  try {
    const credential = req.body;

    if (!credential || !credential.role || !credential.secret_key) {
      throw new handleApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        "Invalid request. Please provide both 'role' and 'secret_key'."
      );
    }
    if (credential.role !== user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
      throw new handleApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        "You Are Not Allowed to Create a Super Admin Account. Role must be SUPER_ADMIN."
      );
    }
    if (credential.secret_key !== config_1.default.super_admin_secret_key) {
      throw new handleApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        "You Are Not Allowed to Create a Super Admin Account. Provide Correct Secret key."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
exports.default = superAdminCredential;
