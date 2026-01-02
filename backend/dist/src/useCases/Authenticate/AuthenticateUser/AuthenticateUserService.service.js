"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const dotenv = __importStar(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../errors/AppError");
const auth_1 = __importDefault(require("../../../config/auth"));
dotenv.config();
let AuthenticateUserService = class AuthenticateUserService {
    constructor(usersRepository, usersTokensRepository, dateProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ email, password }) {
        if (!email)
            throw new AppError_1.AppError("E-mail não enviado");
        if (!password)
            throw new AppError_1.AppError("Senha não enviada");
        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new AppError_1.AppError("E-mail e/ou senha incorretos");
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch)
            throw new AppError_1.AppError("E-mail e/ou senha incorretos");
        const { secretToken, expiresInToken, secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays, } = auth_1.default;
        if (!secretToken || !secretRefreshToken) {
            throw new AppError_1.AppError("JWT secret(s) não definidos nas variáveis de ambiente");
        }
        const tokenOptions = {
            subject: user._id.toString(),
            expiresIn: expiresInToken,
        };
        const token = (0, jsonwebtoken_1.sign)({ email: user.email }, secretToken, tokenOptions);
        const refreshTokenOptions = {
            subject: user._id.toString(),
            expiresIn: expiresInRefreshToken,
        };
        const refreshToken = (0, jsonwebtoken_1.sign)({ email: user.email }, secretRefreshToken, refreshTokenOptions);
        const refreshTokenExpiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);
        await this.usersTokensRepository.create({
            user: user._id.toString(),
            refreshToken,
            expiresDate: refreshTokenExpiresDate,
        });
        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
            refreshToken,
        };
    }
};
exports.AuthenticateUserService = AuthenticateUserService;
exports.AuthenticateUserService = AuthenticateUserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository")),
    __param(1, (0, tsyringe_1.inject)("UsersTokensRepository")),
    __param(2, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticateUserService);
