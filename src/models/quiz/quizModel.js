import Quiz from "./quizSchema.js"

export const createQuiz = async (quizData) => {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    console.log(`Quiz created with total marks: ${newQuiz.totalMarks}`);
  };

  export const getQuiz = async(id)=>{
    return await Quiz.findById(id);
  }
