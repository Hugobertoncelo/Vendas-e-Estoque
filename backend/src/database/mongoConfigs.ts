import "dotenv/config";
import mongoose from "mongoose";

console.log("[DEBUG] process.env.MONGO_USERNAME:", process.env.MONGO_USERNAME);
console.log(
  "[DEBUG] process.env.MONGO_PASSWORD:",
  process.env.MONGO_PASSWORD ? "[PRESENTE]" : "[VAZIO OU UNDEFINED]"
);

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stockcontrol.edrkre6.mongodb.net/?appName=stockcontrol`;

console.log("[DEBUG] String de conexão MongoDB:", mongoURL);

export default mongoose;
