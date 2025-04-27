'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Academics
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/academics/curriculum" className="dropdown-item">
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/academics/teachers" className="dropdown-item">
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link href="/academics/facilities" className="dropdown-item">
                    Facilities
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/admission" className="nav-link">
                Admission
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link href="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 