"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsRepository = void 0;
const client_1 = require("../../entities/client");
class ClientsRepository {
    constructor() {
        this.model = client_1.ClientModel;
    }
    async create({ name, cpf, phone, email, code, userId, }) {
        const newClient = await this.model.create({
            name,
            cpf,
            email,
            code,
            phone,
            user: userId,
        });
        await newClient.save();
        return newClient;
    }
    async list({ userId, searchString }) {
        const clients = await this.model.find({
            user: userId,
            ...(searchString ? {
                name: {
                    $regex: searchString, $options: 'i'
                }
            } : {})
        }).lean();
        return clients;
    }
    async getEntries(userId) {
        return await this.model.countDocuments({ user: userId }).lean();
    }
    async delete(supplieId) {
        await this.model.deleteOne({ _id: supplieId });
    }
    async findByCpf(cpf) {
        const supplier = await this.model.findOne({ cpf }).lean();
        return supplier;
    }
    async findByPhone(phone) {
        const supplier = await this.model.findOne({ phone }).lean();
        return supplier;
    }
    async update(clientId, fieldsToUpdate) {
        await this.model.updateOne({ _id: clientId }, fieldsToUpdate);
    }
}
exports.ClientsRepository = ClientsRepository;
