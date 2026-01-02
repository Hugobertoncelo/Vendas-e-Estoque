"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthenticateController_1 = require("../controllers/AuthenticateController");
const authenticateRoutes = express_1.default.Router();
exports.authenticateRoutes = authenticateRoutes;
const authenticateController = new AuthenticateController_1.AuthenticateController();
authenticateRoutes.post('/signIn', authenticateController.authenticateUser);
authenticateRoutes.post('/refreshToken', authenticateController.refreshToken);
