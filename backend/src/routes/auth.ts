import { Router } from "express";

import { getUsers, createUser, loginUser } from "../controllers/auth";
import isAuth from "../middleware/is-auth";
import isAdmin from "../middleware/is-admin";

const router = Router();

// GET /auth/users
router.get("/users", isAuth, isAdmin, getUsers);

// POST /auth/register
router.post("/register", createUser);

// POST /auth/login
router.post("/login", loginUser);

export default router;
