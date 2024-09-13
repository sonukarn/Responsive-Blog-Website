import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/", Router);
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT} `);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
