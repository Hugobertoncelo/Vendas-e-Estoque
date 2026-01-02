"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewSupplierService = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../errors/AppError");
let CreateNewSupplierService = class CreateNewSupplierService {
    constructor(suppliersRepository) {
        this.suppliersRepository = suppliersRepository;
    }
    async execute({ name, email, cnpj, phone, userId, }) {
        if (!name)
            throw new AppError_1.AppError('Nome do fornecedor não informado');
        if (!phone)
            throw new AppError_1.AppError('Telefone do fornecedor não informado');
        const phoneAlreadyExists = await this.suppliersRepository.findByPhone(phone);
        if (phoneAlreadyExists) {
            throw new AppError_1.AppError('Já existe um fornecedor cadastrado com este telefone');
        }
        const cnpjAlreadyExists = await this.suppliersRepository.findByCnpj(cnpj);
        if (cnpjAlreadyExists) {
            throw new AppError_1.AppError('Já existe um fornecedor cadastrado com este CNPJ');
        }
        const suppliersAmount = await this.suppliersRepository.getEntries(userId);
        const code = (suppliersAmount + 1).toString();
        const newSupplier = await this.suppliersRepository.create({
            name,
            phone,
            cnpj,
            email,
            code,
            userId,
        });
        return newSupplier;
    }
};
exports.CreateNewSupplierService = CreateNewSupplierService;
exports.CreateNewSupplierService = CreateNewSupplierService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('SuppliersRepository')),
    __metadata("design:paramtypes", [Object])
], CreateNewSupplierService);
