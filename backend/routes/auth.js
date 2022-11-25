import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();
router.post("/register", register); //POST http://localhost:8800/api/auth/register
router.post("/login", login); //POST http://localhost:8800/api/auth/login

export default router;
