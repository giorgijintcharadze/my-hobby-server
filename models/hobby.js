import mongoose from "mongoose";

// Schema
const hobbySchema = new mongoose.Schema(
  {
    // hobby: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    name: {
      type: String,
      required: [true, " Please write your hobby"],
      maxlenght: [50, "hobby name must contain at least 50 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "please add description"],
      trim: true,
      maxlenght: [500, "maximum 500 characters"],
    },

    category: {
      type: String,
      enum: ["sports, arts, music, gaming, reading, other"],
      default: "other",
    },

    frequency: {
      type: String,
      enum: [" daily, weekly, monthly, rarely"],
      default: "weekly",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Hobby = mongoose.model("Hobby", hobbySchema);

export default Hobby;
