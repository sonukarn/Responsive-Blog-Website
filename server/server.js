import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*",
  })
);
app.options("*", cors());
app.use(express.json());
app.use("/", Router);
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT} `);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL =
  process.env.MONGODB_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@sonuwebtech.vp1wlb4.mongodb.net/?retryWrites=true&w=majority&appName=sonuWebTech`;
Connection(URL);
