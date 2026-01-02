"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const usersRoutes = express_1.default.Router();
exports.usersRoutes = usersRoutes;
const userController = new UserController_1.UserController();
usersRoutes.post("/", userController.createNewUser);
usersRoutes.patch("/:id", userController.updateUser);
