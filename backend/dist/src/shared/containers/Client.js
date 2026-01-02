"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientsRepository_1 = require("./../../repositories/Client/ClientsRepository");
const tsyringe_1 = require("tsyringe");
tsyringe_1.container.registerSingleton('ClientsRepository', ClientsRepository_1.ClientsRepository);
