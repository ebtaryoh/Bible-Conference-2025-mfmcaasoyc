// import express from "express";
// import { Attendee } from "../models/Attendee.js";
// import {
//   generateRegistrationId,
//   pickRandomGroupColor,
//   maskEmail,
//   maskPhone
// } from "../utils/generatedId.js";
// import { sendEmail } from "../services/email.js";

// const router = express.Router();

// /**
//  * POST /api/attendees/register
//  * Body: { name, email, phone, department? }
//  * Creates attendee, assigns registrationId + random group color, emails the user.
//  */
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, phone, department } = req.body || {};
//     if (!name || !email || !phone) {
//       return res.status(400).json({ message: "name, email, phone are required" });
//     }

//     const registrationId = generateRegistrationId("MFMCYCBC25");
//     const groupColor = pickRandomGroupColor();

//     const attendee = await Attendee.create({
//       name,
//       email,
//       phone,
//       department: department || "",
//       registrationId,
//       groupColor
//     });

//     // Email confirmation with registration details
//     const subject = "Your Registration – MFM Youth Bible Conference 2025";
//     const text = `Hello ${name},

// Your registration is confirmed!

// Registration ID: ${registrationId}
// Group Color: ${groupColor.name}

// Date: Sunday, August 31, 2025
// Please keep this ID and show it at the check-in desk.

// Blessings,
// MFM CAASO Youth Church`;
//     const html = `
//       <div style="font-family:Arial,sans-serif;line-height:1.5;">
//         <h2>Registration Confirmed 🎉</h2>
//         <p>Hello <b>${name}</b>,</p>
//         <p>Your registration for <b>MFM Youth Bible Conference 2025</b> is confirmed.</p>
//         <p><b>Registration ID:</b> <code>${registrationId}</code><br/>
//         <b>Group Color:</b> <span style="color:${groupColor.hex};font-weight:bold">${groupColor.name}</span></p>
//         <p><b>Date:</b> Sunday, August 31, 2025</p>
//         <p>Please keep this ID and show it at the check-in desk.</p>
//         <p>Blessings,<br/>MFM CAASO Youth Church</p>
//       </div>`;

//     await sendEmail({ to: email, subject, text, html });

//     res.status(201).json({
//       message: "Registration successful",
//       attendee: {
//         name,
//         email: maskEmail(email),
//         phone: maskPhone(phone),
//         department: attendee.department,
//         registrationId,
//         groupColor
//       }
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Error registering attendee" });
//   }
// });

// /**
//  * GET /api/attendees/:registrationId
//  * Fetch attendee by registrationId (for check-in preview)
//  */
// router.get("/:registrationId", async (req, res) => {
//   try {
//     const attendee = await Attendee.findOne({
//       registrationId: req.params.registrationId
//     }).lean();

//     if (!attendee) return res.status(404).json({ message: "Attendee not found" });

//     res.json({
//       name: attendee.name,
//       email: maskEmail(attendee.email),
//       phone: maskPhone(attendee.phone),
//       department: attendee.department,
//       registrationId: attendee.registrationId,
//       groupColor: attendee.groupColor,
//       checkedIn: attendee.checkedIn,
//       checkedInAt: attendee.checkedInAt
//     });
//   } catch (err) {
//     console.error("Fetch attendee error:", err);
//     res.status(500).json({ message: "Error fetching attendee" });
//   }
// });

// /**
//  * POST /api/attendees/checkin
//  * Body: { registrationId }
//  * Marks attendee as checked in
//  */
// router.post("/checkin", async (req, res) => {
//   try {
//     const { registrationId } = req.body || {};
//     if (!registrationId) {
//       return res.status(400).json({ message: "registrationId is required" });
//     }

//     const attendee = await Attendee.findOne({ registrationId });
//     if (!attendee) return res.status(404).json({ message: "Attendee not found" });

//     if (!attendee.checkedIn) {
//       attendee.checkedIn = true;
//       attendee.checkedInAt = new Date();
//       await attendee.save();
//     }

//     res.json({
//       message: attendee.checkedIn ? "Check-in successful" : "Already checked in",
//       attendee: {
//         name: attendee.name,
//         email: maskEmail(attendee.email),
//         phone: maskPhone(attendee.phone),
//         registrationId: attendee.registrationId,
//         groupColor: attendee.groupColor,
//         checkedIn: attendee.checkedIn,
//         checkedInAt: attendee.checkedInAt
//       }
//     });
//   } catch (err) {
//     console.error("Check-in error:", err);
//     res.status(500).json({ message: "Error during check-in" });
//   }
// });

// export default router;

// // server/src/routes/attendees.js
// import express from "express";
// import { Attendee } from "../models/Attendee.js";
// import {
//   generateRegistrationId,
//   pickRandomGroupColor,
//   maskEmail,
//   maskPhone,
// } from "../utils/generateId.js"; // NOTE: fixed filename from generatedId.js → generateId.js
// import { sendEmail } from "../services/email.js";

// const router = express.Router();

// // POST /api/attendees/register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, phone, department } = req.body || {};

//     // Validation: name is required + (email or phone)
//     if (!name || (!email && !phone)) {
//       return res
//         .status(400)
//         .json({ message: "Name and at least one of email or phone are required." });
//     }

//     const registrationId = generateRegistrationId("MFMCYCBC25");
//     const groupColor = pickRandomGroupColor();

//     const attendee = await Attendee.create({
//       name,
//       email: email || "",
//       phone: phone || "",
//       department: department || "",
//       registrationId,
//       groupColor,
//     });

//     // Send email ONLY if user provided email
//     if (email) {
//       const subject = "Your Registration – MFM Youth Bible Conference 2025";
//       const text = `Hello ${name},

