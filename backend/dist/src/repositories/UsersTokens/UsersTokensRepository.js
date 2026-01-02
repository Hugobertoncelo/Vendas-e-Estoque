"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTokensRepository = void 0;
const userToken_1 = require("../../entities/userToken");
class UsersTokensRepository {
    constructor() {
        this.model = userToken_1.UserTokenModel;
    }
    async create({ user, expiresDate, refreshToken, }) {
        const token = await this.model.create({
            user,
            expiresDate,
            refreshToken,
        });
        await token.save();
        return token;
    }
    async findByUserIdAndRefreshToken(user, refreshToken) {
        return await this.model.findOne({ user, refreshToken });
    }
    async deleteById(tokenId) {
        await this.model.deleteOne({ _id: tokenId });
    }
    async findByRefreshToken(refreshToken) {
        return await this.model.findOne({ refreshToken });
    }
}
exports.UsersTokensRepository = UsersTokensRepository;
