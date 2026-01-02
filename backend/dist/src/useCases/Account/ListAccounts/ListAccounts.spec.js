"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockAccountsRepository_1 = require("../../../repositories/Accounts/MockAccountsRepository");
const CreateNewAccountService_service_1 = require("../CreateNewAccount/CreateNewAccountService.service");
const ListAccountsService_service_1 = require("./ListAccountsService.service");
const AppError_1 = require("../../../errors/AppError");
let mockAccountsRepository;
let listAccountsService;
let createNewAccountService;
describe('List accounts', () => {
    beforeEach(() => {
        mockAccountsRepository = new MockAccountsRepository_1.MockAccountsRepository();
        listAccountsService = new ListAccountsService_service_1.ListAccountsService(mockAccountsRepository);
        createNewAccountService = new CreateNewAccountService_service_1.CreateNewAccountService(mockAccountsRepository);
    });
    it('should be able list accounts', async () => {
        const fakeUserId = new mongoose_1.Types.ObjectId();
        const newAccount = await createNewAccountService.execute({
            category: 'Despesas da loja',
            type: 'out',
            description: 'Conta de luz',
            value: 100,
            userId: fakeUserId.toString(),
        });
        const accounts = await listAccountsService.execute({
            userId: fakeUserId.toString(),
            accountType: newAccount.type,
            startDate: undefined,
            endDate: undefined,
            status: undefined
        });
        expect(accounts).toContainEqual(newAccount);
    });
    it('should not be able list accounts if idUser not sent', async () => {
        await expect(async () => {
            await listAccountsService.execute({
                userId: undefined,
                accountType: 'in',
                startDate: undefined,
                endDate: undefined,
                status: undefined
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
