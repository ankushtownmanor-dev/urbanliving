// import React from "react";
// import "./Form.css";

// const PropertyShareForm = () => (
//   <div className="property-share-wrapper">
//     <h1 className="main-heading-renovation">Start Listing your property with Ovika today !</h1>
//     <p className="sub-heading">
//     Ready to rent out your home or investment property? Connect with us below — our team <br/>will help you list your property, attract verified tenants, and start earning faster.
//     </p>

//     <div className="form-office-container">
//       {/* Form Section */}
//       <div className="form-section-newsection">
//         <h2 className="section-heading-renovation">Fill out the form</h2>
//         <form className="share-form">
//           <input type="text" placeholder="Full name" className="input-field" />
//           <input type="text" placeholder="Property address" className="input-field" />
//           <input type="email" placeholder="Email address" className="input-field" />
//           <textarea placeholder="Message..." className="input-field textarea-field" />
//           <button className="submit-btn-renovation">
//             Submit Details
//             <span className="arrow">{'>'}</span>
//           </button>
//         </form>
//       </div>

//       {/* Office Visit Section */}
//       <div className="office-section">
//         <h2 className="section-heading-two">Or visit our office</h2>
//         <p className="office-desc">
//     We’d love to meet you in person and help you get started with transforming and listing your property for rental income. Visit our OVIKA office to discuss your property requirements — whether it’s ready-to-rent or needs renovation and setup before listing. <br/>

// Our team will guide you through the complete process: from <b>renovation and furnishing</b> to <b>tenant management, bookings, and maintenance.</b>
//   We ensure your property is managed professionally with full transparency, ensuring you earn consistent returns without the day-to-day hassle.<br/>

// Bring your property details — our specialists will explain how we handle <b>renovate, list, and manage</b> under one roof for complete peace of mind. Let’s make your property work smarter for you — <b>efficiently, transparently, and profitably!</b>
//         {/* We’d love to meet you in person and help you get started with listing your property for rental management. Visit our OVIKA office to discuss your ready-to-rent space and learn how our expert team can help you earn consistent rental income without the hassle of day-to-day management.
// Bring your property details — our specialists will explain how we manage listings, bookings, tenants, and maintenance, ensuring complete transparency and peace of mind. Let’s make your property work for you — easily, efficiently, and profitably! */}
//         </p>
//         {/* <div className="address-block">
          
//           <div className="address-details">
//             <span className="address-title">Our Adress is :</span>
//             2nd Floor, Tower B, Logix City Center,<br />
//             Sector 32, Noida – 201301,<br />
//             Uttar Pradesh, India
//           </div>
//         </div> */}
//   <div className="address-block">
//   <div className="address-line"></div>
//   <div className="address-container">
//     <span className="address-title">Our Address is :</span>
//     <div>
//      ST-304, Eldeco Studio, Sector 93A,<br />
//       Noida India, PIN-201304<br />
//       Uttar Pradesh, India
//     </div>
//   </div>
// </div>


        
//       </div>
//     </div>
//   </div>
// );

// export default PropertyShareForm;
import React from "react";
import "./Form.css";

const PropertyConsultation = () => {
  return (
    <section className="ovika-section">
      <div className="ovika-top-text">
        <h3>
          Start sharing your property with <span>Ovika</span> today !
        </h3>
        <p>
          Ready to unlock your property potential? Choose your preferred way to connect with us below
        </p>
      </div>

      <div className="ovika-content">
        <div className="ovika-left">
          <h2>
            Ready to Unlock your <br />
            property’s <span>Potential</span>
          </h2>
          <p>
            Fill out the form to schedule a free non-obligation consultation with one of our property experts.
          </p>
        </div>

        <div className="ovika-form">
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Phone Number" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Tell us about your Property ( Optional )"></textarea>
            <button type="submit">Request Free Consultation</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PropertyConsultation;
