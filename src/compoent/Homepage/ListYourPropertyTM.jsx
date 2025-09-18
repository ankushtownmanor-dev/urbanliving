import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListYourPropertyTM.css";
import { IoArrowForward } from "react-icons/io5";

const ListYourPropertyTM = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    enterCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // ✔️ Backend API / Email service integration here
  };

  const handleListPropertyClick = () => {
    navigate('/list-property');
  };

  return (
    <div className="tm-list-container">
      {/* Header Section */}
      <div className="tm-list-header">
        <h1 className="tm-list-main-title">
          Elevate Your Property into a Premium Rental with Ovika Living
        </h1>
        <p className="tm-list-subtitle">
          Showcase your property to the right audience with Ovika – simple, fast, and effective.
        </p>
      </div>

      {/* Hero Section */}
      <div className="tm-list-hero">
        <div className="tm-list-hero-content">
          {/* Left */}
          <div className="tm-list-hero-left">
            <h2 className="tm-list-hero-title">
              List with Ovika,<br />
              Earn with Ease –<br />
              Begin Your Journey<br />
              Today
            </h2>
            <p className="tm-list-hero-description">
              Join Ovika and turn your property into a steady source of income. Whether it's an apartment, PG, or luxury villa, we make renting simple, safe, and rewarding.
            </p>
            <button className="tm-list-hero-button" onClick={handleListPropertyClick}>
              List Your Property <IoArrowForward className="arrow-icon" />
            </button>
          </div>

          {/* Right */}
          <div className="tm-list-hero-right">
            <div className="tm-contact-form">
              <h3 className="tm-contact-title">Contact us</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full name" value={formData.fullName} onChange={handleInputChange} className="tm-form-input" required />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="tm-form-input" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="tm-form-input" required />
                <textarea name="message" placeholder="Message..." value={formData.message} onChange={handleInputChange} className="tm-form-textarea" rows="4" required></textarea>

                {/* Captcha */}
                <div className="tm-form-row">
                  <div className="tm-form-captcha-box">3bcfh</div>
                  <input type="text" name="enterCode" placeholder="Enter code" value={formData.enterCode} onChange={handleInputChange} className="tm-form-input tm-form-code" required />
                </div>

                <button type="submit" className="tm-form-submit">
                  Send Message <IoArrowForward className="arrow-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListYourPropertyTM;