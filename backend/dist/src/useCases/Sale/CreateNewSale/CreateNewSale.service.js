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
exports.CreateNewSaleService = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../errors/AppError");
let CreateNewSaleService = class CreateNewSaleService {
    constructor(salesRepository) {
        this.salesRepository = salesRepository;
    }
    async execute({ clientId, products, paymentType, totalValue, userId, }) {
        if (!paymentType)
            throw new AppError_1.AppError('Forma de pagamento não informada');
        if (!products || products?.length === 0)
            throw new AppError_1.AppError('Nenhum produto selecionado');
        const salesAmount = await this.salesRepository.getEntries(userId);
        const code = (salesAmount + 1).toString();
        const newSale = await this.salesRepository.create({
            clientId,
            products,
            paymentType,
            totalValue,
            userId,
            code,
        });
        return newSale;
    }
};
exports.CreateNewSaleService = CreateNewSaleService;
exports.CreateNewSaleService = CreateNewSaleService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('SalesRepository')),
    __metadata("design:paramtypes", [Object])
], CreateNewSaleService);
