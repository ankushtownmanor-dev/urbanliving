import React from "react";
import { FaHome, FaCalendarAlt, FaCamera, FaCreditCard } from "react-icons/fa";
import "./HowWeWork.css";
import Divider from "./DIvider";

const HowWeWork = () => {
  return (
    <div className="howwework-container">
      <Divider text="How We Work" />
      <p className="subtitle">
        Book your stay in <span className="highlight">Four easy steps</span> using our seamless online process.
      </p>

      <div className="step">
        <FaHome className="icon" />
        <div>
          <h3>Select property</h3>
          <p>Browse and select your preferred property from our listings</p>
        </div>
      </div>

      <div className="step">
        <FaCalendarAlt className="icon" />
        <div>
          <h3>Choose Date and Enter Data</h3>
          <p>Pick your dates and provide your booking details securely</p>
        </div>
      </div>

      <div className="step">
        <FaCamera className="icon" />
        <div>
          <h3>Upload your photo</h3>
          <p>Upload a photo for verification and a personalized experience</p>
        </div>
      </div>

      <div className="step">
        <FaCreditCard className="icon" />
        <div>
          <h3>Make Payment</h3>
          <p>Pay securely and receive instant booking confirmation</p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;