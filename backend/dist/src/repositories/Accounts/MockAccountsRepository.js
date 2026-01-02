"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAccountsRepository = void 0;
const mongoose_1 = require("mongoose");
class MockAccountsRepository {
    constructor() {
        this.accounts = [];
    }
    async list({ userId, accountType }) {
        let accounts = this.accounts;
        accounts = accounts.filter((account) => account.user.toString() === userId.toString());
        if (accountType) {
            accounts = accounts.filter((account) => account.type === accountType);
        }
        return accounts;
    }
    async create({ category, code, description, userId, type, value, }) {
        const newAccount = {
            category,
            code,
            description,
            user: userId,
            type,
            value,
            _id: new mongoose_1.Types.ObjectId(),
            status: 'pending',
            date: new Date(),
        };
        this.accounts.push(newAccount);
        return newAccount;
    }
    async update({ filters, updateFields }) {
        const fields = updateFields.$set;
        const indexAccount = this.accounts.findIndex((account) => account._id.toString() === filters._id.toString());
        if (indexAccount !== -1) {
            this.accounts[indexAccount] = {
                ...this.accounts[indexAccount],
                ...fields,
            };
        }
    }
    async delete(idAccount) {
        this.accounts = this.accounts.filter((account) => account._id.toString() !== idAccount);
    }
    async findById(accountId) {
        return this.accounts.find((account) => account._id.toString() === accountId);
    }
    async getEntries(userId) {
        return this.accounts.filter((account) => account.user.toString() === userId).length;
    }
}
exports.MockAccountsRepository = MockAccountsRepository;
