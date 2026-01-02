"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const DeleteSupplieService_service_1 = require("./../useCases/Supplier/DeleteSupplier/DeleteSupplieService.service");
const tsyringe_1 = require("tsyringe");
const CreateNewSupplierService_service_1 = require("../useCases/Supplier/CreateNewSupplier/CreateNewSupplierService.service");
const ListSuppliersService_service_1 = require("../useCases/Supplier/ListSuppliers/ListSuppliersService.service");
class SupplierController {
    async create(req, res) {
        const { name, phone, cnpj, email } = req.body;
        const { userId } = req.user;
        const createNewSupplierService = tsyringe_1.container.resolve(CreateNewSupplierService_service_1.CreateNewSupplierService);
        const newSupplier = await createNewSupplierService.execute({
            name,
            phone,
            cnpj,
            email,
            userId,
        });
        return res.status(201).json({
            success: true,
            item: newSupplier,
            message: 'Fornecedor cadastrado com sucesso',
        });
    }
    async list(req, res) {
        const { userId } = req.user;
        const listSuppliersService = tsyringe_1.container.resolve(ListSuppliersService_service_1.ListSuppliersService);
        const suppliers = await listSuppliersService.execute({ userId });
        return res.status(200).json({
            success: true,
            items: suppliers,
            message: 'Busca de fornecedores realizada com sucesso',
        });
    }
    async delete(req, res) {
        const { supplierId } = req.params;
        const deleteSupplierService = tsyringe_1.container.resolve(DeleteSupplieService_service_1.DeleteSupplierService);
        await deleteSupplierService.execute(supplierId);
        return res.status(200).json({
            success: true,
            message: 'Fornecedor excluído com sucesso',
        });
    }
}
exports.SupplierController = SupplierController;
