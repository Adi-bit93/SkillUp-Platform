import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    school: { 
        type: String, 
        required: true
     }, // or schoolId if using future schema
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true
    },
    points: { 
        type: Number,
        default: 10
     },
    rank: { type: Number }, // can be recalculated daily
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;