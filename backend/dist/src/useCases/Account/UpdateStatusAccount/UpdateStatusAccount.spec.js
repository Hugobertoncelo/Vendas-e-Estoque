"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockAccountsRepository_1 = require("./../../../repositories/Accounts/MockAccountsRepository");
const mongoose_1 = require("mongoose");
const UpdateStatusAccountService_service_1 = require("./UpdateStatusAccountService.service");
const CreateNewAccountService_service_1 = require("../CreateNewAccount/CreateNewAccountService.service");
const AppError_1 = require("../../../errors/AppError");
let mockAccountsRepository;
let updateStatusAccountService;
let createNewAccountService;
describe('Update status account', () => {
    beforeEach(() => {
        mockAccountsRepository = new MockAccountsRepository_1.MockAccountsRepository();
        updateStatusAccountService = new UpdateStatusAccountService_service_1.UpdateStatusAccountService(mockAccountsRepository);
        createNewAccountService = new CreateNewAccountService_service_1.CreateNewAccountService(mockAccountsRepository);
    });
    it('should be able update status account', async () => {
        const newAccount = await createNewAccountService.execute({
            type: 'in',
            userId: new mongoose_1.Types.ObjectId().toString(),
            category: 'Despesas do estabelecimento',
            value: 99,
            description: 'Conta de luz',
        });
        await updateStatusAccountService.execute({
            idAccount: newAccount._id.toString(),
            status: 'pending',
        });
        const updatedAccount = await mockAccountsRepository.findById(newAccount._id.toString());
        expect(updatedAccount.status).toEqual('pending');
    });
    it('should not be able update status account if idAccount not sent', async () => {
        await expect(async () => {
            await createNewAccountService.execute({
                type: 'in',
                userId: new mongoose_1.Types.ObjectId().toString(),
                category: 'Despesas do estabelecimento',
                value: 99,
                description: 'Conta de luz',
            });
            await updateStatusAccountService.execute({
                idAccount: undefined,
                status: 'pending',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able update status account if "status" not sent', async () => {
        await expect(async () => {
            const newAccount = await createNewAccountService.execute({
                type: 'in',
                userId: new mongoose_1.Types.ObjectId().toString(),
                category: 'Despesas do estabelecimento',
                value: 99,
                description: 'Conta de luz',
            });
            await updateStatusAccountService.execute({
                idAccount: newAccount._id.toString(),
                status: undefined,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
