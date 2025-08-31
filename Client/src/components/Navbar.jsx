import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-lg py-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-4 text-light">
          MFMCAASOYC BC 2025
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="text-light fs-4">✕</span>
          ) : (
            <span className="text-light fs-4">☰</span>
          )}
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {["Register", "Check-In", "Feedback", "Admin"].map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "")}`}
                  className="nav-link text-light fw-medium px-3 py-2 rounded"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#14532d";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
