import mongoose, { Schema } from "mongoose";

// Schema for quizzes taken by the user
const QuizResultSchema = new Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to the Quiz
  score: { type: Number, required: true }, // Score achieved in the quiz
  takenDate: { type: Date, default: Date.now }, // Date the quiz was taken
});

// Define the user schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the student
    email: { type: String, required: true, unique: true }, // Unique email address
    phoneNumber: { type: String, match: /^[0-9]{10}$/, sparse: true }, // Optional phone number validation
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ['student', 'admin'], default: 'student' }, // User role
    isVerified: { type: Boolean, default: false }, // Email verification status
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Account status
    quizzesTaken: { type: [QuizResultSchema], default: [] }, // Array of quizzes taken
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);



export const User = mongoose.model("user", UserSchema);


