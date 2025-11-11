// import React from 'react';
// import './PropertyShare.css';

// function FourthMain() {
//   return (
//     <div className="property-share-container">
//       <div className="property-share-overlay">
//         <div className="property-share-content">
//           <div className="property-share-header">
//             <p className="property-share-title">
//             Your property, Your control -
// rent,<br /> manage and earn effortlessly
//             </p>
//           </div>
//           <p className="property-share-text">
//             Take full control of your rental listing.
//             With Ovika, you can easily <br />
//             find qualified tenants, manage inquiries, and publish your <br />
//             property in minutes.
//           </p>
//           <button className="property-share-button">
//             Get Started For Free
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FourthMain;
import React from 'react';
import './PropertyShare.css';

function FourthMain() {
  return (
    <div className="property-share-container">
      <div className="property-share-overlay">
        <div className="property-share-content">
          <p className="property-share-title">
            Your property, Your control - rent,<br /> 
            manage and earn effortlessly
          </p>

          <p className="property-share-text">
            Take full control of your rental listing. With Ovika, you can easily find qualified tenants, 
            manage inquiries, and publish your property in minutes.
          </p>

          <div className="property-share-btn-wrap">
            <button className="property-btn-started">
              Get Started <span className="arrow">→</span>
            </button>
            <button className="property-btn-free">Free</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourthMain;