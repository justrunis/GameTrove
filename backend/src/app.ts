import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "../util/database";
import { Request, Response, NextFunction } from "express";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import userGameProgressRoutes from "./routes/userGameProgress";
import friendRoutes from "./routes/friends";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/userGameProgress", userGameProgressRoutes);
app.use("/friends", friendRoutes);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || "An error occurred.";
  res.status(status).json({ message });
});

connectDB().then(async () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
