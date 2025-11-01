import React from "react";
import "./Home3.css";

const Home3 = () => {
  const steps = [
    {
      icon: "https://i.ibb.co/vVXL8pZ/location-icon.png", // replace with your icon
      title: "Select Property",
      text: "Browse and choose from our curated list of stays.",
    },
    {
      icon: "https://i.ibb.co/NjzSf4s/check-icon.png", // replace with your icon
      title: "Confirm & Book",
      text: "Secure your spot with our simple and fast booking process.",
    },
    {
      icon: "https://i.ibb.co/3FwfwJb/house-icon.png", // replace with your icon
      title: "Move In Hassle-free",
      text: "Enjoy a smooth move-in experience with our support.",
    },
    {
      icon: "https://i.ibb.co/HB2r3yX/smart-living.png", // replace with your icon
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
