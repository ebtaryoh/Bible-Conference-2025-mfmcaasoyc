import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { MONGO_URI, PORT } from "./src/config.js";
import attendeesRoutes from "./src/routes/attendees.js";
import feedbackRoutes from "./src/routes/feedback.js";
import statsRoutes from "./src/routes/stats.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bible-conference-2025-mfmcaasoyc-xe.vercel.app", // frontend Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Middleware to parse JSON
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/api/attendees", attendeesRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/stats", statsRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
