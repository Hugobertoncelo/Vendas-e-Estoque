"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
console.log("[DEBUG] process.env.MONGO_USERNAME:", process.env.MONGO_USERNAME);
console.log("[DEBUG] process.env.MONGO_PASSWORD:", process.env.MONGO_PASSWORD ? "[PRESENTE]" : "[VAZIO OU UNDEFINED]");
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
if (!MONGO_DATABASE) {
    console.error("[FATAL] A variável de ambiente MONGO_DATABASE não está definida! (mongoConfigs.ts)");
    process.exit(1);
}
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stockcontrol.edrkre6.mongodb.net/${MONGO_DATABASE}?appName=stockcontrol`;
console.log("[DEBUG] String de conexão MongoDB:", mongoURL);
exports.default = mongoose_1.default;
