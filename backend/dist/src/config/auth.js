"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    secretToken: process.env.JWT_SECRET || "default_secret",
    secretRefreshToken: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    expiresInToken: "15m",
    expiresInRefreshToken: "30d",
    expiresRefreshTokenDays: 30,
};
