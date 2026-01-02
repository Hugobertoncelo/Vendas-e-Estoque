"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./shared/containers");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const routes_1 = require("./routes");
const handleErrors_1 = require("./middlewares/handleErrors");
const next_connect_1 = require("next-connect");
const next_connect_2 = require("next-connect");
console.log("[DEBUG] Handler carregado");
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://vendas-e-estoque-git-main-hugobertoncelos-projects.vercel.app",
    "http://localhost:3000",
    "https://vendas-e-estoque-e64b9o8as-hugobertoncelos-projects.vercel.app",
    "https://vendas-e-estoque.vercel.app",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use(handleErrors_1.handleErrors);
app.get("/", (req, res) => {
    res.send("API Vendas-e-Estoque rodando!");
});
const handler = (0, next_connect_1.createRouter)();
handler.use(async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            res.writeHead(200);
            res.end();
            return;
        }
        next();
    }
    catch (err) {
        console.error("[FATAL] Erro no middleware OPTIONS:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            error: "Erro inesperado no middleware OPTIONS",
            details: err.message,
        }));
    }
});
handler.use(async (req, res, next) => {
    try {
        console.log("[DEBUG] ENV", {
            MONGO_USERNAME: process.env.MONGO_USERNAME,
            MONGO_PASSWORD: process.env.MONGO_PASSWORD
                ? "[PRESENTE]"
                : "[VAZIO OU UNDEFINED]",
            MONGO_DATABASE: process.env.MONGO_DATABASE,
        });
        if (mongoose_1.default.connection.readyState !== 1) {
            const MONGO_USERNAME = process.env.MONGO_USERNAME;
            let MONGO_PASSWORD = process.env.MONGO_PASSWORD;
            const encodedPassword = encodeURIComponent(MONGO_PASSWORD || "");
            const MONGO_DATABASE = process.env.MONGO_DATABASE;
            if (!MONGO_DATABASE) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    error: "A variável de ambiente MONGO_DATABASE não está definida!",
                }));
                return;
            }
            const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${encodedPassword}@stockcontrol.edrkre6.mongodb.net/${MONGO_DATABASE}?appName=stockcontrol`;
            try {
                await mongoose_1.default.connect(mongoURL, { bufferCommands: false });
            }
            catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    error: "Erro ao conectar ao MongoDB",
                    details: err.message,
                    stack: err.stack,
                    full: err,
                }));
                return;
            }
        }
        next();
    }
    catch (err) {
        console.error("[FATAL] Erro no middleware de conexão Mongo:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            error: "Erro inesperado no middleware de conexão Mongo",
            details: err.message,
        }));
    }
});
handler.use((0, cors_1.default)(corsOptions));
handler.use((0, next_connect_2.expressWrapper)(app));
exports.default = handler;
module.exports = handler;
