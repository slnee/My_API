import { Router } from "express";
const router = Router();

import {
  getPhobies,
  getPhobie,
  addPhobie,
  updatePhobie,
  deletePhobie
} from "../controllers/phobieController.js";

import checkAdmin from "../middleware/authMiddleware.js";

/**
 * @swagger
 * /api/phobies:
 *   get:
 *     summary: Récupérer la liste des phobies
 *     tags: [Phobies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de la page
 *     responses:
 *       200:
 *         description: Liste des phobies
 */
router.get("/", getPhobies);

/**
 * @swagger
 * /api/phobies/{id}:
 *   get:
 *     summary: Récupérer une phobie avec son id
 *     tags: [Phobies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Phobie trouvée
 *       404:
 *         description: Phobie introuvable
 */
router.get("/:id", getPhobie);

/**
 * @swagger
 * /api/phobies:
 *   post:
 *     summary: Ajouter une phobie
 *     tags: [Phobies]
 *     responses:
 *       201:
 *         description: Phobie ajoutée
 *       400:
 *         description: Champs manquants
 */
router.post("/", checkAdmin, addPhobie);

/**
 * @swagger
 * /api/phobies/{id}:
 *   put:
 *     summary: Modifier une phobie
 *     tags: [Phobies]
 *     responses:
 *       200:
 *         description: Phobie modifiée
 */
router.put("/:id", checkAdmin, updatePhobie);

/**
 * @swagger
 * /api/phobies/{id}:
 *   delete:
 *     summary: Supprimer une phobie
 *     tags: [Phobies]
 *     responses:
 *       200:
 *         description: Phobie supprimée
 */
router.delete("/:id", checkAdmin, deletePhobie);

export default router;