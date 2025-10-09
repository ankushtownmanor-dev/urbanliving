import React from "react";
import "./PropertyShareForm.css";

const PropertyShareForm = () => (
  <div className="property-share-wrapper">
    <h1 className="main-heading">Start sharing your property with Ovika today !</h1>
    <p className="sub-heading">
      Ready to unlock your property potential chews your preferred way to connect with us below
    </p>

    <div className="form-office-container">
      {/* Form Section */}
      <div className="form-section">
        <h2 className="section-heading">Fill out the form</h2>
        <form className="share-form">
          <input type="text" placeholder="Full name" className="input-field" />
          <input type="text" placeholder="Property address" className="input-field" />
          <input type="email" placeholder="Email address" className="input-field" />
          <textarea placeholder="Message..." className="input-field textarea-field" />
          <button className="submit-btn">
            Submit Details
            <span className="arrow">{'>'}</span>
          </button>
        </form>
      </div>

      {/* Office Visit Section */}
      <div className="office-section">
        <h2 className="section-heading">Our visit our office</h2>
        <p className="office-desc">
          We’d love to meet you in person and help you get started on your property’s transformation journey.
          Visit our Ovika office to discuss your space, renovation goals, and earning potential with our expert team.
          Bring your property details – our specialists will walk you through the process, explain profit-sharing options,
          and show how we can turn your unused property into a consistent income source. Let’s build something beautiful
          and profitable together!
        </p>
        <div className="address-block">
          <span className="address-title">Our Adress is :</span>
          <div className="address-details">
            2nd Floor, Tower B, Logix City Center,<br />
            Sector 32, Noida – 201301,<br />
            Uttar Pradesh, India
          </div>
        </div>
        <p className="footnote">
          Please include your contact information, property address, a brief description of the property and any photos. If available we will get back to you within 5-7 business days.
        </p>
      </div>
    </div>
  </div>
);

export default PropertyShareForm;
