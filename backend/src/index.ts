import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Questions from "./routes/Questions";
import loginRoute from "./routes/Login";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/verifyJWT";

dotenv.config({ path: "../.env" });
const app = express();
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/questions", verifyJWT, Questions);
app.use("/api/auth", loginRoute);

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose  
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