// Your registration is confirmed!

// Registration ID: ${registrationId}
// Group Color: ${groupColor.name}

// Date: Sunday, August 31, 2025
// Please keep this ID and show it at the check-in desk.

// Blessings,
// MFM CAASO Youth Church`;

//       const html = `
//         <div style="font-family:Arial,sans-serif;line-height:1.5;">
//           <h2>Registration Confirmed 🎉</h2>
//           <p>Hello <b>${name}</b>,</p>
//           <p>Your registration for <b>MFM Youth Bible Conference 2025</b> is confirmed.</p>
//           <p><b>Registration ID:</b> <code>${registrationId}</code><br/>
//           <b>Group Color:</b> <span style="color:${groupColor.hex};font-weight:bold">${groupColor.name}</span></p>
//           <p><b>Date:</b> Sunday, August 31, 2025</p>
//           <p>Please keep this ID and show it at the check-in desk.</p>
//           <p>Blessings,<br/>MFM CAASO Youth Church</p>
//         </div>`;

//       await sendEmail({ to: email, subject, text, html });
//     }

//     res.status(201).json({
//       message: "Registration successful",
//       attendee: {
//         name,
//         email: email ? maskEmail(email) : null,
//         phone: phone ? maskPhone(phone) : null,
//         department: attendee.department,
//         registrationId,
//         groupColor,
//       },
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Error registering attendee" });
//   }
// });

// export default router;

// server/src/routes/attendees.js
import express from "express";
import { Attendee } from "../models/Attendee.js";
import {
  generateRegistrationId,
  pickRandomGroupColor,
  maskEmail,
  maskPhone,
} from "../utils/generateId.js"; // fixed filename
import { sendEmail } from "../services/email.js";

const router = express.Router();

/**
 * POST /api/attendees/register
 * Body: { name, email?, phone?, department? }
 * Creates attendee, assigns registrationId + random group color, emails the user.
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, department } = req.body || {};

    // Validation: name is required, plus at least email or phone
    if (!name || (!email && !phone)) {
      return res.status(400).json({
        message: "Name and at least one of email or phone are required.",
      });
    }

    const registrationId = generateRegistrationId("MFMCYCBC25");
    const groupColor = pickRandomGroupColor();

    const attendee = await Attendee.create({
      name,
      email: email || "",
      phone: phone || "",
      department: department || "",
      registrationId,
      groupColor,
    });

    // Send confirmation email if user gave email
    if (email) {
      const subject =
        "Your Registration – MFMCAASO Youth Church Bible Conference 2025";
      const text = `Hello ${name},

Your registration is confirmed!

Registration ID: ${registrationId}
Group Color: ${groupColor.name}

Date: Sunday, August 31, 2025
Please keep this ID and show it at the check-in desk.

God bless you,
MFM CAASO Youth Church`;

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.5;">
          <h2>Registration Confirmed 🎉</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Your registration for <b>MFMCAASO Youth Church Bible Conference 2025</b> is confirmed.</p>
          <p><b>Registration ID:</b> <code>${registrationId}</code><br/>
          <b>Group Color:</b> <span style="color:${groupColor.hex};font-weight:bold">${groupColor.name}</span></p>
          <p><b>Date:</b> Sunday, August 31, 2025</p>
          <p>Please keep this ID and show it at the check-in desk.</p>
          <p>Blessings,<br/>MFM CAASO Youth Church</p>
        </div>`;

      await sendEmail({ to: email, subject, text, html });
    }

    res.status(201).json({
      message: "Registration successful",
      attendee: {
        name,
        email: email ? maskEmail(email) : null,
        phone: phone ? maskPhone(phone) : null,
        department: attendee.department,
        registrationId,
        groupColor,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Error registering attendee" });
  }
});

/**
 * GET /api/attendees/:registrationId
 * Fetch attendee by registrationId (useful for check-in preview)
 */
router.get("/:registrationId", async (req, res) => {
  try {
    const attendee = await Attendee.findOne({
      registrationId: req.params.registrationId,
    }).lean();

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json({
      name: attendee.name,
      email: maskEmail(attendee.email),
      phone: maskPhone(attendee.phone),
      department: attendee.department,
      registrationId: attendee.registrationId,
      groupColor: attendee.groupColor,
      checkedIn: attendee.checkedIn,
      checkedInAt: attendee.checkedInAt,
    });
  } catch (err) {
    console.error("Fetch attendee error:", err);
    res.status(500).json({ message: "Error fetching attendee" });
  }
});

/**
 * POST /api/attendees/checkin
 * Body: { registrationId }
 * Marks attendee as checked in
 */
router.post("/checkin", async (req, res) => {
  try {
    const { registrationId } = req.body || {};
    console.log("👉 Received registrationId:", registrationId);

    if (!registrationId) {
      return res.status(400).json({ message: "registrationId is required" });
    }

    const attendee = await Attendee.findOne({ registrationId });
    console.log("Database query result:", attendee); // Log query result

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    if (!attendee.checkedIn) {
      attendee.checkedIn = true;
      attendee.checkedInAt = new Date();
      await attendee.save();
    }

    res.json({
      message: attendee.checkedIn
        ? "Check-in successful"
        : "Already checked in",
      attendee: {
        name: attendee.name,
        email: maskEmail(attendee.email),
        phone: maskPhone(attendee.phone),
        registrationId: attendee.registrationId,
        groupColor: attendee.groupColor,
        checkedIn: attendee.checkedIn,
        checkedInAt: attendee.checkedInAt,
      },
    });
  } catch (err) {
    console.error("Check-in error:", err);
    res
      .status(500)
      .json({ message: "Error during check-in", error: err.message || err });
  }
});

export default router;
