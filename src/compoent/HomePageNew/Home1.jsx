
// import React, { useState, useEffect } from 'react';
// import './Home1.css';

// export default function Home1() {
//   const [rentalType, setRentalType] = useState(null);

//   useEffect(() => {
//     const type = sessionStorage.getItem('ovika_rental_type');
//     setRentalType(type); // null if not selected yet

//     const interval = setInterval(() => {
//       const updated = sessionStorage.getItem('ovika_rental_type');
//       setRentalType(updated);
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   const pricingLabel = rentalType === 'short'
//     ? ' — Per Night'
//     : rentalType === 'long'
//     ? ' — Per Month'
//     : ''; // default: nothing

//   const cards = [
//     {
//       icon: '🏠',
//       title: 'PG',
//       subtitle: `Affordable stays${pricingLabel}`,
//       desc: 'Ideal for students & professionals.',
//     },
//     {
//       icon: '🏢',
//       title: 'Economy Stay',
//       subtitle: `Comfort at great value${pricingLabel}`,
//       desc: 'Well-furnished homes with modern amenities.',
//     },
//     {
//       icon: '✨',
//       title: 'Premium Stay',
//       subtitle: `Refined living experience${pricingLabel}`,
//       desc: 'Enhanced comfort with premium facilities.',
//     },
//   ];

//   return (
//     <div className="ovika-urban-hero-container">
//       <div className="ovika-urban-hero-bg"></div>

//       <div className="ovika-urban-hero-wrapper">
//         {/* Left Content */}
//         <div className="ovika-hero-left">
//           <h1 className="ovika-urban-hero-heading">
//             <span className="ovika-brand-name">OvikaLiving.com</span> – A Marketplace for <br />
//             Short-Term Stays &amp; Hosting
//           </h1>
//           <p className="ovika-urban-hero-text">
//             Book verified short-term stays or host your property and earn — all in one platform.
//           </p>
//         </div>

//         {/* Right Cards */}
//         <div className="ovika-hero-cards">
//           {cards.map((card, i) => (
//             <div className="ovika-hero-card" key={i}>
//               <div className="ovika-card-icon">{card.icon}</div>
//               <div className="ovika-card-body">
//                 <h3 className="ovika-card-title">{card.title}</h3>
//                 <p className="ovika-card-subtitle">{card.subtitle}</p>
//                 <p className="ovika-card-desc">{card.desc}</p>
//                 <a href="/properties" className="ovika-card-link">
//                   Explore <span>→</span>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import './Home1.css';

// export default function Home1() {
//   const [rentalType, setRentalType] = useState(null);

//   useEffect(() => {
//     const type = sessionStorage.getItem('ovika_rental_type');
//     setRentalType(type); // null if not selected yet

//     const interval = setInterval(() => {
//       const updated = sessionStorage.getItem('ovika_rental_type');
//       setRentalType(updated);
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   const pricingLabel = rentalType === 'short'
//     ? ' — Per Night'
//     : rentalType === 'long'
//     ? ' — Per Month'
//     : ''; // default: nothing

//   const cards = [
//     {
//       icon: '🏠',
//       title: 'PG',
//       subtitle: `Affordable stays${pricingLabel}`,
//       desc: 'Ideal for students & professionals.',
//     },
//     {
//       icon: '🏢',
//       title: 'Economy Stay',
//       subtitle: `Comfort at great value${pricingLabel}`,
//       desc: 'Well-furnished homes with modern amenities.',
//     },
//     {
//       icon: '✨',
//       title: 'Premium Stay',
//       subtitle: `Refined living experience${pricingLabel}`,
//       desc: 'Enhanced comfort with premium facilities.',
//     },
//   ];

//   return (
//     <div className="ovika-urban-hero-container">
//       <div className="ovika-urban-hero-bg"></div>

//       <div className="ovika-urban-hero-wrapper">
//         {/* Left Content */}
//         <div className="ovika-hero-left">
//           <h1 className="ovika-urban-hero-heading">
//             <span className="ovika-brand-name">OvikaLiving.com</span> – A Marketplace for <br />
//             Short-Term Stays &amp; Hosting
//           </h1>
//           <p className="ovika-urban-hero-text">
//             Book verified short-term stays or host your property and earn — all in one platform.
//           </p>
//         </div>

//         {/* Right Cards */}
//         <div className="ovika-hero-cards">
//           {cards.map((card, i) => (
//             <div className="ovika-hero-card" key={i}>
//               <div className="ovika-card-icon">{card.icon}</div>
//               <div className="ovika-card-body">
//                 <h3 className="ovika-card-title">{card.title}</h3>
//                 <p className="ovika-card-subtitle">{card.subtitle}</p>
//                 <p className="ovika-card-desc">{card.desc}</p>
//                 <a href="/properties" className="ovika-card-link">
//                   Explore <span>→</span>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import './Home1.css';

export default function Home1() {
  const [rentalType, setRentalType] = useState(null);

  useEffect(() => {
    const type = sessionStorage.getItem('ovika_rental_type');
    setRentalType(type);

    const interval = setInterval(() => {
      const updated = sessionStorage.getItem('ovika_rental_type');
      setRentalType(updated);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const pricingLabel = rentalType === 'short'
    ? ' — Per Night'
    : rentalType === 'long'
    ? ' — Per Month'
    : '';

  const cards = [
    {
      icon: '🏠',
      title: 'PG',
      subtitle: `Affordable stays${pricingLabel}`,
      desc: 'Ideal for students & professionals.',
      category: 'PG',
    },
    {
      icon: '🏢',
      title: 'Economy Stay',
      subtitle: `Comfort at great value${pricingLabel}`,
      desc: 'Well-furnished homes with modern amenities.',
      category: 'Economy Stay',
    },
    {
      icon: '✨',
      title: 'Premium Stay',
      subtitle: `Refined living experience${pricingLabel}`,
      desc: 'Enhanced comfort with premium facilities.',
      category: 'Premium Stay',
    },
  ];

  return (
    <div className="ovika-urban-hero-container">
      <div className="ovika-urban-hero-bg"></div>

      <div className="ovika-urban-hero-wrapper">
        {/* Left Content */}
        <div className="ovika-hero-left">
          <h1 className="ovika-urban-hero-heading">
            <span className="ovika-brand-name">OvikaLiving.com</span> – A Marketplace for <br />
            Short-Term Stays &amp; Hosting
          </h1>
          <p className="ovika-urban-hero-text">
            Book verified short-term stays or host your property and earn — all in one platform.
          </p>
        </div>

        {/* Right Cards */}
        <div className="ovika-hero-cards">
          {cards.map((card, i) => (
            <a
              key={i}
              href={`/properties?category=${encodeURIComponent(card.category)}`}
              className="ovika-hero-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            >
              <div className="ovika-card-icon">{card.icon}</div>
              <div className="ovika-card-body">
                <h3 className="ovika-card-title">{card.title}</h3>
                <p className="ovika-card-subtitle">{card.subtitle}</p>
                <p className="ovika-card-desc">{card.desc}</p>
                <span className="ovika-card-link">
                  Explore <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}