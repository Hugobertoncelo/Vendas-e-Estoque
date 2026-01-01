import type { StringValue } from "ms";

export default {
  secretToken: process.env.JWT_SECRET || "default_secret",
  secretRefreshToken:
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
  expiresInToken: "15m" as StringValue,
  expiresInRefreshToken: "30d" as StringValue,
  expiresRefreshTokenDays: 30,
};
