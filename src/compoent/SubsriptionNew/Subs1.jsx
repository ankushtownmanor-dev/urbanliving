import React from "react";
import "./Subs1.css";

const Subs1 = () => {
  const handleClaimClick = () => {
    alert("Redirect to claim reward form");
    // yahan tum navigate ya modal open kar sakte ho
  };

  return (
    <section className="season-offer-wrapper">
      <div className="season-offer-container">
        
        <h2 className="season-offer-title">
          🎉 Season Offer 🎉
        </h2>

        <p className="season-offer-text">
          List Unlimited Properties during this season and earn
          <span> ₹100 </span>
          for each property listed! Fill out the form to claim your reward
          today. Offer valid for a limited period  only.
        </p>

        <button
          className="season-offer-btn"
          onClick={handleClaimClick}
        >
          Claim Your Reward
        </button>

      </div>
    </section>
  );
};

export default Subs1;
