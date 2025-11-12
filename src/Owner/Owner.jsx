import React from 'react';
import './Owner.css';
import { MdVerified, MdOutlineLoop } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';

export default function Owner() {
  return (
    <section className="ovika-hero">
      {/* Background image rendered via JSX */}
      <img
        className="ovika-hero__bg"
        src="Group 78.png"  /* replace with your exact villa image path if different */
        alt="Modern villa exterior"
        loading="eager"
        decoding="async"
      />

      {/* Overlay for readability */}
      <div className="ovika-hero__overlay" />

      {/* Top badges */}
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
        <div className="ovika-btn-group">
  <button className="ovika-btn ovika-btn-white">
    Get Started
    <span className="ovika-arrow">→</span>
  </button>
  
  <button className="ovika-btn ovika-btn-orange">
    Free
  </button>
</div>
      </div>
    </section>
  );
}