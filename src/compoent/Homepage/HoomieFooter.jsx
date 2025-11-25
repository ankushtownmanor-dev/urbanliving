// import React, { useState } from "react";
// import { Mail, Phone, MapPin, Smartphone } from "lucide-react";

// const LinkList = ({ items }) => (
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: "12px",
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
//     padding: 40px 20px 10px !important;
//     margin: 10px !important;
//     text-align: center !important;
//     border-radius: 18px !important;
//   }

//   .footer-grid {
//     display: flex !important;
//     flex-direction: column !important;
//     align-items: center !important;
//     gap: 35px !important;
//   }

//   .footer-col {
//     width: 100% !important;
 
//   }

//   .footer-col img {
//     margin: 0 auto !important;
//   }

//   .footer-col p {
//     text-align: center !important;
//     font-size: 14px !important;
    
//   }

//   .footer-links {
//     display: flex !important;
//     flex-direction: column !important;
//     align-items: center !important;
//     gap: 18px !important;
//   }

//   .footer-link-columns {
//     display: flex !important;
//     justify-content: space-between !important;
//     align-items: flex-start !important;
//     width: 100% !important;
//     text-align: left !important;
//     gap: 10px !important;
//   }

//   .footer-link-columns h3 {
//     text-align: left !important;
//   }

//   .newsletter-wrapper {
//     width: 100% !important;
//     text-align: center !important;
//   }

//   .newsletter-wrapper p {
//     white-space: normal !important;
//     font-size: 15px !important;
//     padding: 0 10px !important;
//     margin-bottom: 10px !important;
//   }

//   .newsletter-inputrow div {
//     width: 90% !important;
//     max-width: 350px !important;
//     margin: 0 auto !important;
//   }

//   .bottom-row {
//     flex-direction: column !important;
//     align-items: center !important;
//     justify-content: center !important;
//     gap: 16px !important;
//     text-align: center !important;
//   }

//   .bottom-row div {
//     justify-content: center !important;
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
//           {/* Company Info */}
//           <div className="footer-col logo-col" style={{ textAlign: "center", marginBottom: "30px" }}>
//             <img
//               src="/ovika.png"
//               alt="OVIKA Logo"
//               style={{ width: "110px", marginBottom: "10px" }}
//             />
//             <p
//               style={{
//                 fontSize: "13px",
//                 lineHeight: "1.7",
//                 opacity: "0.95",
//               }}
//             >
//               <span style={{ color: "black" }}>OVIKA</span> is the flagship brand of{" "}
//               <span style={{ color: "black" }}>Townmanor Technologies Pvt. Ltd.</span>, representing
//               our vision for <span style={{ color: "black" }}>Smart Urban Living.</span> Designed to
//               redefine the way people experience modern city life, OVIKA integrates technology,
//               design, and convenience to create connected and intelligent living spaces.
//             </p>
//           </div>

//           {/* Quick Links + Contact */}
//           <div className="footer-link-columns">
//             <div className="footer-col">
//               <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
//                 Quick Links
//               </h3>
//               <LinkList
//                 items={[
//                   "About Us",
//                   "FAQ's",
//                   "Terms and condition",
//                   "Privacy Policy",
//                   "Refund and Cancellation Policy",
//                   "Subscription Plan",
//                   "Blogs",
//                 ]}
//               />
//             </div>

//             <div className="footer-col">
//               <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
//                 Contact Us
//               </h3>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "14px",
//                   fontSize: "13px",
//                 }}
//               >
//                 <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
//                   <MapPin size={16} style={{ marginTop: "2px" }} />
//                   <span style={{ lineHeight: "1.6" }}>
//                     ST-304, Eldeco Studio, Sector 93A, Noida, India – 201304
//                   </span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Phone size={16} />
//                   <span>+91-0120-4420450</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Smartphone size={16} />
//                   <span>7042888903</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Mail size={16} />
//                   <a
//                     href="mailto:enquiry@ovikaliving.com"
//                     style={{
//                       color: "#fff",
//                       textDecoration: "none",
//                       fontSize: "13px",
//                     }}
//                   >
//                     enquiry@ovikaliving.com
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Newsletter Section */}
//           <div className="newsletter-wrapper" style={{ marginTop: "40px" }}>
//             <h3 style={{ fontWeight: "600", fontSize: "17px", marginBottom: "10px" }}>
//               Stay Connected
//             </h3>
//             <p style={{ color: "white", fontSize: "14px" }}>
//               Subscribe to get the latest updates from Townmanor & Ovika
//             </p>

