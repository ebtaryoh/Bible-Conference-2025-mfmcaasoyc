import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function Home() {
  return (
    <div className="container-fluid bg-light">

      {/* Header Section */}
      <header className="text-center py-5 bg-primary text-white">
        <h1 className="display-4">MFMCAASO Youth CHURCH  <span className="text-warning">Bible Conference2025</span></h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted bg-warning p-4 rounded-lg shadow-sm">
          In the beginning was the Word, and the Word was with God, and the Word was God.
          <br />
          <span className="d-block mt-2 text-sm">- John 1:1-4</span>
        </p>

        {/* Buttons */}
        <div className="mt-5 d-flex justify-content-center gap-4">
          <Link to="/register" className="btn btn-lg btn-primary">Register Now</Link>
          <Link to="/checkin" className="btn btn-lg btn-outline-warning">Check-in</Link>
        </div>
      </header>

      {/* Info Cards Section */}
      <section className="row row-cols-1 row-cols-md-4 gap-4 px-3 py-5">
        <div className="col">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <span className="text-primary h2">📅</span>
              <h5 className="card-title mt-3">Date</h5>
              <p className="card-text">August 31st, 2025</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <span className="text-primary h2">⏰</span>
              <h5 className="card-title mt-3">Time</h5>
              <p className="card-text">7:25 AM Prompt</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <span className="text-primary h2">📍</span>
              <h5 className="card-title mt-3">Location</h5>
              <p className="card-text">MFM CAASO Youth Auditorium</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <span className="text-primary h2">👥</span>
              <h5 className="card-title mt-3">Expected</h5>
              <p className="card-text">200+ Youth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-6 text-center">
        <p className="text-sm">
          Bible Conference 2025 • MFM CAASO YOUTH CHURCH
        </p>
        <p className="text-sm">
          The Word Equals Life
        </p>
        <p className="text-sm">
          Contact us:{" "}
          <a href="mailto:info@ybc2025.org" className="text-light underline">
            mfmcaasoyouthchurch.com
          </a>{" "}
          | (+234)8031867487
        </p>
      </footer>
    </div>
  );
}

export default Home;
