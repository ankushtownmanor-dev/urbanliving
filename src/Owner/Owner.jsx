// Owner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Owner.css';
import { MdVerified, MdOutlineLoop } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';

export default function Owner() {
  return (
    <section className="ovika-hero">
      {/* Background image */}
      <img
        className="ovika-hero__bg"
        src="Group 78.png"   /* update to your actual path if different */
        alt="Modern villa exterior"
        loading="eager"
        decoding="async"
      />

      {/* Readability overlay */}
      <div className="ovika-hero__overlay" />

      {/* Optional badges (kept from your code) */}
      <div className="ovika-hero__badges">
        <div className="ovika-badge">
          <MdVerified className="ovika-badge__icon" aria-hidden="true" />
          <span className="ovika-badge__text">Verified</span>
        </div>
        <div className="ovika-badge">
          <BiSupport className="ovika-badge__icon" aria-hidden="true" />
          <span className="ovika-badge__text">Support</span>
        </div>
        <div className="ovika-badge">
          <MdOutlineLoop className="ovika-badge__icon" aria-hidden="true" />
          <span className="ovika-badge__text">Hassle free</span>
        </div>
      </div>

      {/* Content */}
      <div className="ovika-hero__content">
        <h1 className="ovika-hero__title">
          Your home,<br />
          Our management-<br />
          <span className="ovika-hero__title--line2">Shared success</span>
        </h1>

        <p className="ovika-hero__subtitle">
          We take care of your rental business end to end, so you earn without the stress
        </p>

        {/* NEW dual-button pill */}
        <div className="ovika-cta-pill">
          <Link to="/properties" className="ovika-cta ovika-cta--white">
            <span>Start Earning</span>
            <span className="ovika-cta__arrow">→</span>
          </Link>
          <Link to="/properties" className="ovika-cta ovika-cta--orange">Now</Link>
        </div>
      </div>
    </section>
  );
}