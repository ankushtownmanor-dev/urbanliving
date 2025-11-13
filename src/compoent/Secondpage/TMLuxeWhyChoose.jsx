import React from 'react';
import './tmluxe-why-choose.css';

export default function TMLuxeWhyChoose() {
  return (
    <section className="tmluxe-section" aria-labelledby="tmluxe-title">
      <div className="tmluxe-container">
        <h2 id="tmluxe-title" className="tmluxe-heading">
          Why Choose TM <span className="tmluxe-heading-accent">Luxe</span>
        </h2>

        <div className="tmluxe-grid">
          <article className="tmluxe-card">
            <div className="tmluxe-icon-wrap">
              <img src="/homeluxe1.png" alt="Sophisticated Interiors" className="tmluxe-icon" />
            </div>
            <h3 className="tmluxe-card-title">Sophisticated Interiors</h3>
            <p className="tmluxe-card-text">
              Each apartment is meticulously designed with high-end finishes, modern furnishings, and
              state-of-the-art amenities.
            </p>
          </article>

          <article className="tmluxe-card">
            <div className="tmluxe-icon-wrap">
              <img src="/locationluxe3.png" alt="Prime Location" className="tmluxe-icon" />
            </div>
            <h3 className="tmluxe-card-title">Prime Location</h3>
            <p className="tmluxe-card-text">
              Our apartments are situated in the most desirable neighborhoods, offering easy access
              to key attractions and business centers.
            </p>
          </article>

          <article className="tmluxe-card">
            <div className="tmluxe-icon-wrap">
              <img src="/tmluxe211.png" alt="Exceptional Services" className="tmluxe-icon" />
            </div>
            <h3 className="tmluxe-card-title">Exceptional Services</h3>
            <p className="tmluxe-card-text">
              Enjoy personalized service with dedicated concierge, housekeeping, and maintenance teams
              ensuring a seamless stay.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}