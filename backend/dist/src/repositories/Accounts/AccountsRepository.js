"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsRepository = void 0;
const account_1 = require("../../entities/account");
class AccountsRepository {
    constructor() {
        this.model = account_1.AccountModel;
    }
    async list({ startDate, endDate, accountType, userId, status, }) {
        const query = {
            user: userId,
            ...(accountType ? { type: accountType } : {}),
            ...(status ? { status } : {}),
            ...(startDate && endDate
                ? { date: { $gte: startDate, $lt: endDate } }
                : {}),
        };
        return await this.model.find(query).sort({ date: -1 }).lean();
    }
    async create({ code, type, description, category, value, userId, }) {
        const newAccount = await this.model.create({
            code,
            type,
            description,
            category,
            value,
            user: userId,
        });
        await newAccount.save();
        return newAccount;
    }
    async update({ filters, updateFields }) {
        await this.model.updateMany(filters, updateFields);
    }
    async delete(idAccount) {
        await this.model.deleteOne({ _id: idAccount });
    }
    async findById(accountId) {
        return await this.model.findOne({ _id: accountId }).lean();
    }
    async getEntries(userId) {
        return await this.model.countDocuments({ user: userId }).lean();
    }
}
exports.AccountsRepository = AccountsRepository;
