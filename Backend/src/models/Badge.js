import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Badge name required"],
      unique: true,
    },
    description: { type: String },
    criteria: {
      type: String, // e.g. "100 points", "10 challenges completed"
      required: true,
    },
    icon: {
      type: String, // store URL of badge image/icon
    },
  },
  { timestamps: true }
);

const Badge = mongoose.model("Badge", badgeSchema);
export default Badge;