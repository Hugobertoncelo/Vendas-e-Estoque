"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const tsyringe_1 = require("tsyringe");
const GetSalesService_service_1 = require("../useCases/Sale/GetSales/GetSalesService.service");
const CreateNewSale_service_1 = require("../useCases/Sale/CreateNewSale/CreateNewSale.service");
const CancelSaleService_service_1 = require("../useCases/Sale/CancelSale/CancelSaleService.service");
const UpdateSaleService_service_1 = require("../useCases/Sale/UpdateSale/UpdateSaleService.service");
const UpdateProductsStock_service_1 = require("../useCases/Product/UpdateProductStock/UpdateProductsStock.service");
class SaleController {
    async listSales(req, res) {
        const { startDate, endDate, status } = req.query;
        const { userId } = req.user;
        const getSalesService = tsyringe_1.container.resolve(GetSalesService_service_1.GetSalesService);
        const sales = await getSalesService.execute({
            startDate,
            endDate,
            userId,
            status,
        });
        return res.status(200).json({
            success: true,
            items: sales,
            message: 'Busca de vendas concluída com sucesso',
        });
    }
    async createNewSale(req, res) {
        const { clientId, products, paymentType, totalValue = 0 } = req.body;
        const { userId } = req.user;
        const createNewSaleService = tsyringe_1.container.resolve(CreateNewSale_service_1.CreateNewSaleService);
        const newSale = await createNewSaleService.execute({
            clientId,
            products,
            paymentType,
            totalValue,
            userId,
        });
        const updateProductsStock = tsyringe_1.container.resolve(UpdateProductsStock_service_1.UpdateProductsStock);
        await updateProductsStock.execute({ products });
        return res.status(201).json({
            success: true,
            item: newSale,
            message: 'Venda cadastrada com sucesso',
        });
    }
    async updateSale(req, res) {
        const { _id: idSale, client, products, paymentType, totalValue = 0, status, } = req.body;
        const updateNewSaleService = tsyringe_1.container.resolve(UpdateSaleService_service_1.UpdateNewSaleService);
        const newSale = await updateNewSaleService.execute({
            idSale,
            client,
            products,
            paymentType,
            totalValue,
            status,
        });
        const updateProductsStock = tsyringe_1.container.resolve(UpdateProductsStock_service_1.UpdateProductsStock);
        await updateProductsStock.execute({ products });
        return res.status(201).json({
            success: true,
            item: newSale,
            message: 'Venda atualizada com sucesso',
        });
    }
    async cancelSale(req, res) {
        const { _id: idSale } = req.body;
        const cancelSaleService = tsyringe_1.container.resolve(CancelSaleService_service_1.CancelSaleService);
        await cancelSaleService.execute(idSale);
        return res.status(201).json({
            success: true,
            message: 'Venda cancelada com sucesso',
        });
    }
}
exports.SaleController = SaleController;
