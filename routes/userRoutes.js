import { Router } from "express";
const router = Router();

import { login, logout, me } from "../controllers/userController.js";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login", login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Informations sur l utilisateur connecté
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Informations utilisateur
 */
router.get("/me", me);

export default router;