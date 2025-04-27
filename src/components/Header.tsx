'use client';

import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header>
      {/* Top Header */}
      <div className="bg-primary py-2">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center">
                <span className="text-white mr-2">
                  <i className="fas fa-phone"></i> +8801916-006330
                </span>
                <span className="text-white">
                  <i className="fas fa-envelope"></i> info@abcschool.edu.bd
                </span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-end">
                <Link href="#" className="text-white mr-2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="text-white mr-2">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="text-white mr-2">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link href="#" className="text-white">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-3">
              <Link href="/" className="d-flex align-items-center">
                <Image
                  src="/images/logo.png"
                  alt="ABC School Logo"
                  width={80}
                  height={80}
                  className="mr-2"
                />
                <div>
                  <h1 className="h4 mb-0">ABC School</h1>
                  <p className="text-muted mb-0">Established in 2025</p>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-9">
              <div className="d-flex justify-content-end">
                <div className="text-center mr-4">
                  <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                  <p className="mb-0">Opening Hours</p>
                  <p className="mb-0">Mon - Fri: 9:00 AM - 4:00 PM</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-map-marker-alt fa-2x text-primary mb-2"></i>
                  <p className="mb-0">Our Location</p>
                  <p className="mb-0">Abc School, Dhaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 