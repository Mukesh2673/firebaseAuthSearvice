import express from "express";
import { signUpWithEmail, googleSignIn, emailPasswordSignIn} from "../controllers/authController.js";

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
 *             required:
 *               - email
 *               - password
 *               - displayName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user1235@example.com"
 *                     uid:
 *                       type: string
 *                       example: "OdLVTjv4kFbeL1lzPneKJZv5NHh2"
 *                 message:
 *                   type: string
 *                   example: "John Doe, your Account has been Registered successfully"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (Invalid Input)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email format"
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
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


/**
 * @swagger
 * /auth/email-signin:
 *   post:
 *     summary: Email and Password Sign-In
 *     description: Allows a user to sign in using email and password credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         uid:
 *                           type: string
 *                           example: "OdLVTjv4kFbeL1lzPneKJZv5NHh2"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "user@example.com"
 *                         displayName:
 *                           type: string
 *                           example: "John Doe"
 *                         photoURL:
 *                           type: string
 *                           example: "https://example.com/photo.jpg"
 *                     token:
 *                       type: string
 *                       description: Custom authentication token for client-side verification
 *                       example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Successfully signed in with email and password"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid input or email format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and password are required"
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password"
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Not found - User doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No account exists with this email"
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post("/email-signin", emailPasswordSignIn);


export default router;
