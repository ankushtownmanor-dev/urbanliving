
// import React, { useState } from "react";
// import { Mail, Phone, MapPin, Smartphone } from "lucide-react";

// const LinkList = ({ items }) => (
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: "15px",
//       marginTop: "4px",
//     }}
//   >
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
//         onMouseOver={(e) => (e.target.style.opacity = "0.7")}
//         onMouseOut={(e) => (e.target.style.opacity = "1")}
//       >
//         {item}
//       </a>
//     ))}
//   </div>
// );

// const mobileCSS = `
// @media (max-width: 786px) {
//   .footer-container {
//     padding: 32px 12px 10px !important;
//     margin-left: 8px !important;
//     margin-right: 8px !important;
//     margin-top: 8px !important;
//   }

//   .footer-grid {
//     display: flex !important;
//     flex-direction: column !important;
//     gap: 35px !important;
//     text-align: center !important;
//     align-items: center !important;
//   }

//   .footer-col {
//     width: 100% !important;
//     text-align: center !important;
//     margin-bottom: 20px !important;
//   }

//   .footer-col p,
//   .footer-col span,
//   .footer-col a {
//     text-align: center !important;
//   }
    

//   /* Contact Us center */
//  \
//   .footer-col div {
//     justify-content: center !important;
//   }

//   /* Newsletter Section Fix */
//   .newsletter-row {
//     flex-direction: column !important;
//     align-items: center !important;
//     justify-content: center !important;
//     text-align: center !important;
//     gap: 18px !important;
//     width: 100% !important;
//   }

//   .newsletter-wrapper {
//     display: flex !important;
//     flex-direction: column !important;
//     align-items: center !important;
//     gap: 16px !important;
//     width: 100% !important;
//   }

//   .newsletter-wrapper p {
//     white-space: normal !important;
//     text-align: center !important;
//     font-size: 15px !important;
//     padding: 0 10px !important;
//     margin: 0 !important;
//   }

//   .newsletter-inputrow {
//     width: 100% !important;
//     display: flex !important;
//     justify-content: center !important;
//   }

//   .newsletter-inputrow div {
//     width: 90% !important;
//     max-width: 360px !important;
//   }

//   /* Bottom Row Fix */
//   .bottom-row {
//     flex-direction: column !important;
//     align-items: center !important;
//     justify-content: center !important;
//     text-align: center !important;
//     gap: 16px !important;
//   }

//   .bottom-row div,
//   .bottom-row span,
//   .bottom-row a {
//     text-align: center !important;
//   }

//   .bottom-row > div:nth-child(2) {
//     justify-content: center !important;
//   }

//   .bottom-row img {
//     margin: 0 auto !important;
//   }

//   .logo-col img {
//     width: 90px !important;
//     margin: 0 auto !important;
//   }
// }
// `;

// const HoomieFooter = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email submitted:", email);
//     setEmail("");
//   };

//   return (
//     <>
//       <style>{mobileCSS}</style>
//       <footer
//         className="footer-container"
//         style={{
//           background: "linear-gradient(180deg, #c98b3e 0%, #7c4e13 100%)",
//           color: "#fff",
//           padding: "60px 40px 20px",
//           borderRadius: "20px 20px 0 0",
//           fontFamily: "Poppins, sans-serif",
//           marginLeft: "20px",
//           marginRight: "20px",
//           marginTop: "20px",
//         }}
//       >
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           {/* Top Section */}
//           <div
//             className="footer-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr",
//               gap: "40px",
//               marginBottom: "60px",
//             }}
//           >
//             {/* Company Info */}
//             <div className="footer-col logo-col" style={{ marginTop: "-40px" }}>
//               <img
//                 src="/ovika.png"
//                 alt="OVIKA Logo"
//                 style={{ width: "110px", marginBottom: "10px" }}
//               />
//               <p
//                 style={{
//                   fontSize: "13px",
//                   lineHeight: "1.7",
//                   opacity: "0.95",
//                 }}
//               >
//                 <span style={{color:"black"}}>OVIKA</span> is the flagship brand of <span style={{color:"black"}}>Townmanor Technologies Pvt. Ltd.</span>,
//                 <br />
//                 representing the company's vision for <span style={{color:"black"}}>Smart Urban Living.</span>
//                 Designed to redefine <br />
//                 the way people experience modern city <br />
//                 life, OVIKA integrates technology, design, and convenience to
//                 create connected and intelligent living spaces.
//               </p>
//             </div>

//             {/* Contact Us */}
// {/* Contact Us */}
// <div className="footer-col">
//   <h3
//     style={{
//       fontSize: "18px",
//       fontWeight: "600",
//       marginBottom: "12px",
//     }}
//   >
//     Contact Us
//   </h3>

