import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { hobbyRouter } from "./routes/hobbyRoutes.js";

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

app.use("/api/hobbies", hobbyRouter);

app.listen(PORT, () => {
  console.log(`server is running  on http://localhost:${PORT}`);
});
