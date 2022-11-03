import express from "express";
import AuthController from "../controllers/controller.auth.js";

const router = express.Router();
const authController = new AuthController();
// Register a new User
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

export default router