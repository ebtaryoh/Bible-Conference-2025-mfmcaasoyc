import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple-800 shadow-md">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand text-white">
          MFM CYCBC 2025
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/register" className="nav-link text-white">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/checkin" className="nav-link text-white">
                Check-In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link text-white">
                Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-white">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
