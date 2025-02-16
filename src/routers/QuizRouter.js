import express from "express";
import { createQuiz, getallQuiz } from "../models/quiz/quizModel.js";

export const router = express.Router();

router.post("/createquiz", async (req, res) => {
    try {
      const quizData = req.body;
      const NewQuizData = await createQuiz(quizData);
      res.status(201).json({ message: "Quiz created successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.get("/allquiz", async (req,res)=>{
    try {
        let data = await getallQuiz();
        let quizData = [...data]

        const respObj = {
            status: "success",
            message: "All Transactions fetched",
            data: quizData,
          };
          return res.status(200).send(respObj);
    } catch (error) {
        const errObj = {
            status: "error",
            message: "Error fetching",
            error: {
              code: 500,
              details: error.message || "Error fetching quiz",
            },
          };
        res.status(500).send(errObj);
    }
})

export default router;
