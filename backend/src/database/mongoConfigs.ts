import mongoose from "mongoose";

const MONGO_USERNAME = "hugobertoncelo";
const MONGO_PASSWORD = "Bert0791@";
const mongoURL = `mongodb+srv://hugobertoncelo:<db_password>@stockcontrol.edrkre6.mongodb.net/?appName=stockcontrol`;

mongoose.connect(mongoURL);
mongoose.connection
  .on(
    "error",
    console.error.bind(console, "Erro ao conectar com o banco de dados")
  )
  .once("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  });

export default mongoose;
