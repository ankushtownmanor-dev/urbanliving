// import React, { useState, useEffect } from 'react';
// import './WelcomePopUp.css';

// export default function WelcomePopup() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const seen = sessionStorage.getItem('ovika_popup_seen');
//     if (!seen) {
//       setVisible(true);
//       sessionStorage.setItem('ovika_popup_seen', 'true');
//     }
//   }, []);

//   if (!visible) return null;

//   return (
//     <div className="ovika-popup-overlay" onClick={() => setVisible(false)}>
//       <div className="ovika-popup-card" onClick={(e) => e.stopPropagation()}>
//         {/* Close Button */}
//         <button className="ovika-popup-close" onClick={() => setVisible(false)} aria-label="Close">
//           &#10005;
//         </button>

//         {/* Header */}
//         <div className="ovika-popup-header">
//           <span className="ovika-popup-logo">OvikaLiving.com</span>
//           <p className="ovika-popup-tagline">What are you looking for today?</p>
//         </div>

//         {/* Two Section Cards */}
//         <div className="ovika-popup-sections">
//           {/* Short Term */}
//           <div className="ovika-popup-section ovika-section-short">
//             <div className="ovika-section-icon">🏨</div>
//             <h3 className="ovika-section-title">Short Term Rental</h3>
//             <p className="ovika-section-desc">
//               Nightly stays in verified PGs, apartments, houses & farmhouses. Book for days and weeks.
//             </p>
//             <button className="ovika-section-btn ovika-btn-primary">Explore Now →</button>
//           </div>

//           {/* Divider */}
//           <div className="ovika-popup-divider">
//             <span>or</span>
//           </div>

//           {/* Long Term */}
//           <div className="ovika-popup-section ovika-section-long">
//             <div className="ovika-section-icon">🏠</div>
//             <h3 className="ovika-section-title">Long Term Rental</h3>
//             <p className="ovika-section-desc">
//               Find your next home — PG, apartments, houses & farmhouses. Comfortable stays for months & beyond.
//             </p>
//             <button className="ovika-section-btn ovika-btn-outline">Explore Now →</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import './WelcomePopUp.css';

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('ovika_popup_seen');
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const handleSelect = (type) => {
    sessionStorage.setItem('ovika_rental_type', type);
    sessionStorage.setItem('ovika_popup_seen', 'true');
    setVisible(false);
  };

  const handleClose = () => {
    if (!sessionStorage.getItem('ovika_rental_type')) {
      sessionStorage.setItem('ovika_rental_type', 'short');
    }
    sessionStorage.setItem('ovika_popup_seen', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="ovika-popup-overlay" onClick={handleClose}>
      <div className="ovika-popup-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="ovika-popup-close" onClick={handleClose} aria-label="Close">
          &#10005;
        </button>

        {/* Header */}
        <div className="ovika-popup-header">
          <span className="ovika-popup-logo">OvikaLiving.com</span>
          <p className="ovika-popup-tagline">What are you looking for today?</p>
        </div>

        {/* Two Section Cards */}
        <div className="ovika-popup-sections">
          {/* Short Term */}
          <div className="ovika-popup-section ovika-section-short" style={{ cursor: 'pointer' }} onClick={() => handleSelect('short')}>
            <div className="ovika-section-icon">🏨</div>
            <h3 className="ovika-section-title">Short Term Rental</h3>
            <p className="ovika-section-desc">
              Nightly stays in verified PGs, apartments, houses & farmhouses. Book for days, weeks, or a month.
            </p>
            <button className="ovika-section-btn ovika-btn-primary">Explore Now →</button>
          </div>

          {/* Divider */}
          <div className="ovika-popup-divider">
            <span>or</span>
          </div>

          {/* Long Term */}
          <div className="ovika-popup-section ovika-section-long" style={{ cursor: 'pointer' }} onClick={() => handleSelect('long')}>
            <div className="ovika-section-icon">🏠</div>
            <h3 className="ovika-section-title">Long Term Rental</h3>
            <p className="ovika-section-desc">
              Find your next home — PG, apartments, houses & farmhouses. Comfortable stays for months & beyond.
            </p>
            <button className="ovika-section-btn ovika-btn-outline">Explore Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}