import React from "react";
import "./WorkFlow.css";
import { FaHouseChimney, FaHammer } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

const WorkFlow = () => {
  return (
    <section className="tmwf-section">
      <div className="tmwf-container">
        <h2 className="tmwf-title">How It Works</h2>
        <p className="tmwf-subtitle">
       A seamless, transparent process — share your property, we renovate and <br/> manage it, and you earn from shared profits.
        </p>

        <div className="tmwf-steps">
          <div className="tmwf-step">
            <div className="tmwf-icon-line">
              <div className="tmwf-icon-box">
                <FaHouseChimney className="tmwf-icon" />
              </div>
              <div className="tmwf-line"></div>
            </div>
            <div className="tmwf-text-box">
              <h3>Share your property details</h3>
              <p>
                Submit your property details and let us evaluate its potential. After the evaluation, our team presents a detailed proposal outlining renovation plans and profit-sharing terms. Once the agreement is mutually signed, we move ahead to transform your property.
              </p>
            </div>
          </div>

          <div className="tmwf-step">
            <div className="tmwf-icon-line">
              <div className="tmwf-icon-box">
                <FaHammer className="tmwf-icon" />
              </div>
              <div className="tmwf-line"></div>
            </div>
            <div className="tmwf-text-box">
              <h3>We renovate and manage</h3>
              <p>
                Our experts redesign, renovate, and fully manage your property to enhance its appeal and earning potential. From interiors to operations, everything is handled end-to-end by OVIKA to ensure quality, consistency, and superior guest experience.
              </p>
            </div>
          </div>

          <div className="tmwf-step">
            <div className="tmwf-icon-line">
              <div className="tmwf-icon-box">
                <FaRupeeSign className="tmwf-icon" />
              </div>
            </div>
            <div className="tmwf-text-box">
              <h3>Earn and share profit</h3>
              <p>
               Once the property goes live, you start earning a share of the generated profits. Enjoy regular updates, transparent reporting, and steady returns — while we take care of everything else.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
