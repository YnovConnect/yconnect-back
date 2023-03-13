import Koa from "koa";
import mongoose from "mongoose";
import APIRouter from "./src/router.js";
import bodyparser from "koa-bodyparser";
import config from "./src/config/index.js";
import cors from "@koa/cors";
import isAuthenticated from "./src/middleware/isAuthentificated.js";
import swaggerUi from "swagger-ui-koa";
import convert from "koa-convert";
import swaggerJSDoc from "swagger-jsdoc";
import mount from "koa-mount";
import websockify from "koa-websocket";
import WebSocket from "ws";

const app = websockify(new Koa());
const ws = new WebSocket("ws://localhost:3000");

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

const options = {
  swaggerDefinition: {
    info: {
      title: "API", // Title (required)
      version: "2.0.0", // Version (required)
    },
  },
  apis: [
    "./src/routes/*.js", // Path to the API docs from root
  ],
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.use(swaggerUi.serve); //serve swagger static files
app.use(convert(mount("/swagger", swaggerUi.setup(swaggerSpec))));

app.use(APIRouter.allowedMethods());
app.use(isAuthenticated);
app.use(APIRouter.routes());

ws.on("message", (msg) => {
  console.log("Received message:", msg.toString());
});

ws.on("close", () => {
  console.log("Disconnected from server");
});

app.ws.use((ctx, next) => {
  console.log("A user connected");
  ctx.websocket.send("Welcome!");

  return next();
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => console.log("Le serveur écoute sur le port 3000"));
