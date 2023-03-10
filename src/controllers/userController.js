// Import des modèles Mongoose
import User from "../models/User.js";

// Définition des fonctions du contrôleur
const userController = {
  // Récupération de tous les utilisateurs
  async getAllUsers(ctx) {
    try {
      const users = await User.find({}, { password: 0 });
      ctx.body = users;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // Récupération d'un utilisateur par son identifiant
  async getUserById(ctx) {
    const { id } = ctx.params;
    try {
      const user = await User.findById(id, { password: 0 });
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { message: "Utilisateur non trouvé" };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // Création d'un utilisateur
  async createUser(ctx) {
    const { body } = ctx.request;
    try {
      console.log(body);
      const user = await User.create(body);
      ctx.status = 201;
      ctx.body = user;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // Mise à jour d'un utilisateur
  async updateUser(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    try {
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { message: "Utilisateur non trouvé" };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },

  // Suppression d'un utilisateur
  async deleteUser(ctx) {
    const { id } = ctx.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { message: "Utilisateur non trouvé" };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  },
};

export default userController;
