import React from "react";
import "./Home6.css";

function Home6() {
  return (
    <div className="ovika-connect-main">
      <h2 className="ovika-connect-title">
        Get Connected With <span className="ovika-title-highlight">Ovika</span>
      </h2>
      <div className="ovika-connect-content">
        <div className="ovika-connect-left">
          <div className="ovika-property-graphic"></div>
          <h1 className="ovika-property-heading">
            Turn your property <br />
            into a smart income <br />
            source
          </h1>
          <p className="ovika-property-desc">
            join hundreds of property units who are earning
            with the we handle everything from tenant
            verification to maintenance
          </p>
        </div>
        <div className="ovika-connect-form-wrapper">
          <form className="ovika-connect-form">
            <h2 className="form-heading-ovika-homepage">Contact Us</h2>
            <input
              type="text"
              className="ovika-input"
              placeholder="Your Name"
            />
            <input
              type="email"
              className="ovika-input"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="ovika-input"
              placeholder="Select Property"
            />
            <button className="ovika-submit-btn-homepage">List With Ovika</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home6;
