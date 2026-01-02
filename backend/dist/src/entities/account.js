"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    type: { type: String, default: null },
    user: { type: 'ObjectId', ref: 'User', default: null },
    code: { type: String, default: null },
    description: { type: String, default: null },
    category: { type: String, default: null },
    value: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    date: { type: Date || String, default: Date.now },
});
exports.AccountModel = mongoose_1.default.model('Account', accountSchema);
