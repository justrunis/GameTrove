import { Router } from "express";

import {
  getUsers,
  getUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/user";
import isAuth from "../middleware/is-auth";
import isAdmin from "../middleware/is-admin";

const router = Router();

router.get("/", getUsers);

// GET /users/profile
router.get("/profile", isAuth, getUserProfile);

// GET /users
router.get("/", isAuth, isAdmin, getUsers);

// PUT /users/:id
router.put("/:id", isAuth, isAdmin, updateUser);

// DELETE /users/:id
router.delete("/:id", isAuth, isAdmin, deleteUser);

export default router;
