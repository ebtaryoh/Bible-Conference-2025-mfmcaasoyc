// server/src/models/Attendee.js
import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String },
    email: { type: String }, // optional
    phone: { type: String }, // optional

    registrationId: { type: String, unique: true, index: true },
    groupColor: {
      name: String,
      hex: String,
    },

    checkedIn: { type: Boolean, default: false },
    checkedInAt: { type: Date },

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Attendee = mongoose.model("Attendee", AttendeeSchema);
