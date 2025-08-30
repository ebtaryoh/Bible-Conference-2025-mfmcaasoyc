import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config.js";

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

export async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"MFM CAASO Youth – Bible Conf 2025" <${EMAIL_CONFIG.auth.user}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
