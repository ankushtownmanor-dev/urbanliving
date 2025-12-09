// import React, { useContext, useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// const responsiveCSS = `
// @media (max-width: 900px) {
//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 67px !important;
//   }

//   .navbar-inner {
//     width: 100% !important;
//     height: 60px !important;
//     border-radius: 1 !important;
//     padding: 0 10px !important;
//     box-shadow: none !important;
//     display: flex !important;
//     justify-content: center !important; /* Center contents */
//     align-items: center !important;
//     background: #fff !important;
//     position: relative !important;
//   }

//   /* Move hamburger to left corner */
//   .navbar-menu-toggle {
//     display: flex !important;
//     position: absolute !important;
//     left: 22px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   /* Center logo properly */
//   .navbar-logo {
//     height: 75px !important;
//     width: 80px !important;
//     object-fit: contain !important;
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     margin-top: -4px !important;
//   }

//   .navbar-links {
//     display: none !important;
//   }

//   .navbar-right {
//     position: absolute !important;
//     right: 12px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   .property-btn {
//     display: none !important;
//   }

//   .sign-btn {
//     height: 34px !important;
//     font-size: 14px !important;
//     padding: 0 18px !important;
//     border-radius: 18px !important;
//   }

//   .mobile-menu {
//     display: flex !important;
//     flex-direction: column !important;
//     position: absolute !important;
//     top: 60px !important;
//     left: 0 !important;
//     width: 100vw !important;
//     background: #fff !important;
//     z-index: 20 !important;
//     box-shadow: 0 6px 18px 0 rgba(71,38,9,0.18);
//     padding: 18px 0 12px 0 !important;
//     border-radius: 0 0 20px 20px !important;
//     animation: mobileMenuAnim .3s ease;
//   }

//   @keyframes mobileMenuAnim {
//     from { transform: translateY(-32px); opacity: 0; }
//     to { transform: translateY(0); opacity: 1; }
//   }

//   .mobile-link-row {
//     font-size: 16px !important;
//     color: #232323;
//     display: flex;
//     flex-direction: column;
//     gap: 21px;
//     font-weight: 500;
//     align-items: flex-start;
//     padding-left: 24px;
//     margin-bottom: 5px;
//   }
// }
// `
// ;
// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();

//   const { user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (!showMenu) setUserMenuOpen(false);
//   }, [showMenu]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     if (userMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [userMenuOpen]);

//   const handleLogin = () => {
//     navigate("/login", { state: { from: "/" } });
//   };

//   const goToDashboard = () => {
//     setUserMenuOpen(false);
//     navigate("/dashboard");
//   };

//   return (
//     <>
//       <style>{responsiveCSS}</style>
//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 200,
//           fontFamily: "Poppins,sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "22px auto 0",
//             borderRadius: "40px",
//             background: "#fff",
//             boxShadow: "0 2px 24px 0 rgba(71, 38, 9, 0.13)",
//             height: "68px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".3s",
//           }}
//         >
//           {/* Left Section (Logo + Hamburger for mobile) */}
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <img
//               src="/ovika.png"
//               alt="Ovika Logo"
//               className="navbar-logo"
//               style={{
//                 height: "82px",
//                 cursor: "pointer",
//                 objectFit: "contain",
//                 marginBottom: "10px",
//               }}
//               onClick={() => {
//                 navigate("/");
//               }}
//             />

//             {/* Hamburger Icon */}
//             <button
//               className="navbar-menu-toggle"
//               onClick={() => setShowMenu((v) => !v)}
//               aria-label="Toggle menu"
//               style={{
//                 display: "none",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 height: "35px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "block",
//                   width: "28px",
//                   height: "3px",
//                   background: "#232323",
//                   marginBottom: "6px",
//                   borderRadius: "2px",
//                 }}
//               />
//               <span
//                 style={{
//                   display: "block",
//                   width: "28px",
//                   height: "3px",
//                   background: "#232323",
//                   marginBottom: "6px",
//                   borderRadius: "2px",
//                 }}
//               />
//               <span
//                 style={{
//                   display: "block",
//                   width: "28px",
//                   height: "3px",
//                   background: "#232323",
//                   borderRadius: "2px",
//                 }}
//               />
//             </button>
//           </div>

