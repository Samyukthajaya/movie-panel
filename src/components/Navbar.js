import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/search/${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          🎬 MovieDB
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink end to="/" className={linkClass} onClick={() => setOpen(false)}>
            Popular
          </NavLink>
          <NavLink to="/top-rated" className={linkClass} onClick={() => setOpen(false)}>
            Top Rated
          </NavLink>
          <NavLink to="/upcoming" className={linkClass} onClick={() => setOpen(false)}>
            Upcoming
          </NavLink>

          <form className="search-form" onSubmit={onSubmit} role="search">
            <input
              type="search"
              placeholder="Search movies…"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Search movies"
            />
            <button type="submit">Search</button>
          </form>
        </nav>
      </div>
    </header>
  );
}
