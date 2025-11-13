// TMXLuxeTestimonialsCard.jsx
import React, { useEffect, useState } from 'react';
import './TMXLuxeTestimonialsCard.css';

const TMXLuxeTestimonialsCard = () => {
  const testimonials = [
    {
      name: 'Riya Tanwar',
      rating: 5,
      text:
        "I was skeptical at first, but Ovika's transparent process won me over. Their renovation team completely transformed my property, and within weeks it was rented out. I just receive my profit share every month. Smooth and professional experience!",
    },
    {
      name: 'Mukti Mohan',
      rating: 5,
      text:
        "I was skeptical at first, but the team's professionalism and transparency won me over. My property looks amazing, and the returns have exceeded my expectations.",
    },
    {
      name: 'Anubhav Verma',
      rating: 5,
      text:
        "The best part of working with Ovika is that it's completely hands-off. They handled everything, and I just get a check every month. It's that simple.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section className="tmxluxeTest-section">
      <header className="tmxluxeTest-header">
        <h2 className="tmxluxeTest-title">
          Loved by Property <span className="tmxluxeTest-titleAccent">Owners</span>
        </h2>
        <p className="tmxluxeTest-subtitle">Real stories from partners who trust Ovika</p>
      </header>

      {/* Desktop grid */}
      <div className="tmxluxeTest-grid">
        {testimonials.map((t, i) => (
          <article key={i} className="tmxluxeTest-card">
            <div className="tmxluxeTest-stars">
              {Array.from({ length: t.rating }).map((_, s) => (
                <span key={s}>★</span>
              ))}
            </div>
            <p className="tmxluxeTest-text">{t.text}</p>
            <h3 className="tmxluxeTest-author">{t.name}</h3>
          </article>
        ))}
      </div>

      {/* Mobile slider */}
      <div className="tmxluxeTest-slider">
        <div className="tmxluxeTest-circleCard">
          <div className="tmxluxeTest-stars tmxluxeTest-starsMobile">
            {Array.from({ length: testimonials[index].rating }).map((_, s) => (
              <span key={s}>★</span>
            ))}
          </div>
          <p className="tmxluxeTest-text tmxluxeTest-textMobile">{testimonials[index].text}</p>
          <h3 className="tmxluxeTest-author tmxluxeTest-authorMobile">
            {testimonials[index].name}
          </h3>
        </div>

        <div className="tmxluxeTest-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`tmxluxeTest-dot ${i === index ? 'tmxluxeTest-dotActive' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TMXLuxeTestimonialsCard;