
import React from "react";
import { ArrowRight } from "lucide-react"; // ✅ import arrow icon
import "./Home6.css";

function Home6() {
  return (
    <div className="ovika-connect-main">
      <div className="ovika-connect-content">
        <div className="ovika-connect-left">
          <div className="ovika-property-graphic"></div>
          <h1 className="ovika-property-heading">
            Turn your property <br />
            into a smart income <br />
            source
          </h1>
          <p className="ovika-property-desc">
            Join hundreds of property owners who are earning with us — we handle
            everything from bookings to guest verification, onboarding, and payouts - we handle it all.
          </p>

          {/* ✅ Property Listing Button with Arrow */}
        <a style={{textDecoration:"none"}} href="/list-property" target="_blank">  <button className="ovika-left-btn-property">
           Host your property <ArrowRight className="ovika-left-btn-arrow" />
          </button></a>
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
              placeholder="Phone Number"
            />
            <button className="ovika-submit-btn-homepage">
            Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home6;
