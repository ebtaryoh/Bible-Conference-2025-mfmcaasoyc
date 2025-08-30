import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import StatCard from "../components/StatCard";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        // ✅ fetchStats is a GET request, headers go in config
        const { data } = await fetchStats({
          headers: { "x-admin-key": import.meta.env.VITE_ADMIN_API_KEY },
        });
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          Admin Dashboard
        </h2>

        {loading && (
          <p className="text-center text-gray-600 animate-pulse">
            Loading stats...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {stats && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Attendees"
                value={stats.totalRegistered}
                color="bg-blue-500"
              />
              <StatCard
                title="Checked In"
                value={stats.totalCheckedIn}
                color="bg-green-500"
              />
              <StatCard
                title="Feedback Received"
                value={stats.totalFeedback}
                color="bg-purple-500"
              />
            </div>

            {/* Registrations by Color */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Registrations by Group Color
              </h3>
              <ul className="space-y-2">
                {Object.entries(stats.byColor).map(([color, count]) => (
                  <li
                    key={color}
                    className="flex justify-between border-b pb-2 text-gray-600"
                  >
                    <span>{color}</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registrations by Day */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Registrations by Day
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(stats.byDay).map(([day, count]) => (
                  <div
                    key={day}
                    className="flex justify-between border-b pb-2 text-gray-600"
                  >
                    <span>{day}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
