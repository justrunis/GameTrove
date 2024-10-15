import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
