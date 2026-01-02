"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MockAccountsRepository_1 = require("../../../repositories/Accounts/MockAccountsRepository");
const CreateNewAccountService_service_1 = require("../CreateNewAccount/CreateNewAccountService.service");
const DeleteAccountService_service_1 = require("./DeleteAccountService.service");
const AppError_1 = require("../../../errors/AppError");
let mockAccountsRepository;
let deleteAccountService;
let createNewAccountService;
describe('Delete account', () => {
    beforeEach(() => {
        mockAccountsRepository = new MockAccountsRepository_1.MockAccountsRepository();
        deleteAccountService = new DeleteAccountService_service_1.DeleteAccountService(mockAccountsRepository);
        createNewAccountService = new CreateNewAccountService_service_1.CreateNewAccountService(mockAccountsRepository);
    });
    it('should be able delete account', async () => {
        const newAccount = await createNewAccountService.execute({
            type: 'in',
            description: 'Conta de luz',
            category: 'Despesas do estabelecimento',
            userId: new mongoose_1.Types.ObjectId().toString(),
            value: 99,
        });
        await deleteAccountService.execute(newAccount._id.toString());
        const undefinedAccount = await mockAccountsRepository.findById(newAccount._id.toString());
        expect(undefinedAccount).toBeUndefined();
    });
    it('should not be able delete account if idAccount not sent', async () => {
        await expect(async () => {
            await deleteAccountService.execute(undefined);
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able delete account if the _id is from an invalid account', async () => {
        await expect(async () => {
            const idAccount = new mongoose_1.Types.ObjectId();
            await deleteAccountService.execute(idAccount.toString());
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
