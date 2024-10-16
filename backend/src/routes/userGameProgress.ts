import { Router } from "express";

import {
  getUserProgressInfo,
  updateUserProgressInfo,
} from "../controllers/userGameProgress";

const router = Router();

// GET /userGameProgress/:userId
router.get("/:userId", getUserProgressInfo);

// PUT /userGameProgress/:userId
router.put("/:userId", updateUserProgressInfo);

export default router;
