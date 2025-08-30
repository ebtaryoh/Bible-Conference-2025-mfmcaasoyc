import { useState } from "react";
import { checkInAttendee } from "../services/api";

function CheckIn() {
  const [attendeeId, setAttendeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCheckIn = async () => {
    if (!attendeeId.trim()) {
      setMessage({ type: "error", text: "Please enter your Registration ID." });
      return;
    }

    try {
      setLoading(true);
      const res = await checkInAttendee(attendeeId);
      setMessage({
        type: "success",
        text: `✅ Welcome, ${res.attendee.name}! Check-in successful.`,
      });
      setAttendeeId("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Check-in failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Attendee Check-In
        </h2>

        {message && (
          <div
            className={`p-3 rounded mb-4 text-center text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter Registration ID"
          className="w-full border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none p-3 rounded-lg text-gray-700 placeholder-gray-400 mb-4"
          value={attendeeId}
          onChange={(e) => setAttendeeId(e.target.value)}
        />

        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 transition text-white py-3 rounded-lg font-semibold shadow-md disabled:opacity-60"
        >
          {loading ? "Checking in..." : "Check In"}
        </button>

        <p className="mt-6 text-gray-600 text-sm text-center">
          Please show your Registration ID at the desk after check-in.
        </p>
      </div>
    </div>
  );
}

export default CheckIn;
