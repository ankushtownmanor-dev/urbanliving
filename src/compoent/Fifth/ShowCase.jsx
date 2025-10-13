import React, { useState } from "react";
import "./ShowCase.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ShowCase = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="beforeafter-section">
      <h2>Before and after showcase</h2>
      <p>See how we transform your space into profitable assets</p>

      <div className="carousel-container">
        <button className="nav-btn left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="carousel-wrapper">
          {/* Slide 1 */}
          <div
            className={`carousel-card ${
              index === 0
                ? "activeSlide"
                : index === 1
                ? "lastSlide"
                : "nextSlide"
            }`}
          >
            <div className="card-inner">
              <div className="card-img">
                <img src="/image 221.png" alt="Before Hall" />
                <span className="tag">Before</span>
                <span className="label">Hall</span>
              </div>
              <div className="card-img">
                <img src="/image 224.png" alt="After Hall" />
                <span className="tag after">After</span>
                <span className="label">Hall</span>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className={`carousel-card ${
              index === 1
                ? "activeSlide"
                : index === 2
                ? "lastSlide"
                : "nextSlide"
            }`}
          >
            <div className="card-inner">
              <div className="card-img">
                <img src="/tmluxe.png" alt="Before PG Room" />
                <span className="tag">Before</span>
                <span className="label">PG Room</span>
              </div>
              <div className="card-img">
                <img src="/tmluxe2.png" alt="After PG Room" />
                <span className="tag after">After</span>
                <span className="label">PG Room</span>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className={`carousel-card ${
              index === 2
                ? "activeSlide"
                : index === 0
                ? "lastSlide"
                : "nextSlide"
            }`}
          >
            <div className="card-inner">
              <div className="card-img">
                <img src="/tmluxe3.png" alt="Before Bedroom" />
                <span className="tag">Before</span>
                <span className="label">Bedroom</span>
              </div>
              <div className="card-img">
                <img src="/tmluxe41.webp" alt="After Bedroom" />
                <span className="tag after">After</span>
                <span className="label">Bedroom</span>
              </div>
            </div>
          </div>
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ShowCase;
