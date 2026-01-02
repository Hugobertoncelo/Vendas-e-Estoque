"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contasRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AccountController_1 = require("../controllers/AccountController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const contasRoutes = express_1.default.Router();
exports.contasRoutes = contasRoutes;
const accountController = new AccountController_1.AccountController();
contasRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
contasRoutes.get("/", accountController.listAccounts);
contasRoutes.post("/", accountController.createNewAccount);
contasRoutes.put("/", accountController.updateAccount);
contasRoutes.patch("/updateStatus/:idAccount", accountController.updateStatusAccount);
contasRoutes.delete("/", accountController.deleteAccount);
