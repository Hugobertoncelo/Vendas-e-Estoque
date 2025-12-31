import "dotenv/config";
import mongoose from "mongoose";

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:<HIDDEN>@stockcontrol.edrkre6.mongodb.net/stockcontrol?retryWrites=true&w=majority`;

console.log("[DEBUG] String de conexão MongoDB:", mongoURL);

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stockcontrol.edrkre6.mongodb.net/stockcontrol?retryWrites=true&w=majority`, { bufferCommands: false });
mongoose.connection
  .on(
    "error",
    (err) => {
      console.error("[MONGOOSE ERROR] Erro ao conectar com o banco de dados:", err);
    }
  )
  .once("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  });

export default mongoose;
