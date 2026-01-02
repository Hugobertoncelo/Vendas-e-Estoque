"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const MockAccountsRepository_1 = require("../../../repositories/Accounts/MockAccountsRepository");
const CreateNewAccountService_service_1 = require("./CreateNewAccountService.service");
const AppError_1 = require("../../../errors/AppError");
let mockAccountsRepository;
let createNewAccountService;
describe('Create a new account', () => {
    beforeEach(() => {
        mockAccountsRepository = new MockAccountsRepository_1.MockAccountsRepository();
        createNewAccountService = new CreateNewAccountService_service_1.CreateNewAccountService(mockAccountsRepository);
    });
    it('should be able create a new account', async () => {
        const newAccount = await createNewAccountService.execute({
            type: 'in',
            description: 'Conta de luz',
            category: 'Despesas do estabelecimento',
            userId: new mongoose_1.Types.ObjectId().toString(),
            value: 99,
        });
        expect(newAccount).toHaveProperty('_id');
    });
    it('should not be able create a new account if type not sent', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: undefined,
                description: 'Conta de luz',
                category: 'Despesas do estabelecimento',
                userId: new mongoose_1.Types.ObjectId().toString(),
                value: 99,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able create a new account if description not sent', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: 'in',
                description: undefined,
                category: 'Despesas de estabelecimento',
                userId: new mongoose_1.Types.ObjectId().toString(),
                value: 99,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able create a new account if userId not sent', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: 'in',
                description: 'Conta de luz',
                category: 'Despesas do estabelecimento',
                userId: undefined,
                value: 99,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
