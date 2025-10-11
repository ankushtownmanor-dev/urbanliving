import React from "react";
import "./WorkFlow.css";
import { FaHouseChimney, FaHammer } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

const WorkFlow = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <p className="subtitle">
          A simple, transparent process to maximize your property's potential
        </p>

        <div className="steps">
          <div className="step">
            <div className="icon-line">
              <div className="icon-box">
                <FaHouseChimney className="icon" />
              </div>
              <div className="line"></div>
            </div>
            <div className="text-box">
              <h3>Share your property details</h3>
              <p>
                To redefine hospitality by creating inclusive, comfortable, and
                community-driven spaces where everyone feels at home.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="icon-line">
              <div className="icon-box">
                <FaHammer className="icon" />
              </div>
              <div className="line"></div>
            </div>
            <div className="text-box">
              <h3>We renovate and manage</h3>
              <p>
                To be the most trusted name in modern hospitality — connecting
                people, places, and experiences through care, comfort, and
                innovation.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="icon-line">
              <div className="icon-box">
                <FaRupeeSign className="icon" />
              </div>
            </div>
            <div className="text-box">
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
