import express from "express";
import { Attendee } from "../models/Attendee.js";
import { Feedback } from "../models/Feedback.js";
import { stringify } from "csv-stringify";
import { ADMIN_API_KEY } from "../config.js";

const router = express.Router();

// simple admin auth via header
function requireAdmin(req, res, next) {
  const key = req.header("x-admin-key");
    console.log("Incoming key:", key);
  console.log("Expected key:", ADMIN_API_KEY);
  if (!ADMIN_API_KEY || key !== ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

/**
 * GET /api/stats
 * Returns totals, color distribution, registrations by day
 */
router.get("/", requireAdmin, async (req, res) => {
  try {
    const totalRegistered = await Attendee.countDocuments();
    const totalCheckedIn = await Attendee.countDocuments({ checkedIn: true });
    const totalFeedback = await Feedback.countDocuments();

    const byColorAgg = await Attendee.aggregate([
      { $group: { _id: "$groupColor.name", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const byColor = {};
    byColorAgg.forEach((c) => (byColor[c._id || "Unknown"] = c.count));

    const byDayAgg = await Attendee.aggregate([
      { $group: {
          _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    const registrationsByDay = byDayAgg.map(d => ({ date: d._id, count: d.count }));

    res.json({ totalRegistered, totalCheckedIn, totalFeedback, byColor, registrationsByDay });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

/**
 * GET /api/stats/attendees.csv
 * CSV export of attendees
 */
router.get("/attendees.csv", requireAdmin, async (req, res) => {
  try {
    const attendees = await Attendee.find().lean();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=\"attendees.csv\"");

    const stringifier = stringify({
      header: true,
      columns: [
        "name",
        "email",
        "phone",
        "department",
        "registrationId",
        "groupColor",
        "checkedIn",
        "checkedInAt",
        "createdAt"
      ]
    });

    stringifier.pipe(res);

    attendees.forEach(a => {
      stringifier.write({
        name: a.name || "",
        email: a.email || "",
        phone: a.phone || "",
        department: a.department || "",
        registrationId: a.registrationId || "",
        groupColor: a.groupColor?.name || "",
        checkedIn: a.checkedIn ? "yes" : "no",
        checkedInAt: a.checkedInAt ? new Date(a.checkedInAt).toISOString() : "",
        createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : ""
      });
    });

    stringifier.end();
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "Error exporting CSV" });
  }
});

export default router;
