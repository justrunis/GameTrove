import { Router } from "express";

import { getUsers, createUser, loginUser } from "../controllers/auth";

const router = Router();

// GET /auth/users
router.get("/users", getUsers);

// POST /auth/register
router.post("/register", createUser);

// POST /auth/login
router.post("/login", loginUser);

export default router;
