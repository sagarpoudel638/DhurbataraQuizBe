import express from "express";
import { createQuiz } from "../models/quiz/quizModel.js";

export const router = express.Router();

router.post("/createquiz", async (req,res) => {
    try {
        res.console.log("hello")
    } catch (error) {
        
    }
})

export default router;