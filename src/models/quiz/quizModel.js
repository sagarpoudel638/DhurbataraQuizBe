import Quiz from "./quizSchema.js"

export const createQuiz = async (quizData) => {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    console.log(`Quiz created with total marks: ${newQuiz.totalMarks}`);
  };

  export const getQuizbyID = async(id)=>{
    return await Quiz.findById(id);
  }

  export const getallQuiz = async()=>{
    return await Quiz.find();
  }

  
