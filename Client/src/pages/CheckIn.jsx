import { useState } from "react";
import { checkInAttendee } from "../services/api";

function CheckIn() {
  const [attendeeId, setAttendeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [attendee, setAttendee] = useState(null); // NEW state for attendee data

  const handleCheckIn = async () => {
    if (!attendeeId.trim()) {
      setMessage({ type: "danger", text: "Please enter your Registration ID." });
      return;
    }

    try {
      setLoading(true);
      const res = await checkInAttendee(attendeeId);

      setMessage({
        type: res.data.message === "Already checked in" ? "warning" : "success",
        text: `✅ Welcome, ${res.data.attendee.name}! ${res.data.message}`,
      });

      setAttendee(res.data.attendee); // Save attendee info
      setAttendeeId("");
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Check-in failed.",
      });
      setAttendee(null); // clear attendee info if error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}
    >
      <div
        className="card shadow-lg rounded-4 p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center text-success fw-bold mb-4">
          Attendee Check-In
        </h2>

        {message && (
          <div
            className={`alert alert-${message.type} text-center py-2`}
            role="alert"
          >
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
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "Checking in..." : "Check In"}
        </button>

        <p className="mt-3 text-center text-muted small">
          Please show your Registration ID at the desk after check-in.
        </p>

        {/* NEW: Attendee Info Card */}
        {attendee && (
          <div className="mt-4 p-3 border rounded bg-light shadow-sm">
            <h5 className="text-success fw-bold text-center mb-3">
              Attendee Information
            </h5>
            <p><b>Name:</b> {attendee.name}</p>
            <p><b>Department:</b> {attendee.department || "N/A"}</p>
            <p><b>Registration ID:</b> {attendee.registrationId}</p>
            <p>
              <b>Group:</b>{" "}
              <span style={{ color: attendee.groupColor?.hex }}>
                {attendee.groupColor?.name}
              </span>
            </p>
            <p>
              <b>Status:</b>{" "}
              {attendee.checkedIn
                ? `✅ Checked In at ${new Date(
                    attendee.checkedInAt
                  ).toLocaleString()}`
                : "❌ Not Checked In"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckIn;
