"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ProductsRepository_1 = require("../../repositories/Products/ProductsRepository");
tsyringe_1.container.registerSingleton('ProductsRepository', ProductsRepository_1.ProductsRepository);
