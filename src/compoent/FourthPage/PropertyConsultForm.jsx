import React, { useState } from 'react';
import './PropertyConsultForm.css';
import heroPropertyImg from '/image 297.png'; // Apna image path yaha update karna

const PropertyConsultForm = () => {
  const [formInputs, setFormInputs] = useState({
    fullName: '',
    contactNumber: '',
    emailId: '',
    propertyDetails: ''
  });

  const handleInputChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formInputs);
    // Yaha apna form submission logic add karna (API call, etc.)
    alert('Form submitted successfully!');
  };

  return (
    <div className="property-consult-wrapper">
      {/* Top Heading Section */}
      <h1 className="main-page-title">
        Start sharing your property with <span className="brand-highlight">Ovika</span> today!
      </h1>
      <p className="main-page-subtitle">
        Ready to unlock your property potential? Choose your preferred way to connect with us below
      </p>

      {/* Hero Section with Form */}
      <div className="hero-form-container">
        {/* Left Side Text */}
        <div className="hero-text-content">
          <h2 className="hero-main-heading">Ready to Unlock your property's Potential</h2>
          <p className="hero-description">
            Fill out the form to schedule a free non obligation consultation with one of our property experts.
          </p>
        </div>

        {/* Right Side Form Card */}
        <div className="consultation-form-card">
          <form onSubmit={handleFormSubmit} className="consult-form">
            <input
              type="text"
              name="fullName"
              className="form-input-field"
              placeholder="Your Name"
              value={formInputs.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="contactNumber"
              className="form-input-field"
              placeholder="Phone Number"
              value={formInputs.contactNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="emailId"
              className="form-input-field"
              placeholder="Email Address"
              value={formInputs.emailId}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="propertyDetails"
              className="form-textarea-field"
              placeholder="Tell us about your Property ( Optional )"
              value={formInputs.propertyDetails}
              onChange={handleInputChange}
              rows="4"
            />
            <button type="submit" className="form-submit-btn">
              Request Free Consultation
            </button>
          </form>
        </div>

        {/* Background Property Image */}
        <img src={heroPropertyImg} alt="Modern Property" className="hero-background-img" />
      </div>
    </div>
  );
};

export default PropertyConsultForm;