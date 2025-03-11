import express from "express";
import { signUpWithEmail, googleSignIn } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup with Email and Password
 *     description: Allows a user to sign up using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               displayName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request (Invalid Input)
 */
router.post("/signup", signUpWithEmail);

/**
 * @swagger
 * /auth/google-signin:
 *   post:
 *     summary: Google Sign-In
 *     description: Allows a user to sign in using Google authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: "google_id_token"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Invalid token or request
 */
router.post("/google-signin", googleSignIn);

export default router;
