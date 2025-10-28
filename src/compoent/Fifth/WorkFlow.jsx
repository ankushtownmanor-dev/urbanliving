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
          A simple, transparent process to maximize your property's potential
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
                To redefine hospitality by creating inclusive, comfortable, and
                community-driven spaces where everyone feels at home.
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
                To be the most trusted name in modern hospitality — connecting
                people, places, and experiences through care, comfort, and
                innovation.
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
                Our values are built on comfort, inclusivity, community, trust,
                and innovation — the pillars that shape every stay with us.
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
