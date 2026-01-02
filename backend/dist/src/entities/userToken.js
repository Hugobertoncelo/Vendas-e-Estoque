"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserTokenSchema = new mongoose_1.default.Schema({
    user: { type: 'ObjectId', ref: 'User', default: null },
    refreshToken: { type: String, default: null },
    expiresDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
});
exports.UserTokenModel = mongoose_1.default.model('UserToken', UserTokenSchema);
