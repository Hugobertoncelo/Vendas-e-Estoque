"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    client: { type: 'ObjectId', ref: 'Client', default: null },
    products: [
        {
            _id: { type: String, default: null },
            name: { type: String, default: null },
            value: { type: Number, default: null },
            amount: { type: Number, default: null },
        },
    ],
    paymentType: { type: String, default: null },
    totalValue: { type: Number, default: null },
    date: { type: Date || String, default: Date.now },
    status: { type: String, default: null },
    user: { type: 'ObjectId', ref: 'User', default: null },
    code: { type: String, default: null },
});
exports.SaleModel = mongoose_1.default.model('Sale', saleSchema);
