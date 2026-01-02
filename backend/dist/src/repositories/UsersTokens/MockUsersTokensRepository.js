"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUsersTokensRepository = void 0;
const mongoose_1 = require("mongoose");
class MockUsersTokensRepository {
    constructor() {
        this.usersTokens = [];
    }
    async create({ expiresDate, refreshToken, user, }) {
        const newUserToken = {
            expiresDate,
            refreshToken,
            user: new mongoose_1.Types.ObjectId(user),
            createdAt: new Date(),
            _id: new mongoose_1.Types.ObjectId(),
        };
        this.usersTokens.push(newUserToken);
        return newUserToken;
    }
    async findByUserIdAndRefreshToken(userId, refreshToken) {
        const userToken = this.usersTokens.find((token) => token.refreshToken === refreshToken &&
            token.user.toString() === userId.toString());
        return userToken;
    }
    async deleteById(tokenId) {
        this.usersTokens = this.usersTokens.filter((token) => token._id.toString() !== tokenId.toString());
    }
    async findByRefreshToken(refreshToken) {
        const userToken = this.usersTokens.find((token) => token.refreshToken === refreshToken);
        return userToken;
    }
}
exports.MockUsersTokensRepository = MockUsersTokensRepository;
