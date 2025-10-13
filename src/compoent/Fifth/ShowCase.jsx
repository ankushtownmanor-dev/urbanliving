// import React from "react";
// import "./ShowCase.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const BeforeAfterShowcase = () => {
//   const showcaseData = [
//     {
//       beforeImg: "/public/image 221.png",
//       afterImg: "/public/image 224.png",
//       label: "Hall",
//     },
//     {
//       beforeImg: "/public/tmluxe.png",
//       afterImg: "/public/tmluxe2.png",
//       label: "Bedroom",
//     },
//     {
//       beforeImg: "/images/before-kitchen.jpg",
//       afterImg: "/images/after-kitchen.jpg",
//       label: "Kitchen",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 4000,
//   };

//   return (
//     <section className="before-after-section">
//       <div className="container">
//         <h2>Before and after showcase</h2>
//         <p className="subtitle">
//           See how we transform your space into profitable assets
//         </p>

//         <Slider {...settings} className="carousel">
//           {showcaseData.map((item, index) => (
//             <div className="slide" key={index}>
//               <div className="image-stack">
//                 <div className="image-card">
//                   <img src={item.beforeImg} alt="Before" />
//                   <span className="badge">Before</span>
//                   <span className="corner-text">{item.label}</span>
//                 </div>

//                 <div className="image-card">
//                   <img src={item.afterImg} alt="After" />
//                   <span className="badge">After</span>
//                   <span className="corner-text">{item.label}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default BeforeAfterShowcase;
// import React from "react";
// import "./ShowCase.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const BeforeAfterShowcase = () => {
//   const showcaseData = [
//     {
//       beforeImg: "/public/image 221.png",
//       afterImg: "/public/image 224.png",
//       label: "Hall",
//     },
//     {
//       beforeImg: "/public/tmluxe.png",
//       afterImg: "/public/tmluxe2.png",
//       label: "PG Room",
//     },
//     {
//       beforeImg: "/public/tmluxe3.png",
//       afterImg: "/public/tmluxe41.webp",
//       label: "Bedroom",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     slidesToShow: 1.2, // show upcoming card slightly
//     slidesToScroll: 1,
//     arrows: true,
//     centerMode: true,
//     centerPadding: "120px", // show part of next/prev card
//     autoplay: true,
//     autoplaySpeed: 4000,
//   };

//   return (
//     <section className="before-after-section">
//       <div className="container">
//         <h2>Before and after showcase</h2>
//         <p className="subtitle">
//           See how we transform your space into profitable assets
//         </p>

//         <Slider {...settings} className="carousel">
//           {showcaseData.map((item, index) => (
//             <div className="slide" key={index}>
//               <div className="image-stack">
//                 <div className="image-card">
//                   <img src={item.beforeImg} alt="Before" />
//                   <span className="badge">Before</span>
//                   <span className="corner-text">{item.label}</span>
//                 </div>
//                 <div className="image-card">
//                   <img src={item.afterImg} alt="After" />
//                   <span className="badge">After</span>
//                   <span className="corner-text">{item.label}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default BeforeAfterShowcase;


import React, { useState } from "react";
import "./ShowCase.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const data = [
  {
    id: 1,
    before: "/public/image 221.png",
      after: "/public/image 224.png",
      label: "Hall",
  },
  {
    id: 2,
     before: "/public/tmluxe.png",
      after: "/public/tmluxe2.png",
      label: "PG Room",
  },
  {
    id: 3,
    before: "/public/tmluxe3.png",
      after: "/public/tmluxe41.webp",
      label: "Bedroom",
  },
];

const ShowCase = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
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
          {data.map((item, i) => {
            let position = "nextSlide";
            if (i === index) position = "activeSlide";
            if (i === index - 1 || (index === 0 && i === data.length - 1))
              position = "lastSlide";

            return (
              <div className={`carousel-card ${position}`} key={item.id}>
                <div className="card-inner">
                  <div className="card-img">
                    <img src={item.before} alt="before" />
                    <span className="tag">Before</span>
                    <span className="label">{item.label}</span>
                  </div>

                  <div className="card-img">
                    <img src={item.after} alt="after" />
                    <span className="tag after">After</span>
                    <span className="label">{item.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ShowCase;
