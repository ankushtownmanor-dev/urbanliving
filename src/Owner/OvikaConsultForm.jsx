import React, { useState } from 'react';
import './OvikaConsultForm.css';

const OvikaConsultForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="ovika-consult-wrapper">
      {/* Header */}
      <div className="ovika-consult-top-header">
        <h2 className="ovika-consult-heading">
          Start sharing your property with <span className="ovika-text-orange">Ovika</span> today !
        </h2>
        <p className="ovika-consult-subtext">
          Ready to unlock your property potential? Choose your preferred way to connect with us below.
        </p>
      </div>

      {/* Hero Image + Content Overlay */}
      <div className="ovika-consult-hero">
        <img
          src="/Group191.png"
          alt="Property Consultation"
          className="ovika-consult-hero-img"
        />

        <div className="ovika-consult-overlay-content">
          {/* Left Text */}
          <div className="ovika-consult-left-text">
            <h3 className="ovika-consult-main-title">
              Ready to Unlock your property’s Potential
            </h3>
            <p className="ovika-consult-desc">
              Fill out the form to schedule a free non obligation consultation with one of our property experts.
            </p>
          </div>

          {/* Form directly on image */}
          <form className="ovika-consult-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="ovika-consult-input"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="ovika-consult-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="ovika-consult-input"
              required
            />
            <textarea
              name="message"
              placeholder="Tell us about your Property ( Optional )"
              value={formData.message}
              onChange={handleChange}
              className="ovika-consult-textarea"
            ></textarea>

            <button type="submit" className="ovika-consult-btn">
              Request Free Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OvikaConsultForm;