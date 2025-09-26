import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    proof: {
      type: String, 
      required: true, // Could be text entry or file URL (photo)
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    pointsAwarded: {
      type: Number,
      default: 0,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher/admin reviewer
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;