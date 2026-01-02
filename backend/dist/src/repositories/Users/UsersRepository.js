"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const user_1 = require("../../entities/user");
class UsersRepository {
    constructor() {
        this.model = user_1.UserModel;
    }
    async create({ name, password, email }) {
        const newUser = await this.model.create({
            name,
            password,
            email,
        });
        await newUser.save();
        return newUser;
    }
    async findByEmail(email) {
        return await this.model.findOne({ email }).lean();
    }
    async findById(_id) {
        return await this.model.findOne({ _id }).lean();
    }
}
exports.UsersRepository = UsersRepository;
