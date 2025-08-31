import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://bible-conference-2025-mfmcaasoyc-xe.vercel.app/";
export const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb+srv://ibitayoakinnibosun_db_user:StrongPass123@cluster0.nzgmwt7.mongodb.net/mfmcyc_bible_conference25?retryWrites=true&w=majority&appName=Cluster0";

export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 465),
  secure: process.env.EMAIL_SECURE === "true", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
