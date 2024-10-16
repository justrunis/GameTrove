import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "../util/database";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import userGameProgressRoutes from "./routes/userGameProgress";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/userGameProgress", userGameProgressRoutes);

connectDB().then(async () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