//           {/* Desktop Links */}
//           <div
//             className="navbar-links"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "40px",
//               marginLeft: "480px",
//               fontSize: "17px",
//               color: "#232323",
//               fontWeight: 500,
//               flex: 1,
//               transition: ".3s",
//             }}
//           >
//             {/* <a href="/" style={{ textDecoration: "none", color: "#232323" }}>
//               Home
//             </a>
//             <a href="/services" style={{ textDecoration: "none", color: "#232323" }}>
//               Services
//             </a>
//             <a href="/discover" style={{ textDecoration: "none", color: "#232323" }}>
//               Discover
//             </a>
//             <a href="/contact" style={{ textDecoration: "none", color: "#232323" }}>
//               Contact us
//             </a> */}
//           </div>

//           {/* Right Buttons */}
//           <div
//             className="navbar-right"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "16px",
//             }}
//           >
//             {/* Property Listing (Hidden in Mobile) */}

//             {/* Sign In / User Menu */}
//             {user ? (
//               <div ref={userMenuRef} style={{ position: "relative" }}>
//                 <button
//                   className="sign-btn"
//                   style={{
//                     border: "2px solid #c98b3e",
//                     background: "#fff",
//                     color: "#232323",
//                     fontWeight: 500,
//                     fontSize: "15px",
//                     borderRadius: "22px",
//                     padding: "0 26px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     fontFamily: "Poppins,sans-serif",
//                   }}
//                   onClick={() => setUserMenuOpen((prev) => !prev)}
//                   aria-haspopup="true"
//                   aria-expanded={userMenuOpen}
//                 >
//                   <span
//                     style={{
//                       fontSize: "19px",
//                       fontWeight: "bold",
//                       marginRight: "9px",
//                       lineHeight: 1,
//                     }}
//                   >
//                     {user.username?.[0]?.toUpperCase() || "U"}
//                   </span>
//                   <span>{user.username}</span>
//                   <span style={{ marginLeft: "7px" }}>{userMenuOpen ? "▲" : "▼"}</span>
//                 </button>
//                 {userMenuOpen && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: "50px",
//                       background: "#fff",
//                       borderRadius: "10px",
//                       boxShadow: "0 4px 16px rgba(71,38,9,0.07)",
//                       minWidth: "148px",
//                       zIndex: 1000,
//                     }}
//                   >
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                         color: "#232323",
//                       }}
//                       onClick={goToDashboard}
//                     >
//                       Dashboard
//                     </div>
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         color: "#c23e3e",
//                         borderTop: "1px solid #eee",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                       }}
//                       onClick={logout}
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="sign-btn"
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: "15px",
//                   borderRadius: "22px",
//                   padding: "0 26px",
//                   height: "40px",
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   fontFamily: "Poppins,sans-serif",
//                 }}
//                 onClick={handleLogin}
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {showMenu && (
//           <div className="mobile-menu">
//             <div className="mobile-link-row">
//               <a href="/" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
//                 Home
//               </a>
//               <a href="/services" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
//                 Services
//               </a>
//               <a href="/discover" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
//                 Discover
//               </a>
//               <a href="/contact" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
//                 Contact us
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Navbar;
// import React, { useContext, useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// const responsiveCSS = `
// @media (max-width: 900px) {
//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 67px !important;
//   }

//   .navbar-inner {
//     width: 100% !important;
//     height: 60px !important;
//     border-radius: 1 !important;
//     padding: 0 10px !important;
//     box-shadow: none !important;
//     display: flex !important;
//     justify-content: center !important;
//     align-items: center !important;
//     background: #fff !important;
//     position: relative !important;
//   }

//   .navbar-menu-toggle {
//     display: flex !important;
//     position: absolute !important;
//     left: 22px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   .navbar-logo {
//     height: 75px !important;
//     width: 80px !important;
//     object-fit: contain !important;
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     margin-top: -4px !important;
//   }

//   .navbar-right {
//     position: absolute !important;
//     right: 12px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   .mobile-menu {
//     display: flex !important;
//     flex-direction: column !important;
//     position: absolute !important;
//     top: 60px !important;
//     left: 0 !important;
//     width: 100vw !important;
//     background: #fff !important;
//     z-index: 20 !important;
//     box-shadow: 0 6px 18px 0 rgba(71,38,9,0.18);
//     padding: 18px 0 12px 0 !important;
//     border-radius: 0 0 20px 20px !important;
//     animation: mobileMenuAnim .3s ease;
//   }

//   @keyframes mobileMenuAnim {
//     from { transform: translateY(-32px); opacity: 0; }
//     to { transform: translateY(0); opacity: 1; }
//   }

//   .mobile-link-row {
//     font-size: 16px !important;
//     color: #232323;
//     display: flex;
//     flex-direction: column;
//     gap: 21px;
//     font-weight: 500;
//     align-items: flex-start;
//     padding-left: 24px;
//     margin-bottom: 5px;
//   }
// }
// `;

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();

//   const { user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (!showMenu) setUserMenuOpen(false);
//   }, [showMenu]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     if (userMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [userMenuOpen]);

//   const handleLogin = () => {
//     navigate("/login", { state: { from: "/" } });
//   };

//   const goToDashboard = () => {
//     setUserMenuOpen(false);
//     navigate("/dashboard");
//   };
//   const responsiveCSS = `
// @media (max-width: 900px) {
//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 67px !important;
//   }

//   ...

//   .mobile-link-row {
//     font-size: 16px !important;
//     color: #232323;
//     display: flex;
//     flex-direction: column;
//     gap: 21px;
//     font-weight: 500;
//     align-items: flex-start;
//     padding-left: 24px;
//     margin-bottom: 5px;
//   }

//   /* 👇 Added code: hide username in mobile view */
//   .username-text {
//     display: none !important;
//   }
// }
// `;

//   return (
//     <>
//       <style>{responsiveCSS}</style>
//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 200,
//           fontFamily: "Poppins,sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "22px auto 0",
//             borderRadius: "40px",
//             background: "#fff",
//             boxShadow: "0 2px 24px 0 rgba(71, 38, 9, 0.13)",
//             height: "68px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".3s",
//           }}
//         >
//           {/* Left: Hamburger Icon */}
//           <button
//             className="navbar-menu-toggle"
//             onClick={() => setShowMenu((v) => !v)}
//             aria-label="Toggle menu"
//             style={{
//               position: "absolute",
//               left: "25px",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "6px",
//               padding: 0,
//             }}
//           >
//             <span
//               style={{
//                 width: "28px",
//                 height: "3px",
//                 background: "#232323",
//                 borderRadius: "2px",
//               }}
//             />
//             <span
//               style={{
//                 width: "28px",
//                 height: "3px",
//                 background: "#232323",
//                 borderRadius: "2px",
//               }}
//             />
//             <span
//               style={{
//                 width: "28px",
//                 height: "3px",
//                 background: "#232323",
//                 borderRadius: "2px",
//               }}
//             />
//           </button>

//           {/* Center: Logo */}
//           <img
//             src="/ovikalogo11.png"
//             alt="Urban Living Logo"
//             className="navbar-logo"
//             style={{
//               height: "170px",
//               cursor: "pointer",
//               objectFit: "contain",
//               position: "absolute",
//               left: "45%",
//               transform: "translateX(-50%)",
//               marginTop:"30px"
//             }}
//             onClick={() => navigate("/")}
//           />

//           {/* Right: Sign In / User */}
//           <div
//             className="navbar-right"
//             style={{
//               position: "absolute",
//               right: "30px",
//               display: "flex",
//               alignItems: "center",
//               gap: "16px",
//             }}
//           >
//             {user ? (
//               <div ref={userMenuRef} style={{ position: "relative" }}>
//                 <button
//                   className="sign-btn"
//                   style={{
//                     border: "2px solid #c98b3e",
//                     background: "#fff",
//                     color: "#232323",
//                     fontWeight: 500,
//                     fontSize: "15px",
//                     borderRadius: "22px",
//                     padding: "0 26px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     fontFamily: "Poppins,sans-serif",
//                   }}
//                   onClick={() => setUserMenuOpen((prev) => !prev)}
//                   aria-haspopup="true"
//                   aria-expanded={userMenuOpen}
//                 >
//                <span style={{ fontSize: "19px", marginRight: "9px" }}>
//   {user.username?.[0]?.toUpperCase() || "U"}
// </span>
// <span className="username-text">{user.username}</span>
// <span style={{ marginLeft: "7px" }}>{userMenuOpen ? "▲" : "▼"}</span>

//                 </button>
//                 {userMenuOpen && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: "50px",
//                       background: "#fff",
//                       borderRadius: "10px",
//                       boxShadow: "0 4px 16px rgba(71,38,9,0.07)",
//                       minWidth: "148px",
//                       zIndex: 1000,
//                     }}
//                   >
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                         color: "#232323",
//                       }}
//                       onClick={goToDashboard}
//                     >
//                       Dashboard
//                     </div>
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         color: "#c23e3e",
//                         borderTop: "1px solid #eee",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                       }}
//                       onClick={logout}
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="sign-btn"
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: "15px",
//                   borderRadius: "22px",
//                   padding: "0 26px",
//                   height: "40px",
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   fontFamily: "Poppins,sans-serif",
//                 }}
//                 onClick={handleLogin}
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Dropdown Menu */}
//         {showMenu && (
//           <div
//             className="mobile-menu"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               position: "absolute",
//               top: "88px",
//               left: "0",
//               background: "#fff",
//               width: "100%",
//               borderRadius: "0 0 20px 20px",
//               boxShadow: "0 6px 18px rgba(71,38,9,0.18)",
//               animation: "mobileMenuAnim .3s ease",
//               zIndex: 999,
//             }}
//           >
//             <div
//               className="mobile-link-row"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "20px",
//                 padding: "20px 0 20px 30px",
//                 fontSize: "16px",
//                 fontWeight: 500,
//                 color: "#232323",
//               }}
//             >
//               <a href="/" onClick={() => setShowMenu(false)} style={{ textDecoration: "none", color: "#232323" }}>
//                 Home
//               </a>
//               <a href="/services" onClick={() => setShowMenu(false)} style={{ textDecoration: "none", color: "#232323" }}>
//                 Services
//               </a>
//               <a href="/dashboard" onClick={() => setShowMenu(false)} style={{ textDecoration: "none", color: "#232323" }}>
//                 Dashboard
//               </a>
//               <a href="/contact" onClick={() => setShowMenu(false)} style={{ textDecoration: "none", color: "#232323" }}>
//                 Contact
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Navbar;

// import React, { useContext, useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// const responsiveCSS = `
// @media (max-width: 900px) {
//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 67px !important;
//   }

//   .navbar-inner {
//     width: 100% !important;
//     height: 60px !important;
//     border-radius: 1 !important;
//     padding: 0 10px !important;
//     box-shadow: none !important;
//     display: flex !important;
//     justify-content: center !important;
//     align-items: center !important;
//     background: #fff !important;
//     position: relative !important;
//   }

//   .navbar-menu-toggle {
//     display: flex !important;
//     position: absolute !important;
//     left: 22px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   .navbar-logo {
//     height: 75px !important;
//     width: 80px !important;
//     object-fit: contain !important;
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     margin-top: -4px !important;
//   }

//   .navbar-right {
//     position: absolute !important;
//     right: 12px !important;
//     top: 50% !important;
//     transform: translateY(-50%) !important;
//   }

//   .mobile-menu {
//     display: flex !important;
//     flex-direction: column !important;
//     position: absolute !important;
//     top: 60px !important;
//     left: 0 !important;
//     width: 100vw !important;
//     background: #fff !important;
//     z-index: 20 !important;
//     box-shadow: 0 6px 18px 0 rgba(71,38,9,0.18);
//     padding: 18px 0 12px 0 !important;
//     border-radius: 0 0 20px 20px !important;
//     animation: mobileMenuAnim .3s ease;
//   }

//   @keyframes mobileMenuAnim {
//     from { transform: translateY(-32px); opacity: 0; }
//     to { transform: translateY(0); opacity: 1; }
//   }

//   .mobile-link-row {
//     font-size: 16px !important;
//     color: #232323;
//     display: flex;
//     flex-direction: column;
//     gap: 21px;
//     font-weight: 500;
//     align-items: flex-start;
//     padding-left: 24px;
//     margin-bottom: 5px;
//   }

//   .username-text {
//     display: none !important;
//   }
// }
// `;

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();

//   const { user, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (!showMenu) setUserMenuOpen(false);
//   }, [showMenu]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     if (userMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [userMenuOpen]);

//   const handleLogin = () => navigate("/login");

//   return (
//     <>
//       <style>{responsiveCSS}</style>

//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 99999,    // ⭐ Navbar is always above hero image
//           fontFamily: "Poppins,sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "22px auto 0",
//             borderRadius: "40px",
//             background: "#fff",
//             boxShadow: "0 2px 24px 0 rgba(71, 38, 9, 0.13)",
//             height: "68px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".3s",
//             zIndex: 999999,    // ⭐ Ensures buttons + user menu stay above hero
//           }}
//         >
//           {/* Hamburger */}
//           <button
//             className="navbar-menu-toggle"
//             onClick={() => setShowMenu(!showMenu)}
//             aria-label="Toggle menu"
//             style={{
//               position: "absolute",
//               left: "25px",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "6px",
//               padding: 0,
//             }}
//           >
//             <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
//             <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
//             <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
//           </button>

//           {/* Logo */}
//           <img
//             src="/ovikalogo11.png"
//             alt="logo"
//             className="navbar-logo"
//             style={{
//               height: "170px",
//               cursor: "pointer",
//               objectFit: "contain",
//               position: "absolute",
//               left: "45%",
//               transform: "translateX(-50%)",
//               marginTop: "30px",
//             }}
//             onClick={() => navigate("/")}
//           />

//           {/* Right Side */}
//           <div
//             className="navbar-right"
//             style={{
//               position: "absolute",
//               right: "30px",
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//             }}
//           >
//             {/* ⭐ Dashboard Button (only when logged in) */}
//             {user && (
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: "15px",
//                   borderRadius: "22px",
//                   padding: "0 22px",
//                   height: "40px",
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 Dashboard
//               </button>
//             )}

//             {/* User / Login */}
//             {user ? (
//               <div ref={userMenuRef} style={{ position: "relative" }}>
//                 <button
//                   className="sign-btn"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   aria-haspopup="true"
//                   aria-expanded={userMenuOpen}
//                   style={{
//                     border: "2px solid #c98b3e",
//                     background: "#fff",
//                     color: "#232323",
//                     fontWeight: 500,
//                     fontSize: "15px",
//                     borderRadius: "22px",
//                     padding: "0 22px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <span style={{ fontSize: "19px", marginRight: "9px" }}>
//                     {user.username?.[0]?.toUpperCase() || "U"}
//                   </span>
//                   <span className="username-text">{user.username}</span>
//                   <span style={{ marginLeft: "7px" }}>{userMenuOpen ? "▲" : "▼"}</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: "50px",
//                       background: "#fff",
//                       borderRadius: "10px",
//                       boxShadow: "0 4px 16px rgba(71,38,9,0.07)",
//                       minWidth: "148px",
//                       zIndex: 999999,
//                     }}
//                   >
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                         color: "#232323",
//                       }}
//                       onClick={() => navigate("/dashboard")}
//                     >
//                       Dashboard
//                     </div>
//                     <div
//                       style={{
//                         padding: "12px 16px",
//                         cursor: "pointer",
//                         color: "#c23e3e",
//                         borderTop: "1px solid #eee",
//                         fontWeight: 500,
//                         fontSize: "15px",
//                       }}
//                       onClick={logout}
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="sign-btn"
//                 onClick={handleLogin}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: "15px",
//                   borderRadius: "22px",
//                   padding: "0 22px",
//                   height: "40px",
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {showMenu && (
//           <div
//             className="mobile-menu"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               position: "absolute",
//               top: "88px",
//               left: 0,
//               background: "#fff",
//               width: "100%",
//               borderRadius: "0 0 20px 20px",
//               boxShadow: "0 6px 18px rgba(71,38,9,0.18)",
//               animation: "mobileMenuAnim .3s ease",
//               zIndex: 999999,
//             }}
//           >
//             <div
//               className="mobile-link-row"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "20px",
//                 padding: "20px 0 20px 30px",
//                 fontSize: "16px",
//                 fontWeight: 500,
//                 color: "#232323",
//               }}
//             >
//               <a href="/">Home</a>
//               <a href="/services">Services</a>
//               <a href="/dashboard">Dashboard</a>
//               <a href="/contact">Contact</a>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Navbar;
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Login/AuthContext";

// ✅ Animation for sidebar (now from TOP)
const globalCSS = `
@keyframes slideDownSidebar {
  from { transform: translateY(-40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;

const responsiveCSS = `
@media (max-width: 900px) {
  .navbar-outer {
    padding: 0 !important;
    min-height: 67px !important;
  }

  .navbar-inner {
    width: 100% !important;
    height: 60px !important;
    border-radius: 1 !important;
    padding: 0 10px !important;
    box-shadow: none !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: #fff !important;
    position: relative !important;
  }

  .navbar-menu-toggle {
    display: flex !important;
    position: absolute !important;
    left: 22px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  .navbar-logo {
    height: 75px !important;
    width: 80px !important;
    object-fit: contain !important;
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    margin-top: -4px !important;
  }

  .navbar-right {
    position: absolute !important;
    right: 12px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  .mobile-menu {
    display: flex !important;
    flex-direction: column !important;
    position: absolute !important;
    top: 60px !important;
    left: 0 !important;
    width: 100vw !important;
    background: #fff !important;
    z-index: 20 !important;
    box-shadow: 0 6px 18px 0 rgba(71,38,9,0.18);
    padding: 18px 0 12px 0 !important;
    border-radius: 0 0 20px 20px !important;
    animation: mobileMenuAnim .3s ease;
  }

  @keyframes mobileMenuAnim {
    from { transform: translateY(-32px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .mobile-link-row {
    font-size: 16px !important;
    color: #232323;
    display: flex;
    flex-direction: column;
    gap: 21px;
    font-weight: 500;
    align-items: flex-start;
    padding-left: 24px;
    margin-bottom: 5px;
  }

  .username-text {
    display: none !important;
  }
}
`;

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);        // hamburger mobile
  const [sideMenuOpen, setSideMenuOpen] = useState(false); // right sidebar
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogin = () => navigate("/login");

  const goDashboard = () => {
    setSideMenuOpen(false);
    navigate("/dashboard");
  };

  const goListingPage = () => {
    setSideMenuOpen(false);
    // yahan apna actual listing route use karo
    navigate("/listed1");
  };
   const goOwnerDashboard = () => {
    setSideMenuOpen(false);
    // yahan apna actual listing route use karo
    navigate("/admindashboard");
  };

  const handleLogout = () => {
    setSideMenuOpen(false);
    logout();
  };

  return (
    <>
      <style>{globalCSS}</style>
      <style>{responsiveCSS}</style>

      <div
        className="navbar-outer"
        style={{
          minHeight: "90px",
          position: "relative",
          zIndex: 99999,
          fontFamily: "Poppins,sans-serif",
          background: "transparent",
        }}
      >
        <div
          className="navbar-inner"
          style={{
            width: "94%",
            margin: "22px auto 0",
            borderRadius: "40px",
            background: "#fff",
            boxShadow: "0 2px 24px 0 rgba(71, 38, 9, 0.13)",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "0 30px",
            transition: ".3s",
            zIndex: 999999,
          }}
        >
          {/* Left: Hamburger (mobile) */}
          <button
            className="navbar-menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
            style={{
              position: "absolute",
              left: "25px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              padding: 0,
            }}
          >
            <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
            <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
            <span style={{ width: "28px", height: "3px", background: "#232323", borderRadius: "2px" }} />
          </button>

          {/* Center: Logo */}
          <img
            src="/ovikalogo11.png"
            alt="logo"
            className="navbar-logo"
            style={{
              height: "170px",
              cursor: "pointer",
              objectFit: "contain",
              position: "absolute",
              left: "45%",
              transform: "translateX(-50%)",
              marginTop: "30px",
            }}
            onClick={() => navigate("/")}
          />

          {/* Right: User / Sign in */}
          <div
            className="navbar-right"
            style={{
              position: "absolute",
              right: "30px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {user ? (
              <button
                className="sign-btn"
                onClick={() => setSideMenuOpen(true)}   // sidebar open
                aria-haspopup="true"
                aria-expanded={sideMenuOpen}
                style={{
                  border: "2px solid #c98b3e",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 500,
                  fontSize: "15px",
                  borderRadius: "22px",
                  padding: "0 22px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "19px", marginRight: "9px" }}>
                  {user.username?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="username-text">{user.username}</span>
                <span style={{ marginLeft: "7px" }}>▼</span>
              </button>
            ) : (
              <button
                className="sign-btn"
                onClick={handleLogin}
                style={{
                  border: "2px solid #c98b3e",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 500,
                  fontSize: "15px",
                  borderRadius: "22px",
                  padding: "0 22px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile dropdown (hamburger) */}
        {showMenu && (
          <div
            className="mobile-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "88px",
              left: 0,
              background: "#fff",
              width: "100%",
              borderRadius: "0 0 20px 20px",
              boxShadow: "0 6px 18px rgba(71,38,9,0.18)",
              animation: "mobileMenuAnim .3s ease",
              zIndex: 999999,
            }}
          >
            <div
              className="mobile-link-row"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px 0 20px 30px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#232323",
              }}
            >
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        )}

        {/* ⭐ Right Sidebar Menu */}
        {user && sideMenuOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setSideMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                zIndex: 1000000,
              }}
            />

            {/* Panel */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "min(380px, 88vw)",
                background: "#fff",
                borderRadius: "24px 0 0 24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
                padding: "22px 22px 30px",
                zIndex: 1000001,
                display: "flex",
                flexDirection: "column",
                animation: "slideDownSidebar .28s ease-out", // 🔥 from TOP now
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#1f1f1f",
                    }}
                  >
                    Menu
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                      marginTop: "2px",
                    }}
                  >
                    Hi, {user.username}
                  </div>
                </div>

                <button
                  onClick={() => setSideMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    border: "none",
                    background: "#f3f3f3",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Highlight card */}
              <div
                style={{
                  background: "#fbf5ec",
                  borderRadius: "18px",
                  padding: "14px 14px 16px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                    color: "#3a2c18",
                  }}
                >
                  Manage your hosting
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#7a6b57",
                    lineHeight: 1.5,
                  }}
                >
                  Quickly access your dashboard, listings and account actions.
                </div>
              </div>

              {/* Menu items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {/* Dashboard */}
                <button
                  onClick={goDashboard}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "10px 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "12px",
                      background: "#f4f4f4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    🏠
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      Dashboard
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8a8a8a",
                      }}
                    >
                      View your Bookings & performance
                    </div>
                  </div>
                </button>

                {/* Listing page */}
                <button
                  onClick={goListingPage}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "10px 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "12px",
                      background: "#f4f4f4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    📋
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      List your Property
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8a8a8a",
                      }}
                    >
                      Create your listings
                    </div>
                  </div>
                </button>

                {/* Ownwer Dashoboard */}
                  <button
                  onClick={goOwnerDashboard}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "10px 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "12px",
                      background: "#f4f4f4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    🏠
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      Owner Dashboard
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8a8a8a",
                      }}
                    >
                   Show all properties and bookings
                    </div>
                  </div>
                </button>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #eee",
                    margin: "14px 0",
                  }}
                />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "8px 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "#fdeceb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      color: "#c23e3e",
                    }}
                  >
                    ⬅
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#c23e3e",
                    }}
                  >
                    Log out
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;

