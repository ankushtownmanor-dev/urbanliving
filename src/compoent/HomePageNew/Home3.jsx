import React from "react";
import "./Home3.css";

const Home3 = () => {
  const steps = [
    {
      icon: "/novi1.png", // replace with your icon
      title: "Select Property",
      text: "Browse and choose from our curated list of stays.",
    },
    {
      icon: "/novi2.png", // replace with your icon
      title: "Confirm & Book",
      text: "Secure your spot with our simple and fast booking process.",
    },
    {
      icon: "/novi3.png", // replace with your icon
      title: "Move In Hassle-free",
      text: "Enjoy a smooth move-in experience with our support.",
    },
    {
      icon: "/novi4.png", // replace with your icon
      title: "Live Smart",
      text: "Experience the best of urban living with Ovika.",
    },
  ];

  return (
    <div className="how-container">
      <h2 className="how-heading">
        How <span className="highlight">Ovika</span> Works
      </h2>

      <div className="how-card-container">
        {steps.map((step, index) => (
          <div key={index} className="how-card">
            <div className="icon-circle">
              <img src={step.icon} alt={step.title} className="how-icon" />
            </div>
            <h3 className="how-title">{step.title}</h3>
            <p className="how-text">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home3;
