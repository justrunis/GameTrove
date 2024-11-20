import { Router } from "express";

import {
  getUserProgressInfo,
  updateUserProgressInfo,
} from "../controllers/userGameProgress";
import isAuth from "../middleware/is-auth";

const router = Router();

// GET /userGameProgress
router.get("/:userId", isAuth, getUserProgressInfo);

// PUT /userGameProgress/:userId
router.put("/:userId", isAuth, updateUserProgressInfo);

export default router;
