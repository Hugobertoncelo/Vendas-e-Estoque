"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountsRepository_1 = require("../../repositories/Accounts/AccountsRepository");
const tsyringe_1 = require("tsyringe");
tsyringe_1.container.registerSingleton('AccountsRepository', AccountsRepository_1.AccountsRepository);
