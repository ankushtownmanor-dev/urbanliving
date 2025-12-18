import React, { useEffect, useState } from 'react';
import './ManageTestimonials.css';

const ManageTestimonials = () => {
  const testimonialsData = [
    {
      name: "Riya Tanwar",
      rating: 5,
      text: "I was skeptical at first, but OvikaLiving's transparent process won me over. Their renovation team completely transformed my property, and within weeks it was rented out. I just receive my profit share every month. Smooth and professional experience!"
    },
    {
      name: "Mukti Mohan",
      rating: 5,
      text: "I was skeptical at first, but the team's professionalism and transparency won me over. My property looks amazing, and the returns have exceeded my expectations."
    },
    {
      name: "Anubhav Verma",
      rating: 5,
      text: "The best part of working with OvikaLiving is that it's completely hands-off. They handled everything, and I just get a check every month. It's that simple."
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
    <div className="manage-testimonials-section">
      <div className="manage-testimonials-header">
        <h2 className="manage-testimonials-title">
          Loved by Property <span className="manage-orange-text">Owners</span>
        </h2>
        <p className="manage-testimonials-subtitle">
          Real stories from partners who trust OvikaLiving
        </p>
      </div>

      {/* Desktop Grid - Rectangle Cards */}
      <div className="manage-desktop-grid">
        {testimonialsData.map((item, index) => (
          <div key={index} className="manage-testimonial-card-desktop">
            <div className="manage-stars">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="manage-testimonial-content">{item.text}</p>
            <h3 className="manage-testimonial-author">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Mobile Slider - Circle Cards */}
      <div className="manage-mobile-slider">
        <div className="manage-testimonial-card-mobile">
          <div className="manage-stars">
            {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="manage-testimonial-content">
            {testimonialsData[currentIndex].text}
          </p>
          <h3 className="manage-testimonial-author">
            {testimonialsData[currentIndex].name}
          </h3>
        </div>

        <div className="manage-dots">
          {testimonialsData.map((_, index) => (
            <span
              key={index}
              className={`manage-dot ${index === currentIndex ? 'manage-dot-active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;