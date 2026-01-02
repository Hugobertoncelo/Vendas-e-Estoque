"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepository = void 0;
const sale_1 = require("../../entities/sale");
class SalesRepository {
    constructor() {
        this.model = sale_1.SaleModel;
    }
    async list({ startDate, endDate, userId, status, }) {
        return await this.model
            .find({
            date: { $gte: startDate, $lt: endDate },
            user: userId,
            ...(status ? { status } : {}),
        })
            .populate([{ path: 'client', select: '_id name' }])
            .sort({ date: -1 })
            .lean();
    }
    async create({ clientId, products, paymentType, totalValue, userId, code, }) {
        const newSale = await this.model.create({
            client: clientId,
            products,
            paymentType,
            totalValue,
            user: userId,
            code,
        });
        await newSale.save();
        return newSale;
    }
    async update({ filters, updateFields }) {
        await this.model.updateOne(filters, updateFields);
    }
    async findById(saleId) {
        return await this.model.findOne({ _id: saleId }).lean();
    }
    async getEntries(userId) {
        return await this.model.countDocuments({ user: userId }).lean();
    }
}
exports.SalesRepository = SalesRepository;
