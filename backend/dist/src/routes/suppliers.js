"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppliersRoutes = void 0;
const express_1 = require("express");
const SupplierController_1 = require("../controllers/SupplierController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const suppliersRoutes = (0, express_1.Router)();
exports.suppliersRoutes = suppliersRoutes;
const supplierController = new SupplierController_1.SupplierController();
// Middlewares
suppliersRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
// Routes
suppliersRoutes.post('/', supplierController.create);
suppliersRoutes.get('/', supplierController.list);
suppliersRoutes.delete('/:supplierId', supplierController.delete);
