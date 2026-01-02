"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const DashboardController_1 = require("../controllers/DashboardController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const dashboardRoutes = express_1.default.Router();
exports.dashboardRoutes = dashboardRoutes;
const dashboardController = new DashboardController_1.DashboardController();
dashboardRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
dashboardRoutes.get("/formasDePagamento", dashboardController.getPaymentTypes);
