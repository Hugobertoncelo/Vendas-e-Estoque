"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    code: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    cpf: { type: String, default: null },
    phone: { type: String, default: null },
    user: { type: 'ObjectId', ref: 'User', default: null },
});
exports.ClientModel = mongoose_1.default.model('Client', clientSchema);
