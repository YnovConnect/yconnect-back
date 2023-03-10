import Koa from "koa";
import mongoose from "mongoose";
import APIRouter from "./src/router.js";
import bodyparser from "koa-bodyparser";
import config from "./src/config/index.js";
import cors from "@koa/cors";
import isAuthenticated from "./src/middleware/isAuthentificated.js";

const app = new Koa();

// Initialisation de Mongoose avec la configuration de connexion
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Gestion des erreurs de connexion
mongoose.connection.on("error", (err) => {
  console.error(`Erreur de connexion à la base de données: ${err}`);
});

// Test de la connexion à la base de données
mongoose.connection.once("open", () => {
  console.log("Connexion à la base de données établie avec succès");
});

app.use(bodyparser());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(APIRouter.allowedMethods());

app.use(isAuthenticated);
// Ajout du routeur à l'application Koa
app.use(APIRouter.routes());

// Démarrage du serveur sur le port 3000
app.listen(3000, () => console.log("Le serveur écoute sur le port 3000"));
//post créer une entité  -- put ou patch modifie
