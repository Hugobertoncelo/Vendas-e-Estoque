import express from "express";
import { DashboardController } from "../controllers/DashboardController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const dashboardRoutes = express.Router();
const dashboardController = new DashboardController();

dashboardRoutes.use(ensureAuthenticated);

dashboardRoutes.get("/formasDePagamento", dashboardController.getPaymentTypes);

export { dashboardRoutes };