//             <form
//               onSubmit={handleSubmit}
//               className="newsletter-inputrow"
//               style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
//             >
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
//                   placeholder="Add your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
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
//                     width: "100px",
//                     background: "linear-gradient(90deg, #b62305 0%, #000000 100%)",
//                     color: "white",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: "18px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "50px",
//                     transition: "0.3s ease",
//                   }}
//                 >
//                   →
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Bottom Row */}
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
//               marginTop: "40px",
//             }}
//           >
//             <span>Follow Us</span>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "18px",
//               }}
//             >
//               <img src="/Group 1711.png" alt="Twitter" style={{ width: "30px" }} />
//               <img src="/Group 1722.png" alt="Facebook" style={{ width: "30px" }} />
//               <img src="/Group 1733.png" alt="Instagram" style={{ width: "30px" }} />
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
//                 @ 2025 Ovika
//               </a>
//               <span>|</span>
//               <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
//                 TERMS
//               </a>
//               <span>|</span>
//               <a href="#privacy" style={{ color: "#fff", textDecoration: "none" }}>
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
//     padding: 32px 16px 10px !important;
//     margin: 10px 8px !important;
//     border-radius: 16px !important;
//   }

//   .footer-grid {
//     display: flex !important;
//     flex-direction: column !important;
//     gap: 40px !important;
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

//   .quicklinks-col {
//     order: 1 !important;
//   }

//   .contactus-col {
//     order: 2 !important;
//   }

//   .footer-col div {
//     justify-content: center !important;
//   }

//   .newsletter-row {
//     flex-direction: column !important;
//     align-items: center !important;
//     justify-content: center !important;
//     text-align: center !important;
//     gap: 20px !important;
//     width: 100% !important;
//     padding: 18px 0 !important;
//   }

//   .newsletter-wrapper {
//     flex-direction: column !important;
//     align-items: center !important;
//     gap: 18px !important;
//     width: 100% !important;
//     text-align: center !important;
//   }

//   .newsletter-wrapper p {
//     font-size: 15px !important;
//     padding: 0 14px !important;
//     line-height: 1.5 !important;
//     margin: 0 auto !important;
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

//   .bottom-row {
//     flex-direction: column !important;
//     align-items: center !important;
//     justify-content: center !important;
//     text-align: center !important;
//     gap: 16px !important;
//     border-top: 1px solid rgba(255, 255, 255, 0.4) !important;
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
//     width: 85px !important;
//     margin: 0 auto 10px !important;
//   }

//   .contactus-col {
//     margin-right: 0 !important;
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
//               gridTemplateColumns: "1.5fr 1fr 1fr",
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
//                 <span style={{ color: "" }}>OVIKA</span> is the flagship
//                 brand of{" "}
//                 <span style={{ color: "" }}>
//                   Townmanor Technologies Pvt. Ltd.
//                 </span>
//                 , representing the company's vision for{" "}
//                 <span style={{ color: "" }}>Smart Urban Living.</span>{" "}
//                 Designed to redefine the way people experience modern city life,
//                 OVIKA integrates technology, design, and convenience to create
//                 connected and intelligent living spaces.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div className="footer-col quicklinks-col">
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
//                   "Subscription Plan",
//                   "Blogs",
//                 ]}
//               />
//             </div>

