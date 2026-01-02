"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateNewProductService_service_1 = require("../useCases/Product/CreateNewProduct/CreateNewProductService.service");
const UpdateProductService_service_1 = require("../useCases/Product/UpdateProduct/UpdateProductService.service");
const DeleteProductService_service_1 = require("../useCases/Product/DeleteProduct/DeleteProductService.service");
const ListProductsService_service_1 = require("../useCases/Product/ListProducts/ListProductsService.service");
const ListDefaultProductsService_service_1 = require("../useCases/Product/ListDefaultProducts/ListDefaultProductsService.service");
class ProductController {
    async listProducts(req, res) {
        const { searchString } = req.query;
        const { userId } = req.user;
        const listProductsService = tsyringe_1.container.resolve(ListProductsService_service_1.ListProductsService);
        const products = await listProductsService.execute({
            searchString,
            userId,
        });
        return res.status(200).json({
            success: true,
            items: products,
            message: 'Busca de produtos concluída com sucesso',
        });
    }
    async getDefaultProducts(req, res) {
        const { userId } = req.query;
        const listDefaultProductsService = tsyringe_1.container.resolve(ListDefaultProductsService_service_1.ListDefaultProductsService);
        const products = await listDefaultProductsService.execute({
            userId,
        });
        return res.status(200).json({
            success: true,
            items: products,
            message: 'Busca de produtos concluída com sucesso',
        });
    }
    async createNewProduct(req, res) {
        const { name, value, stock, isDefault, userInfo } = req.body;
        const createNewProductService = tsyringe_1.container.resolve(CreateNewProductService_service_1.CreateNewProductService);
        const newProduct = await createNewProductService.execute({
            name,
            value,
            stock,
            isDefault,
            userId: userInfo?._id,
        });
        return res.status(201).json({
            success: true,
            item: newProduct,
            message: 'Produto cadastrado com sucesso',
        });
    }
    async updateProduct(req, res) {
        const { name, _id: idProduct, value, stock, isDefault } = req.body;
        const updateNewProductService = tsyringe_1.container.resolve(UpdateProductService_service_1.UpdateNewProductService);
        const updatedProduct = await updateNewProductService.execute({
            name,
            idProduct,
            value,
            stock,
            isDefault,
        });
        return res.status(202).json({
            success: true,
            updatedProduct,
            message: 'Produto atualizado com sucesso',
        });
    }
    async deleteProduct(req, res) {
        const { idProduct } = req.query;
        const deleteProductService = tsyringe_1.container.resolve(DeleteProductService_service_1.DeleteProductService);
        await deleteProductService.execute(idProduct);
        return res.status(202).json({
            success: true,
            message: 'Produto excluído com sucesso',
        });
    }
}
exports.ProductController = ProductController;
