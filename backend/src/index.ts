import "reflect-metadata";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleErrors);

// Exporta o app Express diretamente para o Vercel
export default app;
