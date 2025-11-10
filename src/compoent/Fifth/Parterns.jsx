import React from "react";
import "./ParternsSection.css";

const PartnersSection = () => {
  const reviews = [
    {
      stars: 5,
      text: `"Ovika completely transform my old family home. The process was seamless, and how I'm earning passive income I never thought possible. Highly recommended!"`,
      name: "Riya Sharma",
    },
    {
      stars: 5,
      text: `"I was skeptical at first, but the team's professionalism and transparency won me over. My property looks amazing, and then returns have exceeded my expectations."`,
      name: "Mukti Mohan",
    },
    {
      stars: 5,
      text: `"The best part of our working with Ovika is that it's completely hands off. They handled everything, and I just get a check every month. It's that simple."`,
      name: "Anubhav Verma",
    },
  ];

  return (
    <div className="partners-section">
      <h2 className="partners-title">
        What Our <span>Partners</span> Say
      </h2>

      <div className="partners-container">
        {reviews.map((review, index) => (
          <div className="partner-card" key={index}>
            <div className="stars">
              {"★".repeat(review.stars)}
            </div>
            <p className="review-text">{review.text}</p>
            <p className="reviewer-name">{review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
