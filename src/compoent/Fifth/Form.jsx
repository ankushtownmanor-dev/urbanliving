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


// import React from "react";
// import "./Form.css";

// const PropertyConsultation = () => {
//   return (
//     <section className="ovika-section">
//       <div className="ovika-top-text">
//         <h3>
//           Start sharing your property with <span>Ovika</span> today !
//         </h3>
//         {/* <p>
//           Ready to unlock your property potential? Choose your preferred way to connect with us below
//         </p> */}
//       </div>

//       <div className="ovika-content">
//         <div className="ovika-left">
//           <h2>
//             Ready to Unlock your <br />
//             property’s <span>Potential</span>
//           </h2>
//           <p>
//             Fill out the form to schedule a free non-obligation consultation with one of our property experts.
//           </p>
//         </div>

//         <div className="ovika-form">
//           <form>
//             <input type="text" placeholder="Your Name" />
//             <input type="text" placeholder="Phone Number" />
//             <input type="email" placeholder="Email Address" />
//             <textarea placeholder="Tell us about your Property ( Optional )"></textarea>
//             <button type="submit">Request Free Consultation</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PropertyConsultation;


import React, { useState } from "react";
import { X } from 'lucide-react';
import "./Form.css";

const PropertyConsultation = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://www.townmanor.ai/api/formlead/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone_number,
          purpose: formData.message,
          source: "PropertyConsultation Form"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
        
        // Show success popup
        setShowSuccessPopup(true);
        
        // Reset form data
        setFormData({ name: "", phone_number: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <section className="ovika-section">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            padding: "20px"
          }}
          onClick={closeSuccessPopup}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "40px",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSuccessPopup}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                transition: "color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "#000"}
              onMouseOut={(e) => e.currentTarget.style.color = "#666"}
            >
              <X size={24} />
            </button>

            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#333"
              }}
            >
              Message Submitted Successfully!
            </h2>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                color: "#666",
                marginBottom: "25px"
              }}
            >
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={closeSuccessPopup}
              style={{
                padding: "12px 40px",
                background: "linear-gradient(90deg, #b62305 0%, #000000 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Poppins, sans-serif",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(182, 35, 5, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="ovika-top-text">
        <h3>
          Start sharing your property with <span>OvikaLiving</span> today !
        </h3>
        {/* <p>
          Ready to unlock your property potential? Choose your preferred way to connect with us below
        </p> */}
      </div>

      <div className="ovika-content">
        <div className="ovika-left">
          <h2>
            Ready to Unlock your <br />
            property's <span>Potential</span>
          </h2>
          <p>
            Fill out the form to schedule a free non-obligation consultation with one of our property experts.
          </p>
        </div>

        <div className="ovika-form">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <input 
              type="tel" 
              name="phone_number"
              placeholder="Mobile Number" 
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
              disabled={isSubmitting}
            />
            <textarea 
              name="message"
              placeholder="Tell us about your Property ( Optional )"
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
            ></textarea>
            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? "Submitting..." : "Request Free Consultation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PropertyConsultation;