import React from "react";
import "./PropertyShareForm.css";

const PropertyShareForm = () => (
  <div className="property-share-wrapper">
    <h1 className="main-heading">Start Listing your property with Ovika today !</h1>
    <p className="sub-heading">
      Ready to unlock your property potential chews your preferred <br/>way to connect with us below
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
        <h2 className="section-heading-two">Our visit our office</h2>
        <p className="office-desc">
       We’d love to meet you in person and help you get started with listing your property for rental management. Visit our OVIKA office to discuss your ready-to-rent space and learn how our expert team can help you earn consistent rental income without the hassle of day-to-day management.
Bring your property details — our specialists will explain how we manage listings, bookings, tenants, and maintenance, ensuring complete transparency and peace of mind. Let’s make your property work for you — easily, efficiently, and profitably!
        </p>
        {/* <div className="address-block">
          
          <div className="address-details">
            <span className="address-title">Our Adress is :</span>
            2nd Floor, Tower B, Logix City Center,<br />
            Sector 32, Noida – 201301,<br />
            Uttar Pradesh, India
          </div>
        </div> */}
  <div className="address-block">
  <div className="address-line"></div>
  <div className="address-container">
    <span className="address-title">Our Address is :</span>
    
      <div>
     ST-304, Eldeco Studio, Sector 93A,<br />
      Noida India, PIN-201304<br />
      Uttar Pradesh, India
    </div>
  </div>
</div>


      
      </div>
    </div>
  </div>
);

export default PropertyShareForm;