//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: "14px",
//       fontSize: "13px",
//     }}
//   >
//     <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
//       <MapPin size={16} style={{ marginTop: "2px" }} />
//       <span style={{ lineHeight: "1.6" }}>
//         ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
//       </span>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <Phone size={16} />
//       <span>+91-0120-4420450</span>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <Smartphone size={16} />
//       <span>7042888903</span>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <Mail size={16} />
//       <a
//         href="mailto:corporate@townmanor.in"
//         style={{
//           color: "#fff",
//           textDecoration: "none",
//           fontSize: "13px",
//         }}
//       >
//         corporate@townmanor.in
//       </a>
//     </div>
//   </div>
// </div>


//             {/* Quick Links */}
//             <div className="footer-col">
//               <h3
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "600",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Quick Links
//               </h3>
//               <LinkList
//                 items={[
//                   "About Us",
//                   "FAQ's",
//                   "Terms and condition",
//                   "Privacy Policy",
//                   "Refund and Cancellation Policy",
//                 ]}
//               />
//             </div>

//             {/* Services */}
//             <div className="footer-col">
//               <h3
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "600",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Services
//               </h3>
//               <LinkList
//                 items={[
//                   "Home Loan",
//                   "Insurance",
//                   "Home Interior",
//                   "Subscription Plan",
//                   "Home Shift",
//                   "Property Valuation",
//                 ]}
//               />
//             </div>

//             {/* More About */}
//             <div className="footer-col">
//               <h3
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "600",
//                   marginBottom: "12px",
//                 }}
//               >
//                 More About
//               </h3>
//               <LinkList
//                 items={[
//                   "Blogs",
//                   "News/Article",
//                   "Luxury Apartment",
//                   "Video Tutorial",
//                   "Support Team",
//                   "Site Map",
//                 ]}
//               />
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div
//             className="newsletter-row"
//             style={{
//               padding: "35px 0",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <div className="newsletter-wrapper">
//               {/* Text on Top */}
//               <p
//                 style={{
//                   color: "white",
//                   fontSize: "16px",
//                   fontWeight: 400,
//                   fontFamily: "Poppins, sans-serif",
//                   whiteSpace: "nowrap",
//                   marginBottom: "0",
//                 }}
//               >
//                 Get the latest updates about Townmanor and Ovika
//               </p>

//               {/* Search Bar Below */}
//               <form
//                 onSubmit={handleSubmit}
//                 className="newsletter-inputrow"
//                 style={{ margin: 0, padding: 0, width: "100%" }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     width: "460px",
//                     height: "46px",
//                     borderRadius: "50px",
//                     backgroundColor: "#fff",
//                     position: "relative",
//                   }}
//                 >
//                   <input
//                     type="email"
//                     placeholder="Add your email*"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     style={{
//                       flex: 1,
//                       height: "100%",
//                       padding: "0 20px",
//                       border: "none",
//                       outline: "none",
//                       fontSize: "15px",
//                       borderRadius: "50px",
//                       fontFamily: "Poppins, sans-serif",
//                     }}
//                     required
//                   />
//                   <button
//                     type="submit"
//                     style={{
//                       position: "absolute",
//                       right: "0",
//                       height: "100%",
//                       width: "130px",
//                       background:
//                         "linear-gradient(90deg, #b62305 0%, #000000 100%)",
//                       color: "white",
//                       border: "none",
//                       cursor: "pointer",
//                       fontSize: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: "50px",
//                       marginRight: "-2px",
//                       transition: "0.3s ease",
//                     }}
//                   >
//                     →
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div
//             className="bottom-row"
//             style={{
//               borderTop: "1px solid rgba(255, 255, 255, 0.3)",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               fontSize: "13px",
//               paddingTop: "15px",
//               paddingBottom: "15px",
//             }}
//           >
//             <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif" }}>
//               © 2025 TOWNMANOR
//             </span>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "18px",
//               }}
//             >
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="/Group 1711.png"
//                   alt="Twitter"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     cursor: "pointer",
//                   }}
//                 />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="/Group 1722.png"
//                   alt="Facebook"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     cursor: "pointer",
//                   }}
//                 />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//               >
//                 <img
//                   src="/Group 1733.png"
//                   alt="Instagram"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     cursor: "pointer",
//                   }}
//                 />
//               </a>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 color: "#fff",
//                 fontFamily: "Poppins, sans-serif",
//               }}
//             >
//               <a
//                 href="#terms"
//                 style={{
//                   color: "#fff",
//                   textDecoration: "none",
//                   fontSize: "13px",
//                 }}
//               >
//                 TERMS
//               </a>
//               <span>|</span>
//               <a
//                 href="#privacy"
//                 style={{
//                   color: "#fff",
//                   textDecoration: "none",
//                   fontSize: "13px",
//                 }}
//               >
//                 PRIVACY
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default HoomieFooter;

