// client/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAttendee } from "../services/api";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaPaperPlane } from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email && !form.phone) {
      setError("Please provide at least an email or phone number.");
      return;
    }

    try {
      await registerAttendee(form);
      navigate("/success");
    } catch (err) {
      setError("Registration failed: " + (err.message || "Try again later."));
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{ background: "linear-gradient(135deg, #9b59b6, #e91e63, #fbc02d)" }}>
      <div className="card shadow-lg rounded-4 p-4 p-md-5 mx-3" style={{ maxWidth: "450px", animation: "fadeIn 1s ease-in-out" }}>
        <h2 className="text-center mb-4 fw-bold text-gradient" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", WebkitBackgroundClip: "text", color: "transparent" }}>
          Register for MFM CYCBC 2025
        </h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {/* Full Name */}
          <div className="mb-3 input-group has-validation">
            <span className="input-group-text bg-purple-500 text-white"><FaUser /></span>
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-info text-white"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Email (optional)"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-success text-white"><FaPhone /></span>
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Department */}
          <div className="mb-4 input-group">
            <span className="input-group-text bg-warning text-white"><FaBuilding /></span>
            <input
              type="text"
              placeholder="Department (optional)"
              className="form-control"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100 py-3 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
          >
            <FaPaperPlane /> Submit
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-gradient {
          background: linear-gradient(90deg, #6a11cb, #2575fc);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}

export default Register;
