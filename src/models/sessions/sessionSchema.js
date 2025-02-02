import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Student
      token: { type: String, required: true }, // JWT token for the session
      createdAt: { type: Date, default: Date.now }, // Session creation timestamp
      expiresAt: { type: Date, required: true }, // Expiry timestamp for the session
      isActive: { type: Boolean, default: true }, // Session active status
    },
    {
      timestamps: false, // Avoid automatic timestamps since we're handling them manually
    }
  );

  export const Session = mongoose.model("session", SessionSchema)