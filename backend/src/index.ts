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
    await mongoose.connect(process.env.MONGO_URL || "", {
      bufferCommands: false,
    });
  }
  return app(req, res);
}
