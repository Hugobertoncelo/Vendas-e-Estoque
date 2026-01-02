"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UsersTokensRepository_1 = require("../../repositories/UsersTokens/UsersTokensRepository");
tsyringe_1.container.registerSingleton('UsersTokensRepository', UsersTokensRepository_1.UsersTokensRepository);
