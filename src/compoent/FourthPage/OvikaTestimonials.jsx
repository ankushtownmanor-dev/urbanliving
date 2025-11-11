import React, { useEffect, useState } from 'react';
import './OvikaTestimonials.css';

const OvikaTestimonials = () => {
  const testimonialsData = [
    {
      name: "Riya Tanwar",
      rating: 5,
      text: "I was skeptical at first, but Ovika's transparent process won me over. Their renovation team completely transformed my property, and within weeks it was rented out. I just receive my profit share every month. Smooth and professional experience!"
    },
    {
      name: "Mukti Mohan",
      rating: 5,
      text: "I was skeptical at first, but the team's professionalism and transparency won me over. My property looks amazing, and the returns have exceeded my expectations."
    },
    {
      name: "Anubhav Verma",
      rating: 5,
      text: "The best part of working with Ovika is that it's completely hands-off. They handled everything, and I just get a check every month. It's that simple."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  return (
    <div className="ovika-testimonials-section-unique">
      <div className="ovika-testimonials-header-unique">
        <h2 className="ovika-testimonials-title-unique">
          Loved by Property <span className="ovika-orange-text-unique">Owners</span>
        </h2>
        <p className="ovika-testimonials-subtitle-unique">
          Real stories from partners who trust Ovika
        </p>
      </div>

      {/* Desktop Grid - Rectangle Cards */}
      <div className="ovika-desktop-grid-unique">
        {testimonialsData.map((item, index) => (
          <div key={index} className="ovika-testimonial-card-desktop-unique">
            <div className="ovika-stars-unique">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="ovika-testimonial-content-unique">{item.text}</p>
            <h3 className="ovika-testimonial-author-unique">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Mobile Slider - Circle Cards */}
      <div className="ovika-mobile-slider-unique">
        <div className="ovika-testimonial-card-mobile-unique">
          <div className="ovika-stars-unique">
            {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="ovika-testimonial-content-unique">
            {testimonialsData[currentIndex].text}
          </p>
          <h3 className="ovika-testimonial-author-unique">
            {testimonialsData[currentIndex].name}
          </h3>
        </div>

        <div className="ovika-dots-unique">
          {testimonialsData.map((_, index) => (
            <span
              key={index}
              className={`ovika-dot-unique ${index === currentIndex ? 'ovika-dot-active-unique' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OvikaTestimonials;