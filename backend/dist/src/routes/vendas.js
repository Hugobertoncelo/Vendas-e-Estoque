"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendasRoutes = void 0;
const express_1 = __importDefault(require("express"));
const SaleController_1 = require("../controllers/SaleController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const vendasRoutes = express_1.default.Router();
exports.vendasRoutes = vendasRoutes;
const saleController = new SaleController_1.SaleController();
// Midlewares
vendasRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
// Routes
vendasRoutes.get('/', saleController.listSales);
vendasRoutes.post('/', saleController.createNewSale);
vendasRoutes.put('/', saleController.updateSale);
vendasRoutes.put('/cancelar', saleController.cancelSale);