//             {/* Contact Us */}
//             <div className="footer-col contactus-col" style={{marginRight:"120px"}}>
//               <h3
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: "600",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Contact Us
//               </h3>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "14px",
//                   fontSize: "13px",
//                 }}
//               >
//                 <div
//                   style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
//                 >
//                   <MapPin size={16} style={{ marginTop: "2px" }} />
//                   <span style={{ lineHeight: "1.6" }}>
//                     ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
//                   </span>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Phone size={16} />
//                   <span>+91-0120-4420450</span>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Smartphone size={16} />
//                   <span>7042888903</span>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <Mail size={16} />
//                   <a
//                     href="mailto:corporate@townmanor.in"
//                     style={{
//                       color: "#fff",
//                       textDecoration: "none",
//                       fontSize: "13px",
//                     }}
//                   >
//                    enquiry@ovikaliving.com
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Newsletter Section */}
//          {/* Newsletter Section */}
// <div
//   className="newsletter-row"
//   style={{
//     padding: "35px 0",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <div
//     className="newsletter-wrapper"
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       gap: "16px",
//       width: "100%",
//       maxWidth: "600px",
//     }}
//   >
//     <p
//       style={{
//         color: "white",
//         fontSize: "16px",
//         fontWeight: 400,
//         fontFamily: "Poppins, sans-serif",
//         whiteSpace: "nowrap",
//         margin: 0,
//       }}
//     >
//       Get the latest updates about Townmanor and Ovika
//     </p>

