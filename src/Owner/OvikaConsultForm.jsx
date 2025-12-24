// OvikaConsultForm.jsx
import React, { useState } from 'react';
import './OvikaConsultForm.css';

export default function OvikaConsultForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const onChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="ovk-wrap">
      {/* Top header */}
      {/* <header className="ovk-top">
        <h2 className="ovk-top__title">
          Start sharing your property with <span className="ovk-orange">OvikaLiving</span> today !
        </h2>
        <p className="ovk-top__sub">
          Ready to unlock your property potential? Choose your preferred way to connect with us below
        </p>
      </header> */}

      {/* Hero with overlay */}
      <div className="ovk-hero">
        <img src="/Group191.png" alt="Property Consultation" className="ovk-hero__img" />

        <div className="ovk-hero__overlay">
          {/* Left text block */}
          <div className="ovk-left">
            <h3 className="ovk-left__title">Ready to Unlock your property's Potential with OvikaLiving</h3>
            <p className="ovk-left__desc">
              Fill out the form to schedule a free non obligation consultation with one of our property experts.
            </p>
          </div>

          {/* Right glass card form (desktop) / centered card (mobile) */}
          <form className="ovk-card" onSubmit={onSubmit}>
            <h4 className="ovk-card__title">Contact us</h4>

            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={onChange}
              className="ovk-input"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={onChange}
              className="ovk-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={onChange}
              className="ovk-input"
              required
            />
            <textarea
              name="message"
              placeholder="Tell us about your property"
              value={formData.message}
              onChange={onChange}
              className="ovk-textarea"
              rows={3}
            />

            <button type="submit" className="ovk-cta-varnet">
              <span>Host With  OvikaLiving</span>
              <span className="ovk-cta__arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}