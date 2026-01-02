"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUsersRepository = void 0;
const mongoose_1 = require("mongoose");
class MockUsersRepository {
    constructor() {
        this.users = [];
    }
    async create(newUserData) {
        const newUser = {
            ...newUserData,
            code: null,
            _id: new mongoose_1.Types.ObjectId(),
        };
        this.users.push(newUser);
        return newUser;
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    async findById(_id) {
        return this.users.find((user) => user._id.toString() === _id);
    }
    async update(filters, updateFields) {
        const fields = updateFields.$set;
        const indexToUpdate = this.users.findIndex((user) => user._id.toString() === filters._id);
        if (indexToUpdate !== -1) {
            this.users[indexToUpdate] = {
                ...this.users[indexToUpdate],
                ...fields,
            };
        }
    }
    async delete(idUser) {
        this.users = this.users.filter((user) => user._id.toString() !== idUser);
    }
}
exports.MockUsersRepository = MockUsersRepository;
