import "reflect-metadata";
import "./shared/containers";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";
import "./database/mongoConfigs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleErrors);

app.get("/", (req, res) => {
  res.send("API Vendas-e-Estoque rodando!");
});

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    const MONGO_USERNAME = process.env.MONGO_USERNAME;
    let MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const encodedPassword = encodeURIComponent(MONGO_PASSWORD || "");
    console.log(`[MONGOOSE][HANDLER] Usuário: ${MONGO_USERNAME}`);
    if (MONGO_PASSWORD) {
      console.log(
        `[MONGOOSE][HANDLER] Senha (início): ${MONGO_PASSWORD.slice(
          0,
          2
        )}... (tamanho: ${MONGO_PASSWORD.length})`
      );
    } else {
      console.warn("[MONGOOSE][HANDLER] Senha não definida!");
    }
    const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${encodedPassword}@stockcontrol.edrkre6.mongodb.net/stockcontrol?appName=stockcontrol`;
    console.log(
      `[MONGOOSE][HANDLER] Conectando em: mongodb+srv://${MONGO_USERNAME}:<PASSWORD>@stockcontrol.edrkre6.mongodb.net/?appName=stockcontrol`
    );
    try {
      await mongoose.connect(mongoURL, { bufferCommands: false });
      console.log("[MONGOOSE][HANDLER] Conexão estabelecida com sucesso!");
    } catch (err) {
      console.error("[MONGOOSE ERROR][HANDLER] Falha ao conectar:", err);
      return res.status(500).json({
        error: "Erro ao conectar ao MongoDB",
        details: err.message,
        stack: err.stack,
        full: err,
      });
    }
  } else {
    console.log("[MONGOOSE][HANDLER] Já conectado ao MongoDB.");
  }
  return app(req, res);
}
