// LuxeHeroTM.jsx
import React from 'react';
import './LuxeHeroTM.css';

export default function LuxeHeroTM() {
  return (
    <section className="tmxluxe2-hero">
      {/* Background image via JSX for better loading behavior */}
      <img
        src="/luxe37.png"   /* change to your actual path */
        alt="Luxurious living room"
        className="tmxluxe2-hero__img"
        loading="eager"
        decoding="async"
      />

      {/* Gradient overlay for legibility */}
      <div className="tmxluxe2-hero__overlay" />

      {/* Content */}
      <div className="tmxluxe2-hero__content">
        {/* Top brand row */}
        <div className="tmxluxe2-brand">
          <span className="tmxluxe2-brand__mark">TM</span>
          <span className="tmxluxe2-brand__text">Luxe</span>
        </div>

        <h1 className="tmxluxe2-heading">
          Where sophistication meets <br />
          ultimate comfort
        </h1>

        <p className="tmxluxe2-subtext">
          TM Luxe offers premium stays designed for travelers seeking elegance, privacy, and personalized service.
          Every space blends modern luxury with warm hospitality, ensuring an unforgettable experience from check‑in
          to check‑out.
        </p>

        {/* Dual CTA pill */}
        <div className="tmxluxe2-cta-pill">
          <a href="#" className="tmxluxe2-cta tmxluxe2-cta--white">
            <span>Book Your Luxury Stay</span>
            <span className="tmxluxe2-cta__arrow">→</span>
          </a>
          <a href="#" className="tmxluxe2-cta tmxluxe2-cta--orange">Now</a>
        </div>
      </div>
    </section>
  );
}