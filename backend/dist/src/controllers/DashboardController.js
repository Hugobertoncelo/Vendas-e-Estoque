"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const tsyringe_1 = require("tsyringe");
const GetSalesService_service_1 = require("../useCases/Sale/GetSales/GetSalesService.service");
class DashboardController {
    async getPaymentTypes(req, res) {
        const { startDate, endDate, status } = req.query;
        const { userId } = req.user;
        const getSalesService = tsyringe_1.container.resolve(GetSalesService_service_1.GetSalesService);
        const sales = await getSalesService.execute({
            startDate,
            endDate,
            userId,
            status,
        });
        const paymentTypes = sales?.reduce((acc, sale) => {
            const paymentAlreadyExists = !!acc.find((s) => s.type === sale.paymentType);
            if (!paymentAlreadyExists) {
                acc.push({
                    type: sale.paymentType,
                    value: sale.totalValue,
                });
            }
            else {
                acc.forEach((s) => {
                    if (s.type === sale.paymentType) {
                        s.value += sale.totalValue;
                    }
                });
            }
            return acc;
        }, []);
        return res.status(200).json({
            success: true,
            items: paymentTypes,
            message: "Busca de pagamentos concluída com sucesso",
        });
    }
}
exports.DashboardController = DashboardController;