import React, { useState } from "react";
import { Mail, Phone, MapPin, Smartphone } from "lucide-react";

const LinkList = ({ items }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "4px",
    }}
  >
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
        onMouseOver={(e) => (e.target.style.opacity = "0.7")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
      >
        {item}
      </a>
    ))}
  </div>
);

const mobileCSS = `
@media (max-width: 786px) {
  .footer-container {
    padding: 32px 12px 10px !important;
    margin-left: 8px !important;
    margin-right: 8px !important;
    margin-top: 8px !important;
  }

  .footer-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 35px !important;
    text-align: center !important;
    align-items: center !important;
  }

  .footer-col {
    width: 100% !important;
    text-align: center !important;
    margin-bottom: 20px !important;
  }

  .footer-col p,
  .footer-col span,
  .footer-col a {
    text-align: center !important;
  }

  /* Ensure Quick Links appears first on mobile */
  .quicklinks-col {
    order: 1 !important;
  }

  .contactus-col {
    order: 2 !important;
  }

  .footer-col div {
    justify-content: center !important;
  }

  .newsletter-row {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 18px !important;
    width: 100% !important;
  }

  .newsletter-wrapper {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 16px !important;
    width: 100% !important;
  }

  .newsletter-wrapper p {
    white-space: normal !important;
    text-align: center !important;
    font-size: 15px !important;
    padding: 0 10px !important;
    margin: 0 !important;
  }

  .newsletter-inputrow {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
  }

  .newsletter-inputrow div {
    width: 90% !important;
    max-width: 360px !important;
  }

  .bottom-row {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 16px !important;
  }

  .bottom-row div,
  .bottom-row span,
  .bottom-row a {
    text-align: center !important;
  }

  .bottom-row > div:nth-child(2) {
    justify-content: center !important;
  }

  .bottom-row img {
    margin: 0 auto !important;
  }

  .logo-col img {
    width: 90px !important;
    margin: 0 auto !important;
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
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Top Section */}
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr",
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
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "1.7",
                  opacity: "0.95",
                }}
              >
                <span style={{ color: "black" }}>OVIKA</span> is the flagship
                brand of{" "}
                <span style={{ color: "black" }}>
                  Townmanor Technologies Pvt. Ltd.
                </span>
                , representing the company's vision for{" "}
                <span style={{ color: "black" }}>Smart Urban Living.</span>{" "}
                Designed to redefine the way people experience modern city life,
                OVIKA integrates technology, design, and convenience to create
                connected and intelligent living spaces.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-col quicklinks-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Quick Links
              </h3>
              <LinkList
                items={[
                  "About Us",
                  "FAQ's",
                  "Terms and condition",
                  "Privacy Policy",
                  "Refund and Cancellation Policy",
                  "Subscription Plan",
                  "Blogs",
                ]}
              />
            </div>

            {/* Contact Us */}
            <div className="footer-col contactus-col">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Contact Us
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  fontSize: "13px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                >
                  <MapPin size={16} style={{ marginTop: "2px" }} />
                  <span style={{ lineHeight: "1.6" }}>
                    ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Phone size={16} />
                  <span>+91-0120-4420450</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Smartphone size={16} />
                  <span>7042888903</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={16} />
                  <a
                    href="mailto:corporate@townmanor.in"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "13px",
                    }}
                  >
                   enquiry@ovikaliving.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div
            className="newsletter-row"
            style={{
              padding: "35px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="newsletter-wrapper">
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Poppins, sans-serif",
                  whiteSpace: "nowrap",
                  marginBottom: "0",
                }}
              >
                Get the latest updates about Townmanor and Ovika
              </p>

              <form
                onSubmit={handleSubmit}
                className="newsletter-inputrow"
                style={{ margin: 0, padding: 0, width: "100%" }}
              >
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
                    onChange={(e) => setEmail(e.target.value)}
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
                      background:
                        "linear-gradient(90deg, #b62305 0%, #000000 100%)",
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

          {/* Bottom Row */}
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
            <span>© 2025 Ovika</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <img src="/Group 1711.png" alt="Twitter" style={{ width: "30px" }} />
              <img src="/Group 1722.png" alt="Facebook" style={{ width: "30px" }} />
              <img src="/Group 1733.png" alt="Instagram" style={{ width: "30px" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
                TERMS
              </a>
              <span>|</span>
              <a href="#privacy" style={{ color: "#fff", textDecoration: "none" }}>
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
