"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateNewClientService_service_1 = require("../useCases/Client/CreateNewClient/CreateNewClientService.service");
const ListClientsService_service_1 = require("../useCases/Client/ListClients/ListClientsService.service");
const DeleteClientService_service_1 = require("../useCases/Client/DeleteClient/DeleteClientService.service");
const UpdateClientService_service_1 = require("../useCases/Client/UpdateClientService/UpdateClientService.service");
class ClientController {
    async create(req, res) {
        const { name, phone, cpf, email } = req.body;
        const { userId } = req.user;
        const createNewClientService = tsyringe_1.container.resolve(CreateNewClientService_service_1.CreateNewClientService);
        const newClient = await createNewClientService.execute({
            name,
            phone,
            cpf,
            email,
            userId,
        });
        return res.status(201).json({
            success: true,
            item: newClient,
            message: 'Cliente cadastrado com sucesso',
        });
    }
    async list(req, res) {
        const { userId } = req.user;
        const { searchString = null } = req.query;
        const listClientsService = tsyringe_1.container.resolve(ListClientsService_service_1.ListClientsService);
        const clients = await listClientsService.execute({
            userId,
            ...(searchString ? {
                searchString: String(searchString)
            } : {
                searchString: null
            })
        });
        return res.status(200).json({
            success: true,
            items: clients,
            message: 'Busca de clientes realizada com sucesso',
        });
    }
    async delete(req, res) {
        const { clientId } = req.params;
        const deleteClientService = tsyringe_1.container.resolve(DeleteClientService_service_1.DeleteClientService);
        await deleteClientService.execute(clientId);
        return res.status(200).json({
            success: true,
            message: 'Cliente excluído com sucesso',
        });
    }
    async update(req, res) {
        const { name, phone, email, cpf } = req.body;
        const { clientId } = req.params;
        const updateClientService = tsyringe_1.container.resolve(UpdateClientService_service_1.UpdateClientService);
        await updateClientService.execute({ name, email, phone, cpf, clientId });
        return res.status(201).json({
            success: true,
            message: 'Dados do cliente atualizados com sucesso',
        });
    }
}
exports.ClientController = ClientController;
