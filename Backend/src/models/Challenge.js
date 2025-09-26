import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
    },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["quiz", "task"], // quiz = MCQ, task = real-life activity
      default: "task",
    },
    proofType: {
      type: String,
      enum: ["text", "photo", "quiz"],
      required: true,
    },
    points: {
      type: Number,
      default: 10,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher/admin who created it
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;