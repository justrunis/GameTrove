import { Router } from "express";
import { IUser } from "../models/user";

import { getUsers } from "../controllers/user";

const router = Router();

router.get("/", getUsers);

export default router;
