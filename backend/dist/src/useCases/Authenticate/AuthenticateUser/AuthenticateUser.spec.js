"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticateUserService_service_1 = require("./AuthenticateUserService.service");
const MockUsersRepository_1 = require("../../../repositories/Users/MockUsersRepository");
const CreateNewUserService_service_1 = require("../../User/CreateNewUser/CreateNewUserService.service");
const AppError_1 = require("../../../errors/AppError");
const MockUsersTokensRepository_1 = require("../../../repositories/UsersTokens/MockUsersTokensRepository");
const DayjsDateProvider_1 = require("../../../shared/containers/providers/DateProvider/DayjsDateProvider");
let mockUsersRepository;
let mockUsersTokensRepository;
let dateProvider;
let createNewUserService;
let authenticateUserService;
describe('Authenticate user', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        mockUsersTokensRepository = new MockUsersTokensRepository_1.MockUsersTokensRepository();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        createNewUserService = new CreateNewUserService_service_1.CreateNewUserService(mockUsersRepository);
        authenticateUserService = new AuthenticateUserService_service_1.AuthenticateUserService(mockUsersRepository, mockUsersTokensRepository, dateProvider);
    });
    it('should be able authenticate user', async () => {
        const newUser = await createNewUserService.execute({
            name: 'New user test',
            email: 'teste@teste.com',
            password: '123456',
            confirmPassword: '123456'
        });
        const authInfos = await authenticateUserService.execute({
            email: newUser.email,
            password: '123456',
        });
        expect(authInfos).toHaveProperty('token');
    });
    it('should not be able authenticate if e-mail not sent', async () => {
        await expect(async () => {
            await createNewUserService.execute({
                name: 'New user test',
                email: 'teste@teste.com',
                password: '123456',
                confirmPassword: '123456'
            });
            await authenticateUserService.execute({
                email: undefined,
                password: '123456',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able authenticate if password not sent', async () => {
        await expect(async () => {
            const newUser = await createNewUserService.execute({
                name: 'New user test',
                email: 'teste@teste.com',
                password: '123456',
                confirmPassword: '123456'
            });
            await authenticateUserService.execute({
                email: newUser.email,
                password: undefined,
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able authenticate if password incorrect', async () => {
        await expect(async () => {
            const newUser = await createNewUserService.execute({
                name: 'New user test',
                email: 'teste@teste.com',
                password: '123456',
                confirmPassword: '123456'
            });
            await authenticateUserService.execute({
                email: newUser.email,
                password: 'incorrect',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
    it('should not be able authenticate if e-mail incorrect', async () => {
        await expect(async () => {
            await createNewUserService.execute({
                name: 'New user test',
                email: 'teste@teste.com',
                password: '123456',
                confirmPassword: '123456'
            });
            await authenticateUserService.execute({
                email: 'incorrect@incorrect.com',
                password: '123456',
            });
        }).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
