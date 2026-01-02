"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersRepository = void 0;
const supplier_1 = require("../../entities/supplier");
class SuppliersRepository {
    constructor() {
        this.model = supplier_1.SupplierModel;
    }
    async create({ name, cnpj, phone, email, code, userId, }) {
        const newSupplier = await this.model.create({
            name,
            cnpj,
            email,
            code,
            phone,
            user: userId,
        });
        await newSupplier.save();
        return newSupplier;
    }
    async list({ userId }) {
        const suppliers = await this.model.find({ user: userId }).lean();
        return suppliers;
    }
    async getEntries(userId) {
        return await this.model.countDocuments({ user: userId }).lean();
    }
    async delete(supplierId) {
        await this.model.deleteOne({ _id: supplierId });
    }
    async findByCnpj(cnpj) {
        const supplier = await this.model.findOne({ cnpj }).lean();
        return supplier;
    }
    async findByPhone(phone) {
        const supplier = await this.model.findOne({ phone }).lean();
        return supplier;
    }
}
exports.SuppliersRepository = SuppliersRepository;
