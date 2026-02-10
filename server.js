import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Hobby from "./models/hobby.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ status: "ok", Message: "server is running" });
});

app.post("/my-hobby", async (req, res) => {
  try {
    const { hobby } = req.body;
    if (!hobby) {
      return res.status(400).json({ message: "hobby is required" });
    }
    const newHobby = await Hobby.create({ hobby });
    res.status(201).json({ message: "hobby added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "serer error" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running  on http://localhost:${PORT}`);
});
