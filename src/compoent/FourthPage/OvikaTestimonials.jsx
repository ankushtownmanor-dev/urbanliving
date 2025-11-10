import React from 'react';
import './OvikaTestimonials.css';

const OvikaTestimonials = () => {
  const testimonialsData = [
    {
      name: "Riya Sharma",
      rating: 5,
      text: "Ovika completely transform my old family home. The process was seamless , and how I'm earning passive income I never thought possible. Highly recommended!"
    },
    {
      name: "Mukti Mohan",
      rating: 5,
      text: "I was skeptical at first , but the team's professionalism and transparency won me over. My property looks amazing , and then returns have exceeded my expectations."
    },
    {
      name: "Anubhav Verma",
      rating: 5,
      text: "The best part of our working with Ovika is that's it's completely hands off. They handled everything , and I just get a check every month. it's that simple."
    }
  ];

  return (
    <div className="ovika-testimonials-wrapper">
      <h2 className="ovika-testimonials-heading">
        What Our <span>Partners</span> Say
      </h2>

      <div className="ovika-testimonials-grid">
        {testimonialsData.map((item, index) => (
          <div key={index} className="ovika-testimonial-box">
            <div className="ovika-rating-stars">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="ovika-testimonial-content">
              {item.text}
            </p>
            <h3 className="ovika-testimonial-author">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OvikaTestimonials;