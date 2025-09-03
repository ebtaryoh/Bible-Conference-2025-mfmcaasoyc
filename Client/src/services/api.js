import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Attendees
export const registerAttendee = (data) => API.post("/attendees/register", data);

export const checkInAttendee = (attendeeId) =>
  API.post("/attendees/checkin", { registrationId: attendeeId });
// Feedback
export const submitFeedback = (data) => API.post("/feedback", data);

// Stats
export const fetchStats = () =>
  API.get("/api/stats", {
    headers: {
      "x-admin-key": import.meta.env.VITE_ADMIN_API_KEY, // frontend env variable
    },
  });