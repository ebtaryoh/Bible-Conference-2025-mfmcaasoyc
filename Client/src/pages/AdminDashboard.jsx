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
      setStats(data);
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
      <h2 className="text-center fw-bold text-primary mb-4">
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
            className="btn btn-primary w-100"
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
            <h4 className="fw-bold text-success">Statistics Overview</h4>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <StatCard
                title="Total Attendees"
                value={stats.totalRegistered}
                color="bg-primary"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Checked In"
                value={stats.totalCheckedIn}
                color="bg-success"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Feedback Received"
                value={stats.totalFeedback}
                color="bg-warning"
              />
            </div>
          </div>

          {/* Registrations by Color */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="fw-bold text-secondary mb-3">
                Registrations by Group Color
              </h5>
              <ul className="list-group">
                {Object.entries(stats.byColor).map(([color, count]) => (
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
          <div className="card shadow">
            <div className="card-body">
              <h5 className="fw-bold text-secondary mb-3">
                Registrations by Day
              </h5>
              <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                {Object.entries(stats.byDay).map(([day, count]) => (
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
    </div>
  );
}

export default AdminDashboard;