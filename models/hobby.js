import mongoose from "mongoose";

// Schema
const hobbySchema = new mongoose.Schema(
  {
    hobby: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Hobby = mongoose.model("Hobby", hobbySchema);

export default Hobby;
