import axios from "axios";

const API = axios.create({
  baseURL: "https://bibleconference2025mfmcyc.onrender.com",
});

// Attendees
export const registerAttendee = (data) => API.post("/attendees/register", data);
export const checkInAttendee = (attendeeId) => API.post(`/attendees/checkin/${attendeeId}`);

// Feedback
export const submitFeedback = (data) => API.post("/feedback", data);

// Stats
export const fetchStats = () => API.get("/stats");
