import React from "react";
export default function Navbar({ currentUser }) {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          YelpCamp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/campgrounds">
                Campgrounds
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/campgrounds/new">
                New Campground
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!currentUser ? (
              <>
                <a className="nav-link" href="/login">
                  Login
                </a>
                <a className="nav-link" href="/register">
                  Register
                </a>
              </>
            ) : (
              <a className="nav-link" href="/logout">
                Logout
              </a>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
