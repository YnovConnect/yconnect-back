import Router from "koa-router";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authentificationController = {
  // Créer une route pour l'inscription d'un nouvel utilisateur
  async register(ctx) {
    const { firstname, lastname, email, password, birthday } = ctx.request.body;

    try {
      // Vérifier si l'adresse email existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        ctx.status = 409; // Conflict
        ctx.body = { error: "Cet utilisateur existe déjà." };
        return;
      }

      // Hasher le mot de passe de l'utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur dans la base de données
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        birthday,
        isdeleted: false,
      });
      await user.save();

      ctx.body = { success: true };
    } catch (err) {
      ctx.status = 400; // Bad Request
      ctx.body = { error: err.message };
    }
  },

  // Créer une route pour la connexion d'un utilisateur existant
  async login(ctx) {
    const { email, password } = ctx.request.body;

    try {
      // Vérifier si l'adresse email existe dans la base de données
      const user = await User.findOne({ email });
      if (!user) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: "Adresse email ou mot de passe incorrect." };
        return;
      }

      // Vérifier si le mot de passe correspond à celui stocké dans la base de données
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: "Adresse email ou mot de passe incorrect." };
        return;
      }

      // Générer un token JWT
      const token = jwt.sign({ userId: user._id }, "my_secret_key");

      // Stocker le token JWT dans un cookie HTTP Only
      ctx.cookies.set("token", token, { httpOnly: true, secure: false });

      ctx.body = { success: true };
    } catch (err) {
      ctx.status = 400; // Bad Request
      ctx.body = { error: err.message };
    }
  },
};

export default authentificationController;
