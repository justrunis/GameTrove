import { Router } from "express";
import { getFriends } from "../controllers/friends";
import isAuth from "../middleware/is-auth";

const router = Router();

// GET /friends
router.get("/", isAuth, getFriends);

// GET /friends/suggested
router.get("/suggested", (req, res) => {
  res.send("Get suggested friends");
});

// GET /friends/list
router.get("/list", (req, res) => {
  res.send("Get friends list");
});

// GET /friends/requests
router.get("/requests", (req, res) => {
  res.send("Get friend requests");
});

// POST /friends
router.post("/", (req, res) => {
  res.send("Add a friend");
});

// PUT /friends/:id
router.put("/:id", (req, res) => {
  res.send("Update friend");
});

// DELETE /friends/:id
router.delete("/:id", (req, res) => {
  res.send("Delete friend");
});

// DELETE /friends/delete/:id
router.delete("/delete/:id", (req, res) => {
  res.send("Delete friend");
});

// GET /friends/profile/:id
router.get("/profile/:id", (req, res) => {
  res.send("Get friend profile");
});

export default router;
