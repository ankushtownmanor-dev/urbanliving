import React from "react";
import "./Testimonials.css";
 // replace with actual image
// replace with actual image

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2>Loved by property owners</h2>
      <p className="subtitle">
        Real stories from partners who trust Ovika
      </p>

      <div className="testimonials-cards">
        <div className="testimonial-card">
          <img src="/public/r1.png" alt="Anil Kumar" className="profile-img" />
          <h3>Anil Kumar</h3>
          <p className="time">1 month ago</p>
          <div className="stars">★★★★★</div>
          <p className="feedback">
            I had an old flat sitting unused for years. The Ovika team renovated it beautifully —
            it looks brand new! They handled everything from design to renting, and now I get
            regular monthly income without any stress. Totally worth trusting their process.
          </p>
        </div>

        <div className="testimonial-card">
          <img src="/public/r4.png" alt="Anshula Kapoor" className="profile-img" />
          <h3>Anshula Kapoor</h3>
          <p className="time">2 month ago</p>
          <div className="stars">★★★★★</div>
          <p className="feedback">
            I was skeptical at first, but Ovika’s transparent process won me over. Their renovation
            team completely transformed my property, and within weeks it was rented out. I just
            receive my profit share every month. Smooth and professional experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
