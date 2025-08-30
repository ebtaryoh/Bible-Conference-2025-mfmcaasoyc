// client/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAttendee } from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Require at least one: email OR phone
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Register for MFM CYCBC 2025
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email (optional)"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone (optional)"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          {/* Department */}
          <input
            type="text"
            placeholder="Department (optional)"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg shadow-md hover:bg-purple-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
