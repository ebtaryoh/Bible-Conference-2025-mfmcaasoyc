import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    registrationId: { type: String }, // optional linkage
    name: { type: String },
    email: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
