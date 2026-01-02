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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../errors/AppError");
const UsersRepository_1 = require("../repositories/Users/UsersRepository");
const dotenv = __importStar(require("dotenv"));
const auth_1 = __importDefault(require("../config/auth"));
dotenv.config();
async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new AppError_1.AppError('Token não informado', 401);
    const [, token] = authHeader.split(' ');
    try {
        const { sub: userId } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secretToken);
        const usersRepository = new UsersRepository_1.UsersRepository();
        const user = await usersRepository.findById(userId.toString());
        if (!user)
            throw new AppError_1.AppError('Usuário inválido', 401);
        req.user = {
            userId: userId.toString(),
        };
        next();
    }
    catch (err) {
        console.log('ERROR', err);
        throw new AppError_1.AppError(`Token inválido - ${err.message}`, 401);
    }
}
