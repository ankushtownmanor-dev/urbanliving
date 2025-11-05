// import React from "react";
// import "./HoomieFooter.css";
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

// const HoomieFooter = () => {
//   return (
//     <footer className="hoomie-footer-container">
//       <div className="hoomie-footer-main">
//         <div className="hoomie-footer-col hoomie-footer-brand">
//           <div className="hoomie-footer-logo">
//             <img 
//               src="/ovika.png" 
//               alt="ovika Logo" 
//               className="hoomie-logo-image"
//             />
//           </div>
//         </div>
//         <div className="hoomie-footer-col">
//           <div className="hoomie-footer-heading">COMPANY</div>
//           <ul>
//             <li>About</li>
//             <li>Features</li>
//             <li>TMLuxe</li>
//             <li>Place</li>
//           </ul>
//         </div>
//         <div className="hoomie-footer-col">
//           <div className="hoomie-footer-heading">HELP</div>
//           <ul>
//             <li>Customer Support</li>
//             <li>Delivery Details</li>
//             <li>Terms & Conditions</li>
//             <li>Privacy Policy</li>
//           </ul>
//         </div>
//         <div className="hoomie-footer-col">
//           <div className="hoomie-footer-heading">RESOURCES</div>
//           <ul>
//             <li>PG</li>
//             <li>Coliving</li>
//             <li>Luxury Apartment</li>
//           </ul>
//         </div>
//         <div className="hoomie-footer-col hoomie-footer-connect">
//           <div className="hoomie-footer-heading">CONNECT WITH US</div>
//           <form className="hoomie-footer-form">
//             <input type="email" placeholder="Enter email address" className="hoomie-footer-input" />
//             <button type="submit" className="hoomie-footer-join-btn">Join</button>
//           </form>
//           <div className="hoomie-footer-contact-row">
//             <div>
//               <div className="hoomie-footer-contact-label">CALL US</div>
//               <div className="hoomie-footer-contact-bold">(+91) 70428 88903</div>
//             </div>
//             <div>
//               <div className="hoomie-footer-contact-label">EMAIL US</div>
//               <div className="hoomie-footer-contact-bold">enquiry@ovikaliving.com</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="hoomie-footer-bottom">
//         <div className="hoomie-footer-copyright">
//           2025 TownManor. All Rights Reserved
//         </div>
//         <div className="hoomie-footer-socials">
//           <a href="#" aria-label="Twitter" className="hoomie-footer-social-icon"><FaLinkedin /></a>
//           <a href="#" aria-label="Facebook" className="hoomie-footer-social-icon"><FaFacebook /></a>
//           <a href="#" aria-label="Instagram" className="hoomie-footer-social-icon"><FaInstagram /></a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default HoomieFooter;
// import React, { useState } from "react";
// import { Mail, Phone, MapPin, Smartphone } from "lucide-react";

// // Helper component for vertical link spacing
// const LinkList = ({ items }) => (
//   <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "4px" }}>
//     {items.map((item, index) => (
//       <a
//         key={index}
//         href="#"
//         style={{
//           fontSize: "13px",
//           color: "#fff",
//           textDecoration: "none",
//           opacity: 1,
//           transition: "opacity 0.2s",
//         }}
//         onMouseOver={e => (e.target.style.opacity = "0.7")}
//         onMouseOut={e => (e.target.style.opacity = "1")}
//       >
//         {item}
//       </a>
//     ))}
//   </div>
// );

// const HoomieFooter = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email submitted:", email);
//     setEmail("");
//   };

//   return (
//     <footer
//       style={{
//         background: "linear-gradient(180deg, #c98b3e 0%, #7c4e13 100%)",
//         color: "#fff",
//         padding: "60px 40px 20px",
//         borderRadius: "20px 20px 0 0",
//         fontFamily: "Poppins, sans-serif",
//         marginLeft: "20px",
//         marginRight: "20px"
//       }}
//     >
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//         {/* Top Section */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr",
//             gap: "40px",
//             marginBottom: "60px",
//           }}
//         >
//           {/* Company Info */}
//           <div style={{  marginTop: "-40px" }}>
//             <img
//               src="/ovika.png"
//               alt="OVIKA Logo"
//               style={{ width: "110px", marginBottom: "10px" }}
//             />
//             <p style={{ fontSize: "13px", lineHeight: "1.7", opacity: "0.95" }}>
//               OVIKA is the flagship brand of Townmanor Technologies Pvt. Ltd.,<br />
//               representing the company's vision for Smart Urban Living. Designed to redefine <br />
//               the way people experience modern city <br />
//               life, OVIKA integrates technology, design, and convenience to create connected and intelligent living spaces.
//             </p>
//           </div>

