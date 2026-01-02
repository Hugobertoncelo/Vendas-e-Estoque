"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const supplierSchema = new mongoose_1.default.Schema({
    code: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    cnpj: { type: String, default: null },
    phone: { type: String, default: null },
    user: { type: 'ObjectId', ref: 'User', default: null },
});
exports.SupplierModel = mongoose_1.default.model('Supplier', supplierSchema);
