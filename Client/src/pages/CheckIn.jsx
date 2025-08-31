import { useState } from "react";
import { checkInAttendee } from "../services/api";

function CheckIn() {
  const [attendeeId, setAttendeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCheckIn = async () => {
    if (!attendeeId.trim()) {
      setMessage({ type: "danger", text: "Please enter your Registration ID." });
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
        type: "danger",
        text: error.response?.data?.message || "Check-in failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-success fw-bold mb-4">Attendee Check-In</h2>

        {message && (
          <div className={`alert alert-${message.type} text-center py-2`} role="alert">
            {message.text}
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-lg border-success"
            placeholder="Enter Registration ID"
            value={attendeeId}
            onChange={(e) => setAttendeeId(e.target.value)}
          />
        </div>

        <button
          className="btn btn-lg w-100 btn-success shadow-sm"
          disabled={loading}
          onClick={handleCheckIn}
          style={{ transition: "all 0.3s ease" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          {loading ? "Checking in..." : "Check In"}
        </button>

        <p className="mt-3 text-center text-muted small">
          Please show your Registration ID at the desk after check-in.
        </p>
      </div>
    </div>
  );
}

export default CheckIn;
