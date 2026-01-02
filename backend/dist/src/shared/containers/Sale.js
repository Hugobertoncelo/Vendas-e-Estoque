"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const SalesRepository_1 = require("../../repositories/Sales/SalesRepository");
tsyringe_1.container.registerSingleton('SalesRepository', SalesRepository_1.SalesRepository);
