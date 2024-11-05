import { Router } from "express";

import { createUser, loginUser } from "../controllers/auth";

const router = Router();

// POST /auth/register
router.post("/register", createUser);

// POST /auth/login
router.post("/login", loginUser);

export default router;
