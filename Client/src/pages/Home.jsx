import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="min-vh-100 bg-light-green d-flex flex-column">
      
      {/* Header Section */}
      <header className="text-center py-5 position-relative">
        <h1 className="display-4 fw-bold text-dark">
          <div>MFMCAASO YOUTH CHURCH</div>
          <span className="text-purple">Bible Conference 2025</span>

        </h1>
                    <div className="text-black fw-bold display-6 ">The Word Equals Life</div>
        <p className="mt-4 mx-auto bg-white p-4 rounded shadow-sm text-dark" style={{ maxWidth: "600px", animation: "fadeIn 1s ease-in-out" }}>
          In the beginning was the Word, and the Word was with God, and the Word was God.
          <br />
          <span className="d-block mt-2">- John 1:1-4</span>
        </p>

        {/* Buttons */}
        <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/register" className="btn btn-lg btn-gradient-purple d-flex align-items-center gap-2">
            Register Now
          </Link>
          <Link to="/checkin" className="btn btn-lg btn-outline-purple d-flex align-items-center gap-2">
            Check-in
          </Link>
        </div>
      </header>

      {/* Info Cards Section */}
      <section className="row row-cols-1 row-cols-md-2 gap-4 px-3 py-5 justify-content-center">
        <div className="col">
          <div className="card text-center shadow-lg animate-card border-0">
            <div className="card-body">
              <span className="text-purple h2"><FaCalendarAlt /></span>
              <h5 className="card-title mt-3">Date</h5>
              <p className="card-text">August 31st, 2025</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-lg animate-card border-0">
            <div className="card-body">
              <span className="text-purple h2"><FaClock /></span>
              <h5 className="card-title mt-3">Time</h5>
              <p className="card-text">7:25 AM Prompt</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-lg animate-card border-0">
            <div className="card-body">
              <span className="text-purple h2"><FaMapMarkerAlt /></span>
              <h5 className="card-title mt-3">Location</h5>
              <p className="card-text">MFM CAASO Youth Auditorium</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-lg animate-card border-0">
            <div className="card-body">
              <span className="text-purple h2"><FaUsers /></span>
              <h5 className="card-title mt-3">Expected</h5>
              <p className="card-text">200+ Youth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple text-light py-5 text-center mt-auto">
        <p>Bible Conference 2025 • MFM CAASO YOUTH CHURCH</p>
        <p>The Word Equals Life</p>
        <p>
          Contact us:{" "}
          <a href="mailto:info@ybc2025.org" className="text-warning text-decoration-underline">
            mfmcaasoyouthchurch.com
          </a>{" "}
          | (+234)8031867487
        </p>
      </footer>

      {/* Custom Styles */}
      <style>{`
        .bg-light-green {
          background-color: #d4edda; /* light green */
        }

        .text-purple {
          color: #6a1b9a; /* contrasting purple */
        }

        .bg-purple {
          background-color: #6a1b9a;
        }

        .btn-gradient-purple {
          background: linear-gradient(90deg, #6a1b9a, #ab47bc);
          color: #fff;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-gradient-purple:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .btn-outline-purple {
          border-color: #6a1b9a;
          color: #6a1b9a;
        }

        .btn-outline-purple:hover {
          background-color: #6a1b9a;
          color: #fff;
        }

        /* Fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-card {
          animation: fadeIn 1s ease-in-out;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.25);
        }

        .card-text {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default Home;
