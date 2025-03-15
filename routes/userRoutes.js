import express from 'express';
import { currentUserProfile, updateUserProfile } from '../controllers/userController.js'
import { authMiddleware, verifyJwtToken } from '../middlewares/authmiddleware.js';

const router = express.Router();

router.get('/profile', verifyJwtToken, currentUserProfile);
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get User Information by Token
 *     description: Retrieves user information using a Firebase ID token provided in the Authorization header. The token must be sent as a Bearer token in the Authorization header. This endpoint does not accept a request body.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Firebase ID token in Bearer format (e.g., "Bearer your-token-here")
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - data
 *                 - message
 *                 - status
 *                 - success
 *               properties:
 *                 data:
 *                   type: object
 *                   required:
 *                     - user
 *                   properties:
 *                     user:
 *                       type: object
 *                       required:
 *                         - uid
 *                         - email
 *                         - emailVerified
 *                         - displayName
 *                         - photoURL
 *                         - phoneNumber
 *                         - createdAt
 *                         - lastLoginAt
 *                       properties:
 *                         uid:
 *                           type: string
 *                           description: Unique user identifier
 *                           example: "OdLVTjv4kFbeL1lzPneKJZv5NHh2"
 *                         email:
 *                           type: string
 *                           format: email
 *                           description: User's email address
 *                           example: "user@example.com"
 *                         emailVerified:
 *                           type: boolean
 *                           description: Whether the email is verified
 *                           example: true
 *                         displayName:
 *                           type: string
 *                           description: User's display name
 *                           example: "John Doe"
 *                         photoURL:
 *                           type: string
 *                           description: URL to user's profile picture
 *                           example: "https://example.com/photo.jpg"
 *                         phoneNumber:
 *                           type: string
 *                           description: User's phone number
 *                           example: "+1234567890"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Account creation timestamp
 *                           example: "2023-01-01T00:00:00Z"
 *                         lastLoginAt:
 *                           type: string
 *                           format: date-time
 *                           description: Last login timestamp
 *                           example: "2023-05-01T12:00:00Z"
 *                 message:
 *                   type: string
 *                   example: "User information retrieved successfully"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Missing or malformed token in Authorization header
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - error
 *                 - status
 *                 - success
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication token is required in Authorization header"
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - error
 *                 - status
 *                 - success
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired authentication token"
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Not found - User doesn't exist in Firebase or database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - error
 *                 - status
 *                 - success
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found in database"
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Firebase ID token in Bearer format (e.g., "Bearer your-token-here")
 */

router.put('/profile', authMiddleware, updateUserProfile);

export default router;
