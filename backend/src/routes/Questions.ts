import question from "../models/question";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { verifyJWT } from "../middlewares/verifyJWT";
const Questions = express.Router();

// POST endpoint to save a new question
Questions.post("/", verifyJWT, async (req: Request, res: Response) => {
  try {
    const { userId, title, link, difficulty, code, notes, category } = req.body;

    const newQuestion = new question({
      userId,
      title,
      link,
      difficulty,
      code,
      notes,
      category,
    });

    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .json({ message: "Question saved successfully", id: savedQuestion._id });
  } catch (err) {
    res.status(500).json({ message: "Error saving question", error: err });
  }
});

// GET endpoint to fetch questions by userId
Questions.get(
  "/",
  verifyJWT,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId } = req.query; // Use req.query for GET requests

      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
      }

      // Query the database for questions based on userId
      const userQuestions = await question.find({ userId });

      // If no questions are found
      if (userQuestions.length === 0) {
        return res
          .status(404)
          .json({ message: "No questions found for this user" });
      }

      // Respond with the found questions
      res.status(200).json(userQuestions);
    } catch (err) {
      res.status(500).json({ message: "Error fetching questions", error: err });
    }
  }
);

Questions.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    // Validate id format first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const foundQuestion = await question.findById(id);

    if (!foundQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(foundQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question", error: err });
  }
});

Questions.put(
  "/:id",
  verifyJWT,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      // Validate id format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      // Destructure updated fields from request body
      const { title, link, difficulty, code, notes, category } = req.body;

      // Find and update the question
      const updatedQuestion = await question.findByIdAndUpdate(
        id,
        { title, link, difficulty, code, notes, category },
        { new: true, runValidators: true } // Return the updated document and run schema validators
      );

      // If the question is not found
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Send the updated document in response
      res
        .status(200)
        .json({
          message: "Question updated successfully",
          question: updatedQuestion,
        });
    } catch (err) {
      res.status(500).json({ message: "Error updating question", error: err });
    }
  }
);

export default Questions;
