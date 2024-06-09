"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const options = {
    autoIndex: true, //this is the code I added that solved it all
};
async function boostrap() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url, options);
        console.log(`database connect successfully`);
        app_1.default.listen(config_1.default.port, () => {
            console.log(` app listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(`fail to connect the error is:${error}`);
    }
}
boostrap();
