import "reflect-metadata";
import "./shared/containers";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";
import { createRouter } from "next-connect";
import { expressWrapper } from "next-connect";

console.log("[DEBUG] Handler carregado");

const app = express();

const allowedOrigins = [
  "https://vendas-e-estoque-git-main-hugobertoncelos-projects.vercel.app",
  "http://localhost:3000",
  "https://vendas-e-estoque-e64b9o8as-hugobertoncelos-projects.vercel.app",
  "https://vendas-e-estoque.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(handleErrors);

app.get("/", (req, res) => {
  res.send("API Vendas-e-Estoque rodando!");
});

const handler = createRouter();

handler.use(async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    next();
  } catch (err) {
    console.error("[FATAL] Erro no middleware OPTIONS:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Erro inesperado no middleware OPTIONS",
        details: err.message,
      })
    );
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
    if (mongoose.connection.readyState !== 1) {
      const MONGO_USERNAME = process.env.MONGO_USERNAME;
      let MONGO_PASSWORD = process.env.MONGO_PASSWORD;
      const encodedPassword = encodeURIComponent(MONGO_PASSWORD || "");
      const MONGO_DATABASE = process.env.MONGO_DATABASE;
      if (!MONGO_DATABASE) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "A variável de ambiente MONGO_DATABASE não está definida!",
          })
        );
        return;
      }
      const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${encodedPassword}@stockcontrol.edrkre6.mongodb.net/${MONGO_DATABASE}?appName=stockcontrol`;
      try {
        await mongoose.connect(mongoURL, { bufferCommands: false });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Erro ao conectar ao MongoDB",
            details: err.message,
            stack: err.stack,
            full: err,
          })
        );
        return;
      }
    }
    next();
  } catch (err) {
    console.error("[FATAL] Erro no middleware de conexão Mongo:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Erro inesperado no middleware de conexão Mongo",
        details: err.message,
      })
    );
  }
});

handler.use(cors(corsOptions));
handler.use(expressWrapper(app));

export default handler;
