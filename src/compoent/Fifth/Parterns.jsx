import React, { useState, useEffect } from "react";

const PartnersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const reviews = [
    {
      stars: 5,
      text: "Ovika completely transform my old family home. The process was seamless, and how I'm earning passive income I never thought possible. Highly recommended!",
      name: "Riya Sharma",
    },
    {
      stars: 5,
      text: "I was skeptical at first, but the team's professionalism and transparency won me over. My property looks amazing, and then returns have exceeded my expectations.",
      name: "Mukti Mohan",
    },
    {
      stars: 5,
      text: "The best part of our working with Ovika is that it's completely hands off. They handled everything, and I just get a check every month. It's that simple.",
      name: "Anubhav Verma",
    },
  ];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide every 10 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isMobile, reviews.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    e.currentTarget.dataset.touchStartX = touch.clientX;
  };

  const handleTouchEnd = (e) => {
    const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX);
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < reviews.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };

  return (
    <div className="partners-section">
      <h2 className="partners-title">
        What Our <span>Partners</span> Say
      </h2>
      <div 
        className="partners-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {reviews.map((review, index) => (
          <div 
            className={`partner-card ${index === currentSlide ? 'active' : ''}`} 
            key={index}
          >
            <div className="stars">
              {"★".repeat(review.stars)}
            </div>
            <p className="review-text">{review.text}</p>
            <p className="reviewer-name">{review.name}</p>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {reviews.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;

const styles = `
.partners-section {
  background: #f5f5f1;
  border-radius: 15px;
  padding: 50px 40px;
  margin: 40px auto;
  text-align: center;
  max-width: 1200px;
}

.partners-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #000;
}

.partners-title span {
  color: #c47b28;
}

.partners-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 25px;
  flex-wrap: wrap;
}

.partner-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px 25px;
  width: 320px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stars {
  color: #c47b28;
  font-size: 18px;
  margin-bottom: 10px;
}

.review-text {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.reviewer-name {
  font-weight: 600;
  color: #000;
  font-size: 15px;
}

.carousel-dots {
  display: none;
}

/* Mobile View - Circular Cards with Auto-slide */
@media (max-width: 768px) {
  .partners-section {
    padding: 40px 20px;
    background: #f9f9f9;
  }

  .partners-title {
    font-size: 20px;
    line-height: 1.4;
  }

  .partners-container {
    flex-direction: column;
    align-items: center;
    gap: 0;
    position: relative;
    overflow: hidden;
    touch-action: pan-y;
  }

  .partner-card {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    padding: 40px 30px;
    text-align: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: none;
    flex-direction: column;
    align-items: center;
    transition: opacity 0.5s ease;
  }

  .partner-card.active {
    display: flex;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .stars {
    color: #e63946;
    font-size: 22px;
    margin-bottom: 20px;
    letter-spacing: 3px;
  }

  .review-text {
    font-size: 11px;
    line-height: 1.6;
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reviewer-name {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-top: 0;
    color: #000;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 25px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .dot.active {
    background: #ffa500;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}