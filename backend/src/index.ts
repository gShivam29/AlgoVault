import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Questions from "./routes/Questions";

dotenv.config({ path: "../.env" });
const app = express();
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/questions", Questions);

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
