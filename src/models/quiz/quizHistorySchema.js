import mongoose, { Schema } from 'mongoose';



const QuizHistorySchema = new Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Student
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to Quiz
    score: { type: Number, required: true }, // Score achieved
    attemptedDate: { type: Date, default: Date.now }, // Timestamp for quiz attempt
    status: { type: String, enum: ['completed', 'incomplete'], required: true }, // Attempt status
    timeTaken: { type: Number, default: 0 }, // Time taken in seconds
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const QuizHistory = mongoose.model("quizhistory", QuizHistorySchema);