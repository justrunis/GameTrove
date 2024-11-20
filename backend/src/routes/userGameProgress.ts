import { Router } from "express";

import {
  getUserProgressInfo,
  updateUserProgressInfo,
  getUsersReviews,
} from "../controllers/userGameProgress";
import isAuth from "../middleware/is-auth";

const router = Router();

// GET /userGameProgress/:userId
router.get("/:userId", isAuth, getUserProgressInfo);

// GET /userGameProgress/reviews/:id
router.get("/reviews/:id", getUsersReviews);

// PUT /userGameProgress/:userId
router.put("/:userId", isAuth, updateUserProgressInfo);

export default router;
