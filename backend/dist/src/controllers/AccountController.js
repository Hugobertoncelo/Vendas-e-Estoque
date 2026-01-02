"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const ListAccountsService_service_1 = require("../useCases/Account/ListAccounts/ListAccountsService.service");
const tsyringe_1 = require("tsyringe");
const CreateNewAccountService_service_1 = require("../useCases/Account/CreateNewAccount/CreateNewAccountService.service");
const UpdateAccountService_service_1 = require("../useCases/Account/UpdateAccount/UpdateAccountService.service");
const DeleteAccountService_service_1 = require("../useCases/Account/DeleteAccount/DeleteAccountService.service");
const UpdateStatusAccountService_service_1 = require("../useCases/Account/UpdateStatusAccount/UpdateStatusAccountService.service");
class AccountController {
    async listAccounts(req, res) {
        const { startDate, endDate, accountType, status } = req.query;
        const { userId } = req.user;
        const listAccountsService = tsyringe_1.container.resolve(ListAccountsService_service_1.ListAccountsService);
        const accounts = await listAccountsService.execute({
            startDate,
            endDate,
            accountType,
            userId,
            status,
        });
        return res.status(200).json({
            success: true,
            items: accounts,
            message: 'Busca concluída com sucesso',
        });
    }
    async createNewAccount(req, res) {
        const { description, type, category, value } = req.body;
        const { userId } = req.user;
        const createNewAccountService = tsyringe_1.container.resolve(CreateNewAccountService_service_1.CreateNewAccountService);
        const newAccount = await createNewAccountService.execute({
            type,
            description,
            category,
            value,
            userId,
        });
        return res.status(201).json({
            success: true,
            item: newAccount,
            message: 'Conta cadastrada com sucesso',
        });
    }
    async updateAccount(req, res) {
        const { description, category, type, _id, value, status } = req.body;
        const updateNewAccountService = tsyringe_1.container.resolve(UpdateAccountService_service_1.UpdateAccountService);
        const updatedAccount = await updateNewAccountService.execute({
            description,
            category,
            type,
            idAccount: _id,
            value,
            status,
        });
        return res.status(202).json({
            success: true,
            updatedAccount,
            message: 'Conta atualizada com sucesso',
        });
    }
    async updateStatusAccount(req, res) {
        const { idAccount } = req.params;
        const { status } = req.body;
        const updateStatusAccountService = tsyringe_1.container.resolve(UpdateStatusAccountService_service_1.UpdateStatusAccountService);
        await updateStatusAccountService.execute({
            idAccount,
            status,
        });
        return res.status(202).json({
            success: true,
            message: 'Status da conta atualizado com sucesso',
        });
    }
    async deleteAccount(req, res) {
        const { idAccount } = req.query;
        const deleteAccountService = tsyringe_1.container.resolve(DeleteAccountService_service_1.DeleteAccountService);
        await deleteAccountService.execute(idAccount);
        return res.status(200).json({
            success: true,
            message: 'Conta excluída com sucesso',
        });
    }
}
exports.AccountController = AccountController;
