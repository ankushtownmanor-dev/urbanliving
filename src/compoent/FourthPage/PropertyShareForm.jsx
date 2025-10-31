import React from "react";
import "./PropertyShareForm.css";

const PropertyShareForm = () => (
  <div className="property-share-wrapper">
    <h1 className="main-heading-selfmanage">Start Listing your property with Ovika today !</h1>
    <p className="sub-heading">
    Ready to rent out your home or investment property? Connect with us below — our team <br/>will help you list your property, attract verified tenants, and start earning faster.
    </p>

    <div className="form-office-container">
      {/* Form Section */}
      <div className="form-section">
        <h2 className="section-heading-selfmanage">Fill out the form</h2>
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
        <h2 className="section-heading-two">Or visit our office</h2>
        <p className="office-desc">
      We'd love to meet you in person and guide you through the simple process of listing your property on Ovika.<br/>

Our team will help you verify your property details, upload listings, and showcase your space to qualified tenants.  <br/>

Let's make renting effortless and profitable for <br/> you.
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
