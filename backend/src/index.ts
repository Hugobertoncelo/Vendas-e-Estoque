import "reflect-metadata";
import "./shared/containers";
import "./database/mongoConfigs";
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

export default app;
