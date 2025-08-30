import express from "express";
import { Feedback } from "../models/Feedback.js";
import { sendEmail } from "../services/email.js";

const router = express.Router();

/**
 * POST /api/feedback
 * Body: { registrationId?, name, email, rating, comments }
 */
router.post("/", async (req, res) => {
  try {
    const { registrationId, name, email, rating, comments } = req.body || {};
    if (!name || !email || !comments) {
      return res.status(400).json({ message: "name, email, comments are required" });
    }

    await Feedback.create({ registrationId, name, email, rating, comments });

    // Acknowledge via email (optional)
    try {
      await sendEmail({
        to: email,
        subject: "Thanks for your feedback – MFM Youth Bible Conference 2025",
        text: `Dear ${name},\n\nThank you for sharing your feedback. God bless you!`,
        html: `<p>Dear <b>${name}</b>,</p><p>Thank you for sharing your feedback. God bless you!</p>`
      });
    } catch (e) {
      console.warn("Feedback email failed (continuing):", e.message);
    }

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ message: "Error submitting feedback" });
  }
});

export default router;
