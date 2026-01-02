"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const routes_1 = require("../../routes");
require("../containers");
const mongoConfigs_1 = __importDefault(require("../../database/mongoConfigs"));
const cors_1 = __importDefault(require("cors"));
const handleErrors_1 = require("../../middlewares/handleErrors");
// Configurações
const app = (0, express_1.default)();
const PORT = 3333;
app.mongo = mongoConfigs_1.default;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rotas
app.use(routes_1.routes);
app.use(handleErrors_1.handleErrors);
app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`));
app.get('/', async (req, res) => {
    try {
        res.status(200).send(`<h1>Servidor rodando na porta ${PORT}</h1>`);
    }
    catch (err) {
        res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err);
    }
});
