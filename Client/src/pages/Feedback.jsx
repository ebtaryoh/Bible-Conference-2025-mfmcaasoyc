import { useState } from "react";
import { submitFeedback } from "../services/api";
import { CheckCircle2, XCircle } from "lucide-react";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFeedback(form);
      setMessage({
        type: "success",
        text: "✅ Feedback submitted! Thank you 🙏",
      });
      setForm({ name: "", email: "", rating: "", comments: "" });
    } catch {
      setMessage({
        type: "danger",
        text: "❌ Failed to submit feedback. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}
    >
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-success fw-bold mb-4">
          Share Your Feedback ✨
        </h2>

        {message && (
          <div className={`alert alert-${message.type} text-center py-2 d-flex align-items-center justify-content-center`} role="alert">
            {message.type === "success" ? <CheckCircle2 className="me-2" /> : <XCircle className="me-2" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control form-control-lg border-success"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg border-success"
              placeholder="Email"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Rate Your Experience</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setForm({ ...form, rating: num })}
                  className={`btn flex-grow-1 ${
                    form.rating === num ? "btn-success text-white" : "btn-outline-success"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-3">
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              rows="4"
              className="form-control form-control-lg border-success"
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 btn-lg shadow-sm"
            style={{ transition: "all 0.3s ease" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        <p className="mt-3 text-center text-light small">
          Your feedback helps us improve our event experience!
        </p>
      </div>
    </div>
  );
}

export default Feedback;