//           {/* Contact Us */}
//           <div>
//             <h3
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "600",
//                 marginBottom: "12px",
//               }}
//             >
//               Contact Us
//             </h3>
//             <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
//               <MapPin size={16} style={{ marginTop: "2px" }} />
//               <span style={{ fontSize: "13px", lineHeight: "1.6" }}>
//                 ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
//               </span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
//               <Phone size={16} />
//               <span style={{ fontSize: "13px" }}>+91-0120-4420450</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
//               <Smartphone size={16} />
//               <span style={{ fontSize: "13px" }}>7042888903</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
//               <Mail size={16} />
//               <a
//                 href="mailto:corporate@townmanor.in"
//                 style={{
//                   color: "#fff",
//                   fontSize: "13px",
//                   textDecoration: "none",
//                 }}
//               >
//                 corporate@townmanor.in
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "600",
//                 marginBottom: "12px",
//               }}
//             >
//               Quick Links
//             </h3>
//             <LinkList items={[
//               "About Us",
//               "FAQ's",
//               "Terms and condition",
//               "Privacy Policy",
//               "Refund and Cancellation Policy"
//             ]} />
//           </div>

//           {/* Services */}
//           <div>
//             <h3
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "600",
//                 marginBottom: "12px",
//               }}
//             >
//               Services
//             </h3>
//             <LinkList items={[
//               "Home Loan",
//               "Insurance",
//               "Home Interior",
//               "Subscription Plan",
//               "Home Shift",
//               "Property Valuation"
//             ]} />
//           </div>

//           {/* More About */}
//           <div>
//             <h3
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "600",
//                 marginBottom: "12px",
//               }}
//             >
//               More About
//             </h3>
//             <LinkList items={[
//               "Blogs",
//               "News/Article",
//               "Luxury Apartment",
//               "Video Tutorial",
//               "Support Team",
//               "Site Map"
//             ]} />
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div
//           style={{
//             padding: "35px 0",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               width: "80%",
//               maxWidth: "1000px",
//               gap: "40px",
//             }}
//           >
//             {/* LEFT SIDE TEXT */}
//             <p
//               style={{
//                 color: "white",
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 fontFamily: "Poppins, sans-serif",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Get the latest updates about Townmanor and Ovika
//             </p>

//             {/* RIGHT SIDE INPUT BAR */}
//             <form onSubmit={handleSubmit} style={{ margin: 0, padding: 0, width: "100%" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   width: "460px",
//                   height: "46px",
//                   borderRadius: "50px",
//                   backgroundColor: "#fff",
//                   position: "relative",
//                 }}
//               >
//                 <input
//                   type="email"
//                   placeholder="Add your email*"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   style={{
//                     flex: 1,
//                     height: "100%",
//                     padding: "0 20px",
//                     border: "none",
//                     outline: "none",
//                     fontSize: "15px",
//                     borderRadius: "50px",
//                     fontFamily: "Poppins, sans-serif",
//                   }}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     position: "absolute",
//                     right: "0",
//                     height: "100%",
//                     width: "130px",
//                     background: "linear-gradient(90deg, #b62305 0%, #000000 100%)",
//                     color: "white",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: "18px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "50px",
//                     marginRight: "-2px",
//                     transition: "0.3s ease",
//                   }}
//                 >
//                   →
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div
//           style={{
//             borderTop: "1px solid rgba(255, 255, 255, 0.3)",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             fontSize: "13px",
//             paddingTop: "15px",
//             paddingBottom: "15px",
//           }}
//         >
//           {/* LEFT SIDE COPYRIGHT */}
//           <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif" }}>
//             © 2025 TOWNMANOR
//           </span>

//           {/* CENTER SOCIAL ICONS */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "18px",
//             }}
//           >
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 width: "35px",
//                 height: "35px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "50%",
//               }}
//             >
//               <img
//                 src="/Group 1711.png"
//                 alt="Twitter"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                   cursor: "pointer",
//                 }}
//               />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 width: "35px",
//                 height: "35px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "50%",
//               }}
//             >
//               <img
//                 src="/Group 1722.png"
//                 alt="Facebook"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                   cursor: "pointer",
//                 }}
//               />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 width: "35px",
//                 height: "35px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "50%",
//               }}
//             >
//               <img
//                 src="/Group 1733.png"
//                 alt="Instagram"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                   cursor: "pointer",
//                 }}
//               />
//             </a>
//           </div>

//           {/* RIGHT SIDE LINKS */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               color: "#fff",
//               fontFamily: "Poppins, sans-serif",
//             }}
//           >
//             <a
//               href="#terms"
//               style={{
//                 color: "#fff",
//                 textDecoration: "none",
//                 fontSize: "13px",
//               }}
//             >
//               TERMS
//             </a>
//             <span>|</span>
//             <a
//               href="#privacy"
//               style={{
//                 color: "#fff",
//                 textDecoration: "none",
//                 fontSize: "13px",
//               }}
//             >
//               PRIVACY
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default HoomieFooter;

import React, { useState } from "react";
import { Mail, Phone, MapPin, Smartphone } from "lucide-react";

// Helper component for vertical link spacing
const LinkList = ({ items }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "4px" }}>
    {items.map((item, index) => (
      <a
        key={index}
        href="#"
        style={{
          fontSize: "13px",
          color: "#fff",
          textDecoration: "none",
          opacity: 1,
          transition: "opacity 0.2s",
        }}
        onMouseOver={e => (e.target.style.opacity = "0.7")}
        onMouseOut={e => (e.target.style.opacity = "1")}
      >
        {item}
      </a>
    ))}
  </div>
);

