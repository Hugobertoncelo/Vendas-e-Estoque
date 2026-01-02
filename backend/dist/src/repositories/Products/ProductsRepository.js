"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const product_1 = require("../../entities/product");
class ProductsRepository {
    constructor() {
        this.model = product_1.ProductModel;
    }
    async list({ userId, searchString, onlyDefault, }) {
        const query = {
            user: userId,
            ...(searchString
                ? { name: { $regex: searchString, $options: 'i' } }
                : {}),
            ...(onlyDefault ? { isDefault: true } : {}),
        };
        return await product_1.ProductModel.find(query).lean();
    }
    async create({ code, isDefault, stock, name, userId, value, }) {
        const newProduct = await this.model.create({
            code,
            isDefault,
            stock,
            name,
            user: userId,
            value,
        });
        await newProduct.save();
        return newProduct;
    }
    async update({ filters, updateFields }) {
        await this.model.updateOne(filters, updateFields);
    }
    async delete(idProduct) {
        await product_1.ProductModel.deleteOne({ _id: idProduct });
    }
    async findByName(name) {
        return await product_1.ProductModel.findOne({ name }).lean();
    }
    async findById(productId) {
        return await product_1.ProductModel.findOne({ _id: productId }).lean();
    }
    async getEntries(userId) {
        return product_1.ProductModel.countDocuments({ user: userId }).lean();
    }
}
exports.ProductsRepository = ProductsRepository;
