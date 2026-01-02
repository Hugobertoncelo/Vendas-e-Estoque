"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const SuppliersRepository_1 = require("../../repositories/Suppliers/SuppliersRepository");
tsyringe_1.container.registerSingleton('SuppliersRepository', SuppliersRepository_1.SuppliersRepository);
