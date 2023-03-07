const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");

const app = new Koa();
const router = new Router();

// Configuration de la connexion à la base de données
const dbConfig = {
  host: "squirrel.kilian-marmilliot.com",
  port: "27017",
  name: "database",
  user: "yconnect",
  password: "yconnectAdminMdp",
};

// Initialisation de Mongoose avec la configuration de connexion
mongoose.connect(
  `mongodb://yconnect:yconnectAdminMdp@squirrel.kilian-marmilliot.com:27017/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Gestion des erreurs de connexion
mongoose.connection.on("error", (err) => {
  console.error(`Erreur de connexion à la base de données: ${err}`);
});

// Test de la connexion à la base de données
mongoose.connection.once("open", () => {
  console.log("Connexion à la base de données établie avec succès");
});

// Connexion à la base de données MongoDB avec Mongoose
// mongoose
//   .connect("mongodb://squirrel.kilian-marmilliot.com:8080", {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connecté à MongoDB"))
//   .catch((err) => console.error("Erreur de connexion à MongoDB", err));

// Routes
router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

// Ajout du routeur à l'application Koa
app.use(router.routes());

// Démarrage du serveur sur le port 3000
app.listen(3000, () => console.log("Le serveur écoute sur le port 3000"));
