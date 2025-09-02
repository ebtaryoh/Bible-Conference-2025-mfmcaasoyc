import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attendees
export const registerAttendee = (data) => API.post("/attendees/register", data);

export const checkInAttendee = (attendeeId) =>
  API.post("/attendees/checkin", { registrationId: attendeeId });
// Feedback
export const submitFeedback = (data) => API.post("/feedback", data);

// Stats
export const fetchStats = () => API.get("/stats");