//     <form
//       onSubmit={handleSubmit}
//       className="newsletter-inputrow"
//       style={{ margin: 0, padding: 0, flex: 1 }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           // width: "100%",
//           height: "46px",
//           borderRadius: "50px",
//           backgroundColor: "#fff",
//           position: "relative",
//           width:" 300px"
//         }}
//       >
//         <input
//           type="email"
//           placeholder="Add your email*"
   
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{
//             flex: 1,
//             height: "100%",
//             padding: "0px 20px",
//             border: "none",
//             outline: "none",
//             fontSize: "15px",
//             borderRadius: "50px",
//             fontFamily: "Poppins, sans-serif",
//           }}
//           required
//         />
//         <button
//           type="submit"
//           style={{
//             position: "absolute",
//             right: "0",
//             height: "100%",
//             width: "130px",
//             background:
//               "linear-gradient(90deg, #b62305 0%, #000000 100%)",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             fontSize: "18px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: "50px",
//             marginRight: "-2px",
//             transition: "0.3s ease",
//           }}
//         >
//           →
//         </button>
//       </div>
//     </form>
//   </div>
// </div>


//           {/* Bottom Row */}
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
          

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "18px",
//               }}
//             >
//                 <span>Follow Us</span>
//               <img src="/Group 1711.png" alt="Twitter" style={{ width: "30px" }} />
//               <img src="/Group 1722.png" alt="Facebook" style={{ width: "30px" }} />
//               <img src="/Group 1733.png" alt="Instagram" style={{ width: "30px" }} />
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
//                 © 2025 Ovika
//               </a>
//               <span>|</span>
//               <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
//                 TERMS
//               </a>
//               <span>|</span>
//               <a href="#privacy" style={{ color: "#fff", textDecoration: "none" }}>
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
    padding: 40px 20px 10px !important;
    margin: 10px !important;
    text-align: center !important;
    border-radius: 18px !important;
  }
  
  .footer-grid {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 35px !important;
    margin-bottom: 30px !important;
  }
  
  .desktop-links-grid {
    display: none !important;
  }
  
  .logo-col {
    width: 100% !important;
    text-align: center !important;
  }
  
  .logo-col img {
    margin: 0 auto !important;
  }
  
  .logo-col p {
    text-align: center !important;
    font-size: 10px !important;
  }
  
  .footer-link-columns {
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-start !important;
    width: 100% !important;
    gap: 20px !important;
  }
  
  .footer-link-columns .footer-col {
    flex: 1 !important;
    text-align: left !important;
  }
  
  .footer-link-columns h3 {
    text-align: left !important;
    font-size: 16px !important;
  }
  
  .quicklinks-col, .contactus-col {
    margin: 0 !important;
  }
  
  .contactus-col {
    margin-right: 0 !important;
  }
  
  .newsletter-row {
    padding: 20px 0 !important;
  }
  
  .newsletter-wrapper {
    flex-direction: column !important;
    gap: 15px !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .newsletter-wrapper p {
    white-space: normal !important;
    font-size: 10px !important;
    padding: 0 10px !important;
    margin: 0 !important;
    text-align: center !important;
  }
  
  .newsletter-inputrow {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    flex: none !important;
  }
  
  .newsletter-inputrow > div {
    width: 90% !important;
    max-width: 350px !important;
  }
  
  .bottom-row {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 16px !important;
    text-align: center !important;
  }
  
  .bottom-row > div {
    justify-content: center !important;
    font-size:10px !important;
  }
    .new-link-format{
    font-size: 10px !important;
    }
    .footer-link-columns a,
  .footer-col.quicklinks-col a,
  .footer-col.contactus-col span,
  .footer-col.contactus-col a {
    font-size: 10px !important;
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
                src="/ovikalogo4.png"
                alt="Urban Living Logo"
                style={{ width: "200px", marginBottom: "10px" }}
              />
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "1.7",
                  opacity: "0.95",
                }}
              >
                <span style={{ color: "" }}>OVIKA</span> is the flagship brand of{" "}
                <span style={{ color: "" }}>
                  Townmanor Technologies Pvt. Ltd.
                </span>
                , representing the company's vision for{" "}
                <span style={{ color: "" }}>Smart Urban Living.</span> Designed to
                redefine the way people experience modern city life, OVIKA
                integrates technology, design, and convenience to create connected
                and intelligent living spaces.
              </p>
            </div>

            {/* Quick Links & Contact Us - Desktop Grid */}
            <div className="footer-col quicklinks-col desktop-links-grid">
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

            <div
              className="footer-col contactus-col desktop-links-grid"
              style={{ marginRight: "120px" }}
            >
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
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <MapPin size={16} style={{ marginTop: "2px" }} />
                  <span style={{ lineHeight: "1.6" }}>
                    ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Phone size={16} />
                  <span>+91-0120-4420450</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Smartphone size={16} />
                  <span>7042888903</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Mail size={16} />
                  <a
                    href="mailto:enquiry@ovikaliving.com"
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

          {/* Mobile Quick Links + Contact Us Side by Side */}
          <div className="footer-link-columns" style={{ display: "none" }}>
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
              className="new-link-format"
                items={[
                      "Refund and Cancellation Policy",
                       "Terms and condition",
                   "Subscription Plan",
                    "Privacy Policy",
                       "Blogs",
                        "FAQ's",

                  "About Us",
                 
                
                   
                 
                 
                  
                 
                 
                 
                ]}
              />
            </div>

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
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <MapPin size={16} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ lineHeight: "1.6" }}>
                    ST-304, Eldeco Studio, Sector 93A, Noida India, PIN-201304
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Phone size={16} />
                  <span>+91-0120-4420450</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Smartphone size={16} />
                  <span>7042888903</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Mail size={16} />
                  <a
                    href="mailto:enquiry@ovikaliving.com"
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
              alignItems: "center",
            }}
          >
            <div
              className="newsletter-wrapper"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Poppins, sans-serif",
                  whiteSpace: "nowrap",
                  margin: 0,
                }}
              >
                Get the latest updates about Townmanor and Ovika
              </p>
              <div className="newsletter-inputrow" style={{ margin: 0, padding: 0, flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "46px",
                    borderRadius: "50px",
                    backgroundColor: "#fff",
                    position: "relative",
                    width: "300px",
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
                      padding: "0px 20px",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      borderRadius: "50px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  />
                  <button
                    onClick={handleSubmit}
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
                      marginRight: "-14px",
                      transition: "0.3s ease",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <span>Follow Us</span>
              <img
                src="/Group 1711.png"
                alt="Twitter"
                style={{ width: "30px" }}
              />
              <img
                src="/Group 1722.png"
                alt="Facebook"
                style={{ width: "30px" }}
              />
              <img
                src="/Group 1733.png"
                alt="Instagram"
                style={{ width: "30px" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a
                href="#terms"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                © 2025 Ovika
              </a>
              <span>|</span>
              <a
                href="#terms"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                TERMS
              </a>
              <span>|</span>
              <a
                href="#privacy"
                style={{ color: "#fff", textDecoration: "none" }}
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