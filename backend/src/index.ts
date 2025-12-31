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

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    const MONGO_USERNAME = process.env.MONGO_USERNAME;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stockcontrol.edrkre6.mongodb.net/?appName=stockcontrol`;
    try {
      await mongoose.connect(mongoURL, { bufferCommands: false });
    } catch (err) {
      console.error("[MONGOOSE ERROR][HANDLER] Falha ao conectar:", err);
      return res
        .status(500)
        .json({ error: "Erro ao conectar ao MongoDB", details: err.message });
    }
  }
  return app(req, res);
}
