import React from 'react';
import './Owner.css';

export default function Owner() {
  return (
    <section className="ovika-hero">
      {/* Background image rendered via JSX */}
      <img
        className="ovika-hero__bg"
        src="Group 78.png"  /* replace with your exact villa image */
        alt="Modern villa exterior"
        loading="eager"
        decoding="async"
      />

      {/* Overlay for readability */}
      <div className="ovika-hero__overlay" />

      {/* Top badges */}
      <div className="ovika-hero__badges">
        <div className="ovika-badge">
          <span className="ovika-badge__dot" />
          <span className="ovika-badge__text">Verified</span>
        </div>
        <div className="ovika-badge">
          <span className="ovika-badge__dot" />
          <span className="ovika-badge__text">Support</span>
        </div>
        <div className="ovika-badge">
          <span className="ovika-badge__dot" />
          <span className="ovika-badge__text">Hassle free</span>
        </div>
      </div>

      {/* Content */}
      <div className="ovika-hero__content">
        <h1 className="ovika-hero__title">
          Don’t want to mange<br />
          listings ? We will<br />
          <span className="ovika-hero__title--line2">handle it for you.</span>
        </h1>

        <p className="ovika-hero__subtitle">
          Ovika takes the hassle out of property managment, We handle everything from listing and verification
          to tenats mangment , so you can enjoy stress-free earnings.
        </p>

        <button className="ovika-cta">
          Check Out Process
        </button>
      </div>
    </section>
  );
}