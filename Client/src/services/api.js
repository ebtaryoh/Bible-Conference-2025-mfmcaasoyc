import axios from "axios";

const API = axios.create({
  baseURL: "https://bible-conference-2025-mfmcaasoyc.vercel.app/api",
});

// Attendees
export const registerAttendee = (data) => API.post("/attendees/register", data);
export const checkInAttendee = (attendeeId) => API.post("/attendees/checkin", {
  registrationId: attendeeId,  // Send the registrationId in the body
});
// Feedback
export const submitFeedback = (data) => API.post("/feedback", data);

// Stats
export const fetchStats = () => API.get("/stats");
