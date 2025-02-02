import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  question: {
    en: { type: String, required: true },
    np: { type: String, required: true }
  },
  options: [{
    en: { type: String, required: true },
    np: { type: String, required: true }
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return value < this.options.length;
      },
      message: props => `Correct answer index ${props.value} is out of options range`
    }
  },
  points: {
    type: Number,
    default: 1,
    min: 0
  }
});

const quizSchema = new Schema({
  title: {
    en: { type: String, required: true },
    np: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    np: { type: String, required: true }
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number,
    min: 0,
    default: 600 // 10 minutes default
  },
  totalMarks: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true 
});

// Calculate total marks before saving
quizSchema.pre('save', function(next) {
  this.totalMarks = this.questions.reduce((sum, question) => sum + question.points, 0);
  next();
});

// Add index for better query performance
quizSchema.index({ createdBy: 1, isActive: 1 });

export default model('Quiz', quizSchema);