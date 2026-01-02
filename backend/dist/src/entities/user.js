"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    code: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
