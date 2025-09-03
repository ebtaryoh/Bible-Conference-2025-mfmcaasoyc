import { useState } from "react";
import { fetchStats } from "../services/api";
import StatCard from "../components/StatCard";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // function to load stats
  const loadStats = async (key) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await fetchStats({
        headers: { "x-admin-key": key },
      });
      setStats(data || {}); // ✅ fallback to empty object
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Stats fetch error:", err);
      setError("Invalid admin code or failed to load stats.");
      setStats(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setError("Please enter the admin code.");
      return;
    }
    loadStats(adminKey);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    setStats(null);
  };

  return (
    <div className="container py-5">
      <h2
        className="text-center fw-bold mb-4"
        style={{
          background: "linear-gradient(90deg, #14532d, #22c55e)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: "pulse 2s infinite",
        }}
      >
        Admin Dashboard
      </h2>

      {/* Admin Code Prompt */}
      {!isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="card shadow p-4 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <label className="form-label fw-medium">Enter Admin Code</label>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="form-control mb-3"
            placeholder="Enter admin code"
          />
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "Access Dashboard"}
          </button>
          {error && (
            <p className="mt-3 text-center text-danger fw-semibold">{error}</p>
          )}
        </form>
      )}

      {/* Stats Display */}
      {isAuthenticated && stats && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-success">📊 Statistics Overview</h4>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <StatCard
                title="Total Attendees"
                value={stats.totalRegistered || 0}
                color="bg-primary"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Checked In"
                value={stats.totalCheckedIn || 0}
                color="bg-success"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Feedback Received"
                value={stats.totalFeedback || 0}
                color="bg-warning"
              />
            </div>
          </div>

          {/* Registrations by Color */}
          <div className="card shadow mb-4 animate-card">
            <div className="card-body">
              <h5 className="fw-bold text-secondary mb-3">
                🎨 Registrations by Group Color
              </h5>
              <ul className="list-group">
                {stats.byColor &&
                  Object.entries(stats.byColor).map(([color, count]) => (
                    <li
                      key={color}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{color}</span>
                      <span className="fw-bold">{count}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Registrations by Day */}
          <div className="card shadow animate-card">
            <div className="card-body">
              <h5 className="fw-bold text-secondary mb-3">
                📅 Registrations by Day
              </h5>
              <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                {stats.byDay &&
                  Object.entries(stats.byDay).map(([day, count]) => (
                    <div
                      key={day}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <span>{day}</span>
                      <span className="fw-bold">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
          .animate-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(34, 197, 94, 0.5);
          }
        `}
      </style>
    </div>
  );
}

export default AdminDashboard;
