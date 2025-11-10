// import React, { useState } from "react";
// import "./ShowCase.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const ShowCase = () => {
//   const [index, setIndex] = useState(0);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % 3);
//   };

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + 3) % 3);
//   };

//   return (
//     <div className="beforeafter-section">
//       <h2 style={{fontWeight:"200" ,fontSize: "clamp(28px, 4.5vw, 42px)"}}>Before and after showcase</h2>
//       <p style={{fontSize:"17px"}}>See how we transform your space into profitable assets</p>

//       <div className="carousel-container">
//         <button className="nav-btn left" onClick={prevSlide}>
//           <FaArrowLeft />
//         </button>

//         <div className="carousel-wrapper">
//           {/* Slide 1 */}
//           <div
//             className={`carousel-card ${
//               index === 0
//                 ? "activeSlide"
//                 : index === 1
//                 ? "lastSlide"
//                 : "nextSlide"
//             }`}
//           >
//             <div className="card-inner">
//               <div className="card-img">
//                 <img src="/before_new.png" alt="Before Hall" />
//                 <span className="tag">Before</span>
//                 <span className="label">Hall</span>
//               </div>
//               <div className="card-img">
//                 <img src="/after_new.png" alt="After Hall" />
//                 <span className="tag after">After</span>
//                 <span className="label-2">Hall</span>
//               </div>
//             </div>
//           </div>

//           {/* Slide 2 */}
//           <div
//             className={`carousel-card ${
//               index === 1
//                 ? "activeSlide"
//                 : index === 2
//                 ? "lastSlide"
//                 : "nextSlide"
//             }`}
//           >
//             <div className="card-inner">
//               <div className="card-img">
//                 <img src="/washroom_before.png" alt="Before washroom" />
//                 <span className="tag">Before</span>
//                 <span className="label">Washroom</span>
//               </div>
//               <div className="card-img">
//                 <img src="/washroom_after.png" alt="After washroom" />
//                 <span className="tag after">After</span>
//                 <span className="label-2">Washroom</span>
//               </div>
//             </div>
//           </div>

//           {/* Slide 3 */}
//           <div
//             className={`carousel-card ${
//               index === 2
//                 ? "activeSlide"
//                 : index === 0
//                 ? "lastSlide"
//                 : "nextSlide"
//             }`}
//           >
//             <div className="card-inner">
//               <div className="card-img">
//                 <img src="/before_bedroom.png" alt="Before Bedroom" />
//                 <span className="tag">Before</span>
//                 <span className="label">Bedroom</span>
//               </div>
//               <div className="card-img">
//                 <img src="/after_bedroom.png" alt="After Bedroom" />
//                 <span className="tag after">After</span>
//                 <span className="label-2">Bedroom</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button className="nav-btn right" onClick={nextSlide}>
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShowCase;
import React, { useState } from "react";
import "./ShowCase.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ShowCase = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % 3);
  const prevSlide = () => setIndex((prev) => (prev - 1 + 3) % 3);

  const slides = [
    { before: "/before_new.png", after: "/after_new.png" },
    { before: "/washroom_before.png", after: "/washroom_after.png" },
    { before: "/before_bedroom.png", after: "/after_bedroom.png" },
  ];

  return (
    <section className="showcase-section">
      <h2 className="showcase-title">
        From Dated to <span>Desirable</span>
      </h2>
      <p className="showcase-subtitle">
        see the incredible transformations we’ve delivered for our partners.
      </p>

      <div className="showcase-carousel">
        <button className="nav-btn left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="showcase-wrapper">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`showcase-card ${
                index === i
                  ? "activeSlide"
                  : i === (index - 1 + slides.length) % slides.length
                  ? "lastSlide"
                  : "nextSlide"
              }`}
            >
              <div className="image-pair">
                <div className="image-box">
                  <img src={slide.before} alt="Before" />
                  <span className="badge">Before</span>
                </div>
                <div className="image-box">
                  <img src={slide.after} alt="After" />
                  <span className="badge after">After</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ShowCase;
