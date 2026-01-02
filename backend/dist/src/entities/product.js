"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    code: { type: String, default: null },
    name: { type: String, default: null },
    value: { type: Number, default: null },
    stock: { type: Number, default: null },
    user: { type: 'ObjectId', ref: 'User', default: null },
    isDefault: { type: Boolean, default: false },
});
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
