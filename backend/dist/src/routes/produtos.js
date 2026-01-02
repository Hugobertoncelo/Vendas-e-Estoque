"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtosRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const produtosRoutes = express_1.default.Router();
exports.produtosRoutes = produtosRoutes;
const productController = new ProductController_1.ProductController();
// Middlewares
produtosRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
// Routes
produtosRoutes.get('/', productController.listProducts);
produtosRoutes.get('/padroes', productController.getDefaultProducts);
produtosRoutes.post('/', productController.createNewProduct);
produtosRoutes.put('/', productController.updateProduct);
produtosRoutes.delete('/', productController.deleteProduct);
