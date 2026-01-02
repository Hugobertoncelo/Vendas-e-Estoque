"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockAccountsRepository_1 = require("./../../../repositories/Accounts/MockAccountsRepository");
const CreateNewAccountService_service_1 = require("../CreateNewAccount/CreateNewAccountService.service");
const mongoose_1 = require("mongoose");
const UpdateAccountService_service_1 = require("./UpdateAccountService.service");
const AppError_1 = require("../../../errors/AppError");
let mockAccountsRepository;
let createNewAccountService;
let updateAccountService;
describe('Update account infos', () => {
    beforeEach(() => {
        mockAccountsRepository = new MockAccountsRepository_1.MockAccountsRepository();
        createNewAccountService = new CreateNewAccountService_service_1.CreateNewAccountService(mockAccountsRepository);
        updateAccountService = new UpdateAccountService_service_1.UpdateAccountService(mockAccountsRepository);
    });
    it('should be able update account infos', async () => {
        const newAccount = await createNewAccountService.execute({
            type: 'in',
            userId: new mongoose_1.Types.ObjectId().toString(),
            category: 'Despesas do estabelecimento',
            value: 99,
            description: 'Conta de luz',
        });
        const newValues = {
            category: 'Nova categoria',
            description: 'Nova descrição',
            status: 'overdue',
            type: 'out',
            value: 1,
        };
        await updateAccountService.execute({
            idAccount: newAccount._id.toString(),
            ...newValues,
        });
        const updatedAccount = await mockAccountsRepository.findById(newAccount._id.toString());
        Object.keys(newValues).forEach((key) => {
            expect(updatedAccount[key]).toEqual(newValues[key]);
        });
    });
    it('should not be able update account if idAccount no sent', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: 'in',
                userId: new mongoose_1.Types.ObjectId().toString(),
                category: 'Despesas do estabelecimento',
                value: 99,
                description: 'Conta de luz',
            });
            const newValues = {
                category: 'Nova categoria',
                description: 'Nova descrição',
                status: 'overdue',
                type: 'out',
                value: 1,
            };
            await updateAccountService.execute({
                idAccount: undefined,
                ...newValues,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update account if idAccount is from a non-existent account', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: 'in',
                userId: new mongoose_1.Types.ObjectId().toString(),
                category: 'Despesas do estabelecimento',
                value: 99,
                description: 'Conta de luz',
            });
            const newValues = {
                category: 'Nova categoria',
                description: 'Nova descrição',
                status: 'overdue',
                type: 'out',
                value: 1,
            };
            await updateAccountService.execute({
                idAccount: new mongoose_1.Types.ObjectId().toString(),
                ...newValues,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
