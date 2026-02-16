import express from "express";
import Hobby from "../models/Hobby.js";

export const hobbyRouter = express.Router();

hobbyRouter.post("/", async (req, res) => {
  try {
    const { name, description, category, frequency } = req.body;
    if (!name) {
      return res.status(400).json({ error: "hobby name is required" });
    }
    const newHobby = await Hobby.create({
      name,
      description,
      category,
      frequency,
    });
    res
      .status(201)
      .json({ message: "hobby added successfully", data: newHobby });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

hobbyRouter.get("/", async (req, res) => {
  try {
    const hobby = await Hobby.find();
    if (!hobby) {
      return res.status(404).json({ message: "no hobby found" });
    }

    res
      .status(200)
      .json({ status: "success", data: hobby, count: hobby.length });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

hobbyRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hobby = await Hobby.findById(id);
    if (!hobby) {
      return res.status(404).json({ message: "hobby not found" });
    }
    res.status(200).json({ status: "success", data: hobby });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

hobbyRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, frequency } = req.body;

    const updatedHobby = await Hobby.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        frequency,
      },
      {
        new: true,
      },
    );
    if (!updatedHobby) {
      return res.status(404).json({ message: "no hobby found" });
    }

    res.status(200).json({
      status: "success",
      message: "hobby updated successfully",
      data: updatedHobby,
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

hobbyRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHobby = await Hobby.findByIdAndDelete(id);
    if (!deleteHobby) {
      return res.status(404).json({ message: "hobby not found" });
    }

    res.status(200).json({
      status: "success",
      data: deleteHobby,
      message: "hobby deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
