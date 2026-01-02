"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockUsersRepository_1 = require("../../../repositories/Users/MockUsersRepository");
const CreateNewUserService_service_1 = require("./CreateNewUserService.service");
let mockUsersRepository;
let createNewUserService;
describe('Create new user', () => {
    beforeEach(() => {
        mockUsersRepository = new MockUsersRepository_1.MockUsersRepository();
        createNewUserService = new CreateNewUserService_service_1.CreateNewUserService(mockUsersRepository);
    });
    it('should be able create new user', async () => {
    });
});
