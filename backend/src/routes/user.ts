import { Router } from "express";

import { getUsers, getUserProfile } from "../controllers/user";
import isAuth from "../middleware/is-auth";

const router = Router();

router.get("/", getUsers);

// GET /users/profile
router.get("/profile", isAuth, getUserProfile);

export default router;