const mobileCSS = `
@media (max-width: 900px) {
  .footer-container {
    padding: 32px 12px 10px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .footer-grid {
    display: flex !important;
    flex-wrap: wrap !important;
    flex-direction: column !important;
    gap: 0 !important;
    margin-bottom: 32px !important;
  }
  .footer-col {
    margin-bottom: 32px !important;
    width: 100% !important;
    min-width: unset !important;
    max-width: unset !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .newsletter-row {
    flex-direction: column !important;
    gap: 16px !important;
    align-items: stretch !important;
    width: 100% !important;
  }
  .newsletter-inputrow {
    width: 100% !important;
    min-width: unset !important;
    max-width: unset !important;
  }
  .bottom-row {
    flex-direction: column !important;
    gap: 19px !important;
    font-size: 12px !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
  }
  .logo-col img {
    width: 90px !important;
  }
}
`;

const HoomieFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <>
      <style>{mobileCSS}</style>
      <footer
        className="footer-container"
        style={{
          background: "linear-gradient(180deg, #c98b3e 0%, #7c4e13 100%)",
          color: "#fff",
          padding: "60px 40px 20px",
          borderRadius: "20px 20px 0 0",
          fontFamily: "Poppins, sans-serif",
          marginLeft: "20px",
          marginRight: "20px"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Top Section */}
          <div className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr",
              gap: "40px",
              marginBottom: "60px",
            }}
          >
            {/* Company Info */}
            <div className="footer-col logo-col" style={{ marginTop: "-40px" }}>
              <img
                src="/ovika.png"
                alt="OVIKA Logo"
                style={{ width: "110px", marginBottom: "10px" }}
              />
              <p style={{ fontSize: "13px", lineHeight: "1.7", opacity: "0.95" }}>
                OVIKA is the flagship brand of Townmanor Technologies Pvt. Ltd.,<br />
                representing the company's vision for Smart Urban Living. Designed to redefine <br />
                the way people experience modern city <br />
                life, OVIKA integrates technology, design, and convenience to create connected and intelligent living spaces.
              </p>
            </div>

            {/* Contact Us */}
            <div className="footer-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Contact Us
              </h3>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} style={{ marginTop: "2px" }} />
                <span style={{ fontSize: "13px", lineHeight: "1.6" }}>
                  ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                <Phone size={16} />
                <span style={{ fontSize: "13px" }}>+91-0120-4420450</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <Smartphone size={16} />
                <span style={{ fontSize: "13px" }}>7042888903</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <Mail size={16} />
                <a
                  href="mailto:corporate@townmanor.in"
                  style={{
                    color: "#fff",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  corporate@townmanor.in
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Quick Links
              </h3>
              <LinkList items={[
                "About Us",
                "FAQ's",
                "Terms and condition",
                "Privacy Policy",
                "Refund and Cancellation Policy"
              ]} />
            </div>

            {/* Services */}
            <div className="footer-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Services
              </h3>
              <LinkList items={[
                "Home Loan",
                "Insurance",
                "Home Interior",
                "Subscription Plan",
                "Home Shift",
                "Property Valuation"
              ]} />
            </div>

            {/* More About */}
            <div className="footer-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                More About
              </h3>
              <LinkList items={[
                "Blogs",
                "News/Article",
                "Luxury Apartment",
                "Video Tutorial",
                "Support Team",
                "Site Map"
              ]} />
            </div>
          </div>

          {/* Newsletter */}
          <div
            className="newsletter-row"
            style={{
              padding: "35px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
                maxWidth: "1000px",
                gap: "40px",
              }}
            >
              {/* LEFT SIDE TEXT */}
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Poppins, sans-serif",
                  whiteSpace: "nowrap",
                  marginBottom: "0"
                }}
              >
                Get the latest updates about Townmanor and Ovika
              </p>

              {/* RIGHT SIDE INPUT BAR */}
              <form onSubmit={handleSubmit} className="newsletter-inputrow" style={{ margin: 0, padding: 0, width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "460px",
                    height: "46px",
                    borderRadius: "50px",
                    backgroundColor: "#fff",
                    position: "relative",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Add your email*"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      height: "100%",
                      padding: "0 20px",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      borderRadius: "50px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      position: "absolute",
                      right: "0",
                      height: "100%",
                      width: "130px",
                      background: "linear-gradient(90deg, #b62305 0%, #000000 100%)",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50px",
                      marginRight: "-2px",
                      transition: "0.3s ease",
                    }}
                  >
                    →
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="bottom-row"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: "13px",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            {/* LEFT SIDE COPYRIGHT */}
            <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif" }}>
              © 2025 TOWNMANOR
            </span>

            {/* CENTER SOCIAL ICONS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/Group 1711.png"
                  alt="Twitter"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/Group 1722.png"
                  alt="Facebook"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/Group 1733.png"
                  alt="Instagram"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </a>
            </div>

            {/* RIGHT SIDE LINKS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <a
                href="#terms"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                TERMS
              </a>
              <span>|</span>
              <a
                href="#privacy"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                PRIVACY
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HoomieFooter;
