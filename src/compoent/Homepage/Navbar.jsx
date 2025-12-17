// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// /* -------------------------
//   Navbar (updated) - mobile: show search icon only (no text), desktop unchanged
// -------------------------*/
// const globalCSS = `
// @keyframes slideDownSidebar {
//   from { transform: translateY(-40px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// }
// `;

// const responsiveCSS = `
// /* Mobile */
// @media (max-width: 900px) {
//   .navbar-outer { padding: 0 !important; min-height: 72px !important; }
//   .navbar-inner { width: 100% !important; height: 64px !important; border-radius: 8px !important; padding: 0 12px !important; box-shadow: none !important; display: flex !important; justify-content: center !important; align-items: center !important; background: #fff !important; position: relative !important; }
//   .navbar-menu-toggle { display: flex !important; position: absolute !important; left: 12px !important; top: 50% !important; transform: translateY(-50%) !important; }
//   .navbar-logo { height: 130px !important; width: auto !important; object-fit: contain !important; position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; margin-top: 25px !important; z-index: 5 !important; }
//   .navbar-right { position: absolute !important; right: 10px !important; top: 50% !important; transform: translateY(-50%) !important; display: flex !important; gap: 8px !important; align-items: center !important; }
//   .search-btn { padding: 6px 8px !important; height: 36px !important; border-radius: 18px !important; font-size: 13px !important; }
//   .search-btn .search-text { display: none !important; } /* hide text on mobile */
//   .search-btn svg { width: 18px !important; height: 18px !important; }
//   .sign-btn { padding: 0 12px !important; height: 36px !important; border-radius: 18px !important; }
//   .mobile-slide-panel { display: flex !important; flex-direction: column !important; position: fixed !important; top: 70px !important; left: 12px !important; width: calc(320px) !important; background: #fff !important; z-index: 1200 !important; box-shadow: 0 6px 18px rgba(71,38,9,0.18) !important; padding: 12px !important; border-radius: 12px !important; animation: mobileMenuAnim .18s ease !important; }
//   @keyframes mobileMenuAnim { from { transform: translateY(-12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
// }

// /* Desktop */
// @media (min-width: 901px) {
//   .navbar-logo { height: 150px !important; margin-top: 19px !important; z-index: 5 !important; left: 50% !important; transform: translateX(-50%) !important; }
//   .search-btn { border: 2px solid #c98b3e !important; }
// }
// `;

// /* small shared style objects used inline below */
// const navButtonStyle = {
//   border: "none",
//   background: "transparent",
//   textAlign: "left",
//   padding: 6,
//   fontSize: 15,
//   cursor: "pointer",
// };

// const panelButtonStyle = {
//   border: "none",
//   background: "transparent",
//   padding: "10px 4px",
//   display: "flex",
//   alignItems: "center",
//   gap: 12,
//   cursor: "pointer",
// };

// const iconBoxStyle = {
//   width: 32,
//   height: 32,
//   borderRadius: 12,
//   background: "#f4f4f4",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: 16,
// };

// export default function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [sideMenuOpen, setSideMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout, login } = useContext(AuthContext);

//   const STORAGE_KEYS = ["user", "tm_user"];

//   useEffect(() => {
//     if (user) return;
//     for (const k of STORAGE_KEYS) {
//       try {
//         const raw = localStorage.getItem(k);
//         if (!raw) continue;
//         const parsed = JSON.parse(raw);
//         if (
//           parsed &&
//           (parsed.id ||
//             parsed._id ||
//             parsed.owner_id ||
//             parsed.userId ||
//             parsed.uid)
//         ) {
//           if (typeof login === "function") {
//             login(parsed);
//           } else {
//             try {
//               localStorage.setItem("tm_user", JSON.stringify(parsed));
//             } catch (e) {}
//           }
//           break;
//         }
//       } catch (e) {}
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleLogin = () => navigate("/login");
//   const goDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/dashboard");
//   };
//   const goListingPage = () => {
//     setSideMenuOpen(false);
//     navigate("/listed1");
//   };
//   const goOwnerDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/admindashboard");
//   };
//   const goProperties = () => {
//     setShowMenu(false);
//     setSideMenuOpen(false);
//     navigate("/properties");
//   };

//   const handleLogout = () => {
//     setSideMenuOpen(false);
//     try {
//       STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
//       try {
//         sessionStorage.removeItem("user");
//         sessionStorage.removeItem("tm_user");
//       } catch (e) {}
//     } catch (err) {
//       console.warn("Navbar: clearing storage failed", err);
//     }
//     try {
//       logout();
//     } catch (e) {
//       console.warn("Navbar: logout() threw", e);
//     }
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <style>{globalCSS}</style>
//       <style>{responsiveCSS}</style>

//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 99999,
//           fontFamily: "Poppins, sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "18px auto 0",
//             borderRadius: 40,
//             background: "#fff",
//             boxShadow: "0 2px 24px rgba(71,38,9,0.13)",
//             height: 68,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".28s",
//             zIndex: 999999,
//           }}
//         >
//           {/* Hamburger (left) */}
//           <button
//             className="navbar-menu-toggle"
//             onClick={() => setShowMenu(!showMenu)}
//             aria-label="Toggle menu"
//             style={{
//               position: "absolute",
//               left: 20,
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 6,
//               padding: 0,
//               zIndex: 12,
//             }}
//           >
//             <span
//               style={{
//                 width: 26,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 20,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 14,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//           </button>

//           {/* Logo (center) */}
//           <img
//             src="/ovikalogo11.png"
//             alt="logo"
//             className="navbar-logo"
//             style={{
//               height: "110px", // desktop default; responsive CSS will override on mobile
//               cursor: "pointer",
//               objectFit: "contain",
//               position: "absolute",
//               left: "50%",
//               transform: "translateX(-50%)",
//               marginTop: 8,
//               zIndex: 5,
//             }}
//             onClick={() => navigate("/")}
//           />

//           {/* Right area: Search (icon-only on mobile) + Auth */}
//           <div
//             className="navbar-right"
//             style={{
//               position: "absolute",
//               right: 24,
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               zIndex: 1000002,
//             }}
//           >
//             {/* Search button - golden border like Sign In; on mobile shows icon only */}
//             <button
//               onClick={goProperties}
//               aria-label="Search properties"
//               className="search-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 14,
//                 borderRadius: 22,
//                 padding: "8px 12px",
//                 height: 40,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 8,
//                 boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden
//               >
//                 <path
//                   d="M21 21l-4.35-4.35"
//                   stroke="#232323"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <circle
//                   cx="11"
//                   cy="11"
//                   r="6"
//                   stroke="#232323"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span className="search-text" style={{ fontSize: 14 }}>
//                 Search
//               </span>
//             </button>

//             {/* Auth button */}
//             {user ? (
//               <button
//                 className="sign-btn"
//                 onClick={() => setSideMenuOpen(true)}
//                 aria-haspopup="true"
//                 aria-expanded={sideMenuOpen}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 18px",
//                   height: 40,
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 <span style={{ fontSize: 18, marginRight: 8 }}>
//                   {user.username?.[0]?.toUpperCase() || "U"}
//                 </span>
//                 <span className="username-text" style={{ marginRight: 8 }}>
//                   {user.username}
//                 </span>
//                 <span style={{ marginLeft: 4 }}>▼</span>
//               </button>
//             ) : (
//               <button
//                 className="sign-btn"
//                 onClick={handleLogin}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 20px",
//                   height: 40,
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

//         {/* Mobile slide panel (left) */}
//         {showMenu && (
//           <>
//             <div
//               onClick={() => setShowMenu(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.18)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               className="mobile-slide-panel"
//               style={{
//                 position: "fixed",
//                 top: 70,
//                 left: 12,
//                 width: "min(320px, 86vw)",
//                 background: "#fff",
//                 borderRadius: 12,
//                 boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
//                 padding: 12,
//                 zIndex: 1000001,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//                 animation: "mobileMenuAnim .18s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div style={{ fontSize: 16, fontWeight: 600 }}>Menu</div>
//                 <button
//                   onClick={() => setShowMenu(false)}
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 className="mobile-link-row"
//                 style={{ display: "flex", flexDirection: "column", gap: 12 }}
//               >
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/services");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Services
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/dashboard");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Dashboard
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/contact");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Contact
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     window.open("https://townmanor.example.com", "_blank");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   TownManor
//                 </button>
//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #eee",
//                     marginTop: 6,
//                   }}
//                 />
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     goProperties();
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Search Properties
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Right-side user panel */}
//         {user && sideMenuOpen && (
//           <>
//             <div
//               onClick={() => setSideMenuOpen(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.25)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 right: 0,
//                 height: "100vh",
//                 width: "min(380px, 88vw)",
//                 background: "#fff",
//                 borderRadius: "24px 0 0 24px",
//                 boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
//                 padding: "22px 22px 30px",
//                 zIndex: 1000003,
//                 display: "flex",
//                 flexDirection: "column",
//                 animation: "slideDownSidebar .28s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{ fontSize: 20, fontWeight: 600, color: "#1f1f1f" }}
//                   >
//                     Menu
//                   </div>
//                   <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
//                     Hi, {user.username}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSideMenuOpen(false)}
//                   aria-label="Close menu"
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 18,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 style={{
//                   background: "#fbf5ec",
//                   borderRadius: 18,
//                   padding: "14px 14px 16px",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 600,
//                     marginBottom: 4,
//                     color: "#3a2c18",
//                   }}
//                 >
//                   Manage your hosting
//                 </div>
//                 <div
//                   style={{ fontSize: 12, color: "#7a6b57", lineHeight: 1.5 }}
//                 >
//                   Quickly access your dashboard, listings and account actions.
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 10,
//                   flex: 1,
//                 }}
//               >
//                 <button onClick={goDashboard} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>🏠</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Dashboard
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       View your Bookings & performance
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goListingPage} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>📋</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       List your Property
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Create your listings
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goOwnerDashboard} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>🏠</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Owner Dashboard
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Show your properties and bookings
//                     </div>
//                   </div>
//                 </button>

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #eee",
//                     margin: "14px 0",
//                   }}
//                 />

//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     border: "none",
//                     background: "transparent",
//                     padding: "8px 4px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     cursor: "pointer",
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: 999,
//                       background: "#fdeceb",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 15,
//                       color: "#c23e3e",
//                     }}
//                   >
//                     ⬅
//                   </span>
//                   <span
//                     style={{ fontSize: 14, fontWeight: 500, color: "#c23e3e" }}
//                   >
//                     Log out
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
 

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// /* -------------------------
//   Navbar (updated) - mobile: show search icon only (no text), desktop unchanged
// -------------------------*/
// const globalCSS = `
// @keyframes slideDownSidebar {
//   from { transform: translateY(-40px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// }
// `;

// const responsiveCSS = `
// /* ================= MOBILE FIX ================= */
// @media (max-width: 900px) {

//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 64px !important;
//   }

//   .navbar-inner {
//     width: 100% !important;
//     height: 64px !important;
//     margin: 0 !important;
//     border-radius: 0 !important;
//     padding: 0 12px !important;
//     box-shadow: 0 2px 10px rgba(0,0,0,.08) !important;
//     display: flex !important;
//     align-items: center !important;
//     justify-content: space-between !important;
//   }

//   /* Hamburger */
//   .navbar-menu-toggle {
//     position: relative !important;
//     left: 0 !important;
//     z-index: 10 !important;
//   }

//   /* LOGO CENTER */
//   .navbar-logo {
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     height: 70px !important;
//     margin: 0 !important;
//     z-index: 5 !important;
//   }

//   /* LEFT BUTTONS (ICON ONLY) */
//   .navbar-left-btns button,
//   .navbar-right-desktop button,
//   .search-btn,
//   .sign-btn {
//     width: 36px !important;
//     height: 36px !important;
//     padding: 0 !important;
//     border-radius: 50% !important;
//     justify-content: center !important;
//     align-items: center !important;
//   }

//   /* TEXT HIDE – ICON ONLY */
//   .navbar-left-btns span:last-child,
//   .navbar-right-desktop span:last-child,
//   .search-btn .search-text,
//   .sign-btn .username-text,
//   .sign-btn span:last-child {
//     display: none !important;
//   }

//   .navbar-left-btns span:first-child,
//   .navbar-right-desktop span:first-child,
//   .search-btn svg,
//   .sign-btn span:first-child {
//     margin: 0 !important;
//     font-size: 18px !important;
//   }

//   /* RIGHT SECTION */
//   .navbar-right {
//     position: relative !important;
//     right: 0 !important;
//     gap: 8px !important;
//   }

//   /* MOBILE MENU PANEL */
//   .mobile-slide-panel {
//     top: 64px !important;
//     left: 10px !important;
//     width: min(300px, 88vw) !important;
//     border-radius: 14px !important;
//   }
// }

// /* ================= DESKTOP (UNCHANGED) ================= */
// @media (min-width: 901px) {

//   .navbar-inner {
//     justify-content: space-between !important;
//     padding: 0 48px !important;
//   }

//   /* LEFT : Hamburger + Book Stay */
//   .navbar-menu-toggle {
//     position: relative !important;
//     left: 0 !important;
//   }

//   .navbar-left-btns {
//     position: relative !important;
//     left: 0 !important;
//     display: flex !important;
//     align-items: center !important;
//     gap: 14px !important;
//   }

//   /* CENTER LOGO (NO OVERLAP) */
//   .navbar-logo {
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     height: 120px !important;
//     margin-top: 12px !important;
//     z-index: 5 !important;
//     pointer-events: auto !important;
//   }

//   /* RIGHT : Host + Search + User */
//   .navbar-right-desktop {
//     position: relative !important;
//     right: -140px !important;   /* 👈 YAHI SHIFT */
//     display: flex !important;
//     gap: 10px !important;
//     align-items: center !important;
//   }

//   .navbar-right {
//     position: relative !important;
//     right: 0 !important;
//     display: flex !important;
//     gap: 12px !important;
//     align-items: center !important;
//   }

//   .sign-btn { 
//     padding: 0 !important; 
//     width: 40px !important;
//     height: 40px !important; 
//     border-radius: 20px !important; 
//     justify-content: center !important;
//   }
//   .sign-btn .username-text { display: none !important; }
//   .sign-btn span:last-child { display: none !important; }
//   .sign-btn span:first-child { margin: 0 !important; font-size: 18px !important; }
// }

// `;


// /* small shared style objects used inline below */
// const navButtonStyle = {
//   border: "none",
//   background: "transparent",
//   textAlign: "left",
//   padding: 6,
//   fontSize: 15,
//   cursor: "pointer",
//   width: "100%",
// };

// const panelButtonStyle = {
//   border: "none",
//   background: "transparent",
//   padding: "10px 4px",
//   display: "flex",
//   alignItems: "center",
//   gap: 12,
//   cursor: "pointer",
//   width: "100%",
// };

// const iconBoxStyle = {
//   width: 32,
//   height: 32,
//   borderRadius: 12,
//   background: "#f4f4f4",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: 16,
// };

// export default function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [sideMenuOpen, setSideMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout, login } = useContext(AuthContext);

//   const STORAGE_KEYS = ["user", "tm_user"];

//   useEffect(() => {
//     if (user) return;
//     for (const k of STORAGE_KEYS) {
//       try {
//         const raw = localStorage.getItem(k);
//         if (!raw) continue;
//         const parsed = JSON.parse(raw);
//         if (
//           parsed &&
//           (parsed.id ||
//             parsed._id ||
//             parsed.owner_id ||
//             parsed.userId ||
//             parsed.uid)
//         ) {
//           if (typeof login === "function") {
//             login(parsed);
//           } else {
//             try {
//               localStorage.setItem("tm_user", JSON.stringify(parsed));
//             } catch (e) {}
//           }
//           break;
//         }
//       } catch (e) {}
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleLogin = () => navigate("/login");
//   const goDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/dashboard");
//   };
//   const goListingPage = () => {
//     setSideMenuOpen(false);
//     navigate("/listed1");
//   };
//   const goOwnerDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/admindashboard");
//   };
//   const goProperties = () => {
//     setShowMenu(false);
//     setSideMenuOpen(false);
//     navigate("/properties");
//   };

//   const handleLogout = () => {
//     setSideMenuOpen(false);
//     try {
//       STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
//       try {
//         sessionStorage.removeItem("user");
//         sessionStorage.removeItem("tm_user");
//       } catch (e) {}
//     } catch (err) {
//       console.warn("Navbar: clearing storage failed", err);
//     }
//     try {
//       logout();
//     } catch (e) {
//       console.warn("Navbar: logout() threw", e);
//     }
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <style>{globalCSS}</style>
//       <style>{responsiveCSS}</style>

//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 99999,
//           fontFamily: "Poppins, sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "18px auto 0",
//             borderRadius: 40,
//             background: "#fff",
//             boxShadow: "0 2px 24px rgba(71,38,9,0.13)",
//             height: 68,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".28s",
//             zIndex: 999999,
//           }}
//         >
//           {/* Hamburger (left) - ALWAYS VISIBLE */}
//           <button
//             className="navbar-menu-toggle"
//             onClick={() => setShowMenu(!showMenu)}
//             aria-label="Toggle menu"
//             style={{
//               position: "absolute",
//               left: 20,
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 6,
//               padding: 0,
//               zIndex: 12,
//             }}
//           >
//             <span
//               style={{
//                 width: 26,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 20,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 14,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//           </button>

//           {/* Book a Stay Button (Desktop only - Left side) */}
//           <div className="navbar-left-btns">
//             <button
//               onClick={() => navigate("/stay")}
//               className="desktop-action-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 13,
//                 borderRadius: 20,
//                 padding: "8px 16px",
//                 height: 38,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 6,
//                 boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
//                 transition: "all 0.3s ease",
//                 whiteSpace: "nowrap",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-1px)";
//                 e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
//                 e.currentTarget.style.background = "#fef9f2";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
//                 e.currentTarget.style.background = "#fff";
//               }}
//             >
//               <span style={{ fontSize: 16 }}>🏖️</span>
//               Book a Stay
//             </button>
//           </div>

//           {/* Logo (center) - ORIGINAL SIZE */}
//           <img
//             src="/ovikalogo11.png"
//             alt="logo"
//             className="navbar-logo"
//             style={{
//               height: "110px",
//               cursor: "pointer",
//               objectFit: "contain",
//               position: "absolute",
//               left: "50%",
//               transform: "translateX(-50%)",
//               marginTop: 8,
//               zIndex: 5,
//             }}
//             onClick={() => navigate("/")}
//           />

//           {/* Become a Host Button (Desktop only - Right side) */}
//           <div className="navbar-right-desktop">
//             <button
//               onClick={() => navigate("/listed1")}
//               className="desktop-action-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 13,
//                 borderRadius: 20,
//                 padding: "8px 16px",
//                 height: 38,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 6,
//                 boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
//                 transition: "all 0.3s ease",
//                 whiteSpace: "nowrap",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-1px)";
//                 e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
//                 e.currentTarget.style.background = "#fef9f2";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
//                 e.currentTarget.style.background = "#fff";
//               }}
//             >
//               <span style={{ fontSize: 16 }}>🏠</span>
//               Become a Host
//             </button>
//           </div>

//           {/* Right area: Search + Auth */}
//           <div
//             className="navbar-right"
//             style={{
//               position: "absolute",
//               right: 24,
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               zIndex: 1000002,
//             }}
//           >
//             {/* Search button */}
//             <button
//               onClick={goProperties}
//               aria-label="Search properties"
//               className="search-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 14,
//                 borderRadius: 22,
//                 padding: "8px 12px",
//                 height: 40,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 8,
//                 boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden
//               >
//                 <path
//                   d="M21 21l-4.35-4.35"
//                   stroke="#232323"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <circle
//                   cx="11"
//                   cy="11"
//                   r="6"
//                   stroke="#232323"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span className="search-text" style={{ fontSize: 14 }}>
//                 Search
//               </span>
//             </button>

//             {/* Auth button */}
//             {user ? (
//               <button
//                 className="sign-btn"
//                 onClick={() => setSideMenuOpen(true)}
//                 aria-haspopup="true"
//                 aria-expanded={sideMenuOpen}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 18px",
//                   height: 40,
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 <span style={{ fontSize: 18, marginRight: 8 }}>
//                   {user.username?.[0]?.toUpperCase() || "U"}
//                 </span>
//                 <span className="username-text" style={{ marginRight: 8 }}>
//                   {user.username}
//                 </span>
//                 <span style={{ marginLeft: 4 }}>▼</span>
//               </button>
//             ) : (
//               <button
//                 className="sign-btn"
//                 onClick={handleLogin}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 20px",
//                   height: 40,
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

//         {/* Mobile slide panel (left) */}
//         {showMenu && (
//           <>
//             <div
//               onClick={() => setShowMenu(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.18)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               className="mobile-slide-panel"
//               style={{
//                 position: "fixed",
//                 top: 70,
//                 left: 12,
//                 width: "min(320px, 86vw)",
//                 background: "#fff",
//                 borderRadius: 12,
//                 boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
//                 padding: 12,
//                 zIndex: 1000001,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//                 animation: "mobileMenuAnim .18s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div style={{ fontSize: 16, fontWeight: 600 }}>Menu Bar</div>
//                 <button
//                   onClick={() => setShowMenu(false)}
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 className="mobile-link-row"
//                 style={{ display: "flex", flexDirection: "column", gap: 12 }}
//               >
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/stay");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Book a Stay
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/listed1");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Become a Host
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/dashboard");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Dashboard
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/about");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   About
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/explore-townmanor");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Explore Townmanor
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/contact");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Contact / Support
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Right-side user panel */}
//         {user && sideMenuOpen && (
//           <>
//             <div
//               onClick={() => setSideMenuOpen(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.25)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 right: 0,
//                 height: "100vh",
//                 width: "min(380px, 88vw)",
//                 background: "#fff",
//                 borderRadius: "24px 0 0 24px",
//                 boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
//                 padding: "22px 22px 30px",
//                 zIndex: 1000003,
//                 display: "flex",
//                 flexDirection: "column",
//                 animation: "slideDownSidebar .28s ease-out",
//                 overflowY: "auto",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{ fontSize: 20, fontWeight: 600, color: "#1f1f1f" }}
//                   >
//                     Menu Bar
//                   </div>
//                   <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
//                     Hi, {user.username}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSideMenuOpen(false)}
//                   aria-label="Close menu"
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 18,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 style={{
//                   background: "#fbf5ec",
//                   borderRadius: 18,
//                   padding: "14px 14px 16px",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 600,
//                     marginBottom: 4,
//                     color: "#3a2c18",
//                   }}
//                 >
//                   Manage your hosting
//                 </div>
//                 <div
//                   style={{ fontSize: 12, color: "#7a6b57", lineHeight: 1.5 }}
//                 >
//                   Quickly access your dashboard, listings and account actions.
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 10,
//                   flex: 1,
//                 }}
//               >
//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🏠</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Home
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Return to homepage
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/stay");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🏖️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Book a Stay
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Browse and book properties
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goListingPage} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>🏘️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Become a Host
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       List your property and earn
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goDashboard} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>📊</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Dashboard
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       View your bookings & performance
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/about");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>ℹ️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       About
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Learn more about us
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/explore-townmanor");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🗺️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Explore Townmanor
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Discover amazing places
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/contact");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>💬</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Contact / Support
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Get help and assistance
//                     </div>
//                   </div>
//                 </button>

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #eee",
//                     margin: "14px 0",
//                   }}
//                 />

//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     border: "none",
//                     background: "transparent",
//                     padding: "8px 4px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     cursor: "pointer",
//                     marginTop: 6,
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: 999,
//                       background: "#fdeceb",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 15,
//                       color: "#c23e3e",
//                     }}
//                   >
//                     ⬅
//                   </span>
//                   <span
//                     style={{ fontSize: 14, fontWeight: 500, color: "#c23e3e" }}
//                   >
//                     Log out
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// /* -------------------------
//   Navbar - Fully Responsive & Fixed
// -------------------------*/
// const globalCSS = `
// @keyframes slideDownSidebar {
//   from { transform: translateY(-40px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// }

// @keyframes mobileMenuAnim {
//   from { transform: translateX(-20px); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// }
// `;

// const responsiveCSS = `
// /* ================= MOBILE FIX ================= */
// @media (max-width: 900px) {

//   .navbar-outer {
//     padding: 0 !important;
//     min-height: 64px !important;
//   }

//   .navbar-inner {
//     width: 100% !important;
//     height: 64px !important;
//     margin: 0 !important;
//     border-radius: 0 !important;
//     padding: 0 16px !important;
//     box-shadow: 0 2px 10px rgba(0,0,0,.08) !important;
//     display: flex !important;
//     align-items: center !important;
//     justify-content: space-between !important;
//   }

//   /* Hamburger */
//   .navbar-menu-toggle {
//     position: relative !important;
//     left: 0 !important;
//     z-index: 10 !important;
//     flex-shrink: 0 !important;
//   }

//   /* LOGO CENTER - smaller to avoid overlap */
//   .navbar-logo {
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     height: 56px !important;
//     margin: 0 !important;
//     z-index: 5 !important;
//   }

//   /* LEFT BUTTONS - Icon + Text (Book a Stay, Become a Host) */
//   .navbar-left-btns,
//   .navbar-right-desktop {
//     display: flex !important;
//     align-items: center !important;
//     gap: 8px !important;
//   }

//   .navbar-left-btns button,
//   .navbar-right-desktop button {
//     height: 36px !important;
//     padding: 0 12px !important;
//     border-radius: 18px !important;
//     font-size: 12px !important;
//     gap: 4px !important;
//     white-space: nowrap !important;
//   }

//   .navbar-left-btns button span:first-child,
//   .navbar-right-desktop button span:first-child {
//     font-size: 14px !important;
//   }

//   /* Sign button - Icon only on mobile */
//   .sign-btn {
//     width: 36px !important;
//     height: 36px !important;
//     padding: 0 !important;
//     border-radius: 50% !important;
//     justify-content: center !important;
//     align-items: center !important;
//     flex-shrink: 0 !important;
//   }

//   .sign-btn .username-text,
//   .sign-btn span:last-child {
//     display: none !important;
//   }

//   .sign-btn span:first-child {
//     margin: 0 !important;
//     font-size: 16px !important;
//   }

//   /* RIGHT SECTION */
//   .navbar-right {
//     position: relative !important;
//     right: 0 !important;
//     gap: 8px !important;
//     display: flex !important;
//     align-items: center !important;
//     flex-shrink: 0 !important;
//   }

//   /* MOBILE MENU PANEL */
//   .mobile-slide-panel {
//     top: 64px !important;
//     left: 10px !important;
//     width: min(300px, 88vw) !important;
//     border-radius: 14px !important;
//   }
// }

// /* ================= DESKTOP ================= */
// @media (min-width: 901px) {

//   .navbar-inner {
//     justify-content: space-between !important;
//     padding: 0 48px !important;
//   }

//   /* LEFT : Hamburger + Book Stay */
//   .navbar-menu-toggle {
//     position: relative !important;
//     left: 0 !important;
//   }

//   .navbar-left-btns {
//     position: relative !important;
//     left: 0 !important;
//     display: flex !important;
//     align-items: center !important;
//     gap: 14px !important;
//   }

//   /* CENTER LOGO (NO OVERLAP) */
//   .navbar-logo {
//     position: absolute !important;
//     left: 50% !important;
//     transform: translateX(-50%) !important;
//     height: 120px !important;
//     margin-top: 12px !important;
//     z-index: 5 !important;
//     pointer-events: auto !important;
//   }

//   /* RIGHT : Host + User */
//   .navbar-right-desktop {
//     position: relative !important;
//     right: 0 !important;
//     display: flex !important;
//     gap: 10px !important;
//     align-items: center !important;
//   }

//   .navbar-right {
//     position: relative !important;
//     right: 0 !important;
//     display: flex !important;
//     gap: 12px !important;
//     align-items: center !important;
//   }

//   /* Sign button shows username on desktop */
//   .sign-btn { 
//     padding: 0 20px !important; 
//     width: auto !important;
//     height: 40px !important; 
//     border-radius: 22px !important; 
//     justify-content: center !important;
//   }
//   .sign-btn .username-text { display: inline !important; margin-right: 8px !important; }
//   .sign-btn span:last-child { display: inline !important; margin-left: 4px !important; }
//   .sign-btn span:first-child { margin-right: 8px !important; font-size: 18px !important; }
// }
// `;

// /* small shared style objects used inline below */
// const navButtonStyle = {
//   border: "none",
//   background: "transparent",
//   textAlign: "left",
//   padding: 6,
//   fontSize: 15,
//   cursor: "pointer",
//   width: "100%",
// };

// const panelButtonStyle = {
//   border: "none",
//   background: "transparent",
//   padding: "10px 4px",
//   display: "flex",
//   alignItems: "center",
//   gap: 12,
//   cursor: "pointer",
//   width: "100%",
// };

// const iconBoxStyle = {
//   width: 32,
//   height: 32,
//   borderRadius: 12,
//   background: "#f4f4f4",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: 16,
// };

// export default function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [sideMenuOpen, setSideMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout, login } = useContext(AuthContext);

//   const STORAGE_KEYS = ["user", "tm_user"];

//   useEffect(() => {
//     if (user) return;
//     for (const k of STORAGE_KEYS) {
//       try {
//         const raw = localStorage.getItem(k);
//         if (!raw) continue;
//         const parsed = JSON.parse(raw);
//         if (
//           parsed &&
//           (parsed.id ||
//             parsed._id ||
//             parsed.owner_id ||
//             parsed.userId ||
//             parsed.uid)
//         ) {
//           if (typeof login === "function") {
//             login(parsed);
//           } else {
//             try {
//               localStorage.setItem("tm_user", JSON.stringify(parsed));
//             } catch (e) {}
//           }
//           break;
//         }
//       } catch (e) {}
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleLogin = () => navigate("/login");
//   const goDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/dashboard");
//   };
//   const goListingPage = () => {
//     setSideMenuOpen(false);
//     navigate("/listed1");
//   };
//   const goOwnerDashboard = () => {
//     setSideMenuOpen(false);
//     navigate("/admindashboard");
//   };

//   const handleLogout = () => {
//     setSideMenuOpen(false);
//     try {
//       STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
//       try {
//         sessionStorage.removeItem("user");
//         sessionStorage.removeItem("tm_user");
//       } catch (e) {}
//     } catch (err) {
//       console.warn("Navbar: clearing storage failed", err);
//     }
//     try {
//       logout();
//     } catch (e) {
//       console.warn("Navbar: logout() threw", e);
//     }
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <style>{globalCSS}</style>
//       <style>{responsiveCSS}</style>

//       <div
//         className="navbar-outer"
//         style={{
//           minHeight: "90px",
//           position: "relative",
//           zIndex: 99999,
//           fontFamily: "Poppins, sans-serif",
//           background: "transparent",
//         }}
//       >
//         <div
//           className="navbar-inner"
//           style={{
//             width: "94%",
//             margin: "18px auto 0",
//             borderRadius: 40,
//             background: "#fff",
//             boxShadow: "0 2px 24px rgba(71,38,9,0.13)",
//             height: 68,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             padding: "0 30px",
//             transition: ".28s",
//             zIndex: 999999,
//           }}
//         >
//           {/* Hamburger (left) - ALWAYS VISIBLE */}
//           <button
//             className="navbar-menu-toggle"
//             onClick={() => setShowMenu(!showMenu)}
//             aria-label="Toggle menu"
//             style={{
//               position: "absolute",
//               left: 20,
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 6,
//               padding: 0,
//               zIndex: 12,
//             }}
//           >
//             <span
//               style={{
//                 width: 26,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 20,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//             <span
//               style={{
//                 width: 14,
//                 height: 3,
//                 background: "#232323",
//                 borderRadius: 2,
//               }}
//             />
//           </button>

//           {/* Book a Stay Button (Left side) */}
//           <div className="navbar-left-btns">
//             <button
//               onClick={() => navigate("/stay")}
//               className="desktop-action-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 13,
//                 borderRadius: 20,
//                 padding: "8px 16px",
//                 height: 38,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 6,
//                 boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
//                 transition: "all 0.3s ease",
//                 whiteSpace: "nowrap",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-1px)";
//                 e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
//                 e.currentTarget.style.background = "#fef9f2";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
//                 e.currentTarget.style.background = "#fff";
//               }}
//             >
//               <span style={{ fontSize: 16 }}>🏖️</span>
//               <span>Book a Stay</span>
//             </button>
//           </div>

//           {/* Logo (center) */}
//           <img
//             src="/ovikalogo11.png"
//             alt="logo"
//             className="navbar-logo"
//             style={{
//               height: "110px",
//               cursor: "pointer",
//               objectFit: "contain",
//               position: "absolute",
//               left: "50%",
//               transform: "translateX(-50%)",
//               marginTop: 8,
//               zIndex: 5,
//             }}
//             onClick={() => navigate("/")}
//           />

//           {/* Become a Host Button (Right side) */}
//           <div className="navbar-right-desktop">
//             <button
//               onClick={() => navigate("/listed1")}
//               className="desktop-action-btn"
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 600,
//                 fontSize: 13,
//                 borderRadius: 20,
//                 padding: "8px 16px",
//                 height: 38,
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 gap: 6,
//                 boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
//                 transition: "all 0.3s ease",
//                 whiteSpace: "nowrap",
//                 marginLeft:"520px"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-1px)";
//                 e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
//                 e.currentTarget.style.background = "#fef9f2";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
//                 e.currentTarget.style.background = "#fff";
//               }}
//             >
//               <span style={{ fontSize: 16 }}>🏠</span>
//               <span>Become a Host</span>
//             </button>
//           </div>

//           {/* Right area: Auth only */}
//           <div
//             className="navbar-right"
//             style={{
//               position: "absolute",
//               right: 24,
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               zIndex: 1000002,
//             }}
//           >
//             {/* Auth button */}
//             {user ? (
//               <button
//                 className="sign-btn"
//                 onClick={() => setSideMenuOpen(true)}
//                 aria-haspopup="true"
//                 aria-expanded={sideMenuOpen}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 18px",
//                   height: 40,
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 <span style={{ fontSize: 18, marginRight: 8 }}>
//                   {user.username?.[0]?.toUpperCase() || "U"}
//                 </span>
//                 <span className="username-text" style={{ marginRight: 8 }}>
//                   {user.username}
//                 </span>
//                 <span style={{ marginLeft: 4 }}>▼</span>
//               </button>
//             ) : (
//               <button
//                 className="sign-btn"
//                 onClick={handleLogin}
//                 style={{
//                   border: "2px solid #c98b3e",
//                   background: "#fff",
//                   color: "#232323",
//                   fontWeight: 500,
//                   fontSize: 15,
//                   borderRadius: 22,
//                   padding: "0 20px",
//                   height: 40,
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

//         {/* Mobile slide panel (left) */}
//         {showMenu && (
//           <>
//             <div
//               onClick={() => setShowMenu(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.18)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               className="mobile-slide-panel"
//               style={{
//                 position: "fixed",
//                 top: 70,
//                 left: 12,
//                 width: "min(320px, 86vw)",
//                 background: "#fff",
//                 borderRadius: 12,
//                 boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
//                 padding: 12,
//                 zIndex: 1000001,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//                 animation: "mobileMenuAnim .18s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div style={{ fontSize: 16, fontWeight: 600 }}>Menu Bar</div>
//                 <button
//                   onClick={() => setShowMenu(false)}
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 className="mobile-link-row"
//                 style={{ display: "flex", flexDirection: "column", gap: 12 }}
//               >
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/stay");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Book a Stay
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/listed1");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Become a Host
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/dashboard");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Dashboard
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/about");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   About
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/explore-townmanor");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Explore Townmanor
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate("/contact");
//                   }}
//                   style={navButtonStyle}
//                 >
//                   Contact / Support
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Right-side user panel */}
//         {user && sideMenuOpen && (
//           <>
//             <div
//               onClick={() => setSideMenuOpen(false)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.25)",
//                 zIndex: 1000000,
//               }}
//             />
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 right: 0,
//                 height: "100vh",
//                 width: "min(380px, 88vw)",
//                 background: "#fff",
//                 borderRadius: "24px 0 0 24px",
//                 boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
//                 padding: "22px 22px 30px",
//                 zIndex: 1000003,
//                 display: "flex",
//                 flexDirection: "column",
//                 animation: "slideDownSidebar .28s ease-out",
//                 overflowY: "auto",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{ fontSize: 20, fontWeight: 600, color: "#1f1f1f" }}
//                   >
//                     Menu Bar
//                   </div>
//                   <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
//                     Hi, {user.username}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSideMenuOpen(false)}
//                   aria-label="Close menu"
//                   style={{
//                     border: "none",
//                     background: "#f3f3f3",
//                     width: 32,
//                     height: 32,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 18,
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div
//                 style={{
//                   background: "#fbf5ec",
//                   borderRadius: 18,
//                   padding: "14px 14px 16px",
//                   marginBottom: 18,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 14,
//                     fontWeight: 600,
//                     marginBottom: 4,
//                     color: "#3a2c18",
//                   }}
//                 >
//                   Manage your hosting
//                 </div>
//                 <div
//                   style={{ fontSize: 12, color: "#7a6b57", lineHeight: 1.5 }}
//                 >
//                   Quickly access your dashboard, listings and account actions.
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 10,
//                   flex: 1,
//                 }}
//               >
//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🏠</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Home
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Return to homepage
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/stay");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🏖️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Book a Stay
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Browse and book properties
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goListingPage} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>🏘️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Become a Host
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       List your property and earn
//                     </div>
//                   </div>
//                 </button>

//                 <button onClick={goDashboard} style={panelButtonStyle}>
//                   <span style={iconBoxStyle}>📊</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Dashboard
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       View your bookings & performance
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/about");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>ℹ️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       About
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Learn more about us
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/explore-townmanor");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>🗺️</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Explore Townmanor
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Discover amazing places
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setSideMenuOpen(false);
//                     navigate("/contact");
//                   }}
//                   style={panelButtonStyle}
//                 >
//                   <span style={iconBoxStyle}>💬</span>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#232323",
//                       }}
//                     >
//                       Contact / Support
//                     </div>
//                     <div style={{ fontSize: 12, color: "#8a8a8a" }}>
//                       Get help and assistance
//                     </div>
//                   </div>
//                 </button>

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #eee",
//                     margin: "14px 0",
//                   }}
//                 />

//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     border: "none",
//                     background: "transparent",
//                     padding: "8px 4px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     cursor: "pointer",
//                     marginTop: 6,
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: 999,
//                       background: "#fdeceb",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 15,
//                       color: "#c23e3e",
//                     }}
//                   >
//                     ⬅
//                   </span>
//                   <span
//                     style={{ fontSize: 14, fontWeight: 500, color: "#c23e3e" }}
//                   >
//                     Log out
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Login/AuthContext";

/* -------------------------
  Navbar - Fully Responsive & Fixed
-------------------------*/
const globalCSS = `
@keyframes slideDownSidebar {
  from { transform: translateY(-40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes mobileMenuAnim {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
`;

// Desktop View CSS (> 768px)
const desktopCSS = `
@media (min-width: 769px) {
  .navbar-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 30px !important;
    position: relative !important;
  }

  .navbar-hamburger {
    display: flex !important;
    flex-shrink: 0;
  }

  .navbar-book-stay {
    display: flex !important;
    flex-shrink: 0;
    margin-left: 12px;
  }

  .navbar-logo {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    display: flex !important;
  }

  .navbar-become-host {
    display: flex !important;
    flex-shrink: 0;
    margin-left: auto;
    margin-right: 12px;
  }

  .navbar-auth {
    display: flex !important;
    flex-shrink: 0;
  }

  .username-text {
    display: inline !important;
  }

  .mobile-menu-button {
    display: none !important;
  }

  .book-emoji {
    display: inline !important;
  }

  .host-emoji {
    display: inline !important;
  }
}
`;

// Mobile View CSS (<= 768px)
const mobileCSS = `
@media (max-width: 768px) {
  .navbar-inner {
    display: flex !important;
    align-items: center !important;
     justify-content: center !important;
    padding: 0 8px !important;
    gap: 4px !important;
  }

  .navbar-hamburger {
    display: none !important;
  }

  .mobile-menu-button {
    display: flex !important;
    flex-shrink: 0;
  }

  .navbar-book-stay {
    display: flex !important;
    flex-shrink: 0;
  }

  .navbar-logo {
    display: flex !important;
    flex-shrink: 0;
    margin: 0 auto;
    margin-left:-24px;
  }

  .navbar-become-host {
    display: flex !important;
    flex-shrink: 0;
  }

  .navbar-auth {
    display: flex !important;
    flex-shrink: 0;
  }

  .username-text {
    display: none !important;
  }

  .navbar-inner {
    height: 60px !important;
  }

  .book-emoji {
    display: none !important;
  }

  .host-emoji {
    display: none !important;
  }
}
`;

const navButtonStyle = {
  border: "none",
  background: "transparent",
  textAlign: "left",
  padding: 6,
  fontSize: 15,
  cursor: "pointer",
  width: "100%",
};

const panelButtonStyle = {
  border: "none",
  background: "transparent",
  padding: "10px 4px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
  width: "100%",
};

const iconBoxStyle = {
  width: 32,
  height: 32,
  borderRadius: 12,
  background: "#f4f4f4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
};

export default function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, login } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const STORAGE_KEYS = ["user", "tm_user"];

  useEffect(() => {
    if (user) return;
    for (const k of STORAGE_KEYS) {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          (parsed.id ||
            parsed._id ||
            parsed.owner_id ||
            parsed.userId ||
            parsed.uid)
        ) {
          if (typeof login === "function") {
            login(parsed);
          } else {
            try {
              localStorage.setItem("tm_user", JSON.stringify(parsed));
            } catch (e) {}
          }
          break;
        }
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => navigate("/login");
  const goDashboard = () => {
    setSideMenuOpen(false);
    setHamburgerMenuOpen(false);
    navigate("/dashboard");
  };
  const goListingPage = () => {
    setSideMenuOpen(false);
    setHamburgerMenuOpen(false);
    navigate("/listed1");
  };
  const goOwnerDashboard = () => {
    setSideMenuOpen(false);
    setHamburgerMenuOpen(false);
    navigate("/admindashboard");
  };

  const handleLogout = () => {
    setSideMenuOpen(false);
    setHamburgerMenuOpen(false);
    try {
      STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
      try {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("tm_user");
      } catch (e) {}
    } catch (err) {
      console.warn("Navbar: clearing storage failed", err);
    }
    try {
      logout();
    } catch (e) {
      console.warn("Navbar: logout() threw", e);
    }
    window.location.href = "/";
  };

  return (
    <>
      <style>{globalCSS}</style>
      <style>{desktopCSS}</style>
      <style>{mobileCSS}</style>

      <div
        className="navbar-outer"
        style={{
          minHeight: "90px",
          position: "relative",
          zIndex: 99999,
          fontFamily: "Poppins, sans-serif",
          background: "transparent",
        }}
      >
        <div
          className="navbar-inner"
          style={{
            width: "94%",
            margin: "18px auto 0",
            borderRadius: 40,
            background: "#fff",
            boxShadow: "0 2px 24px rgba(71,38,9,0.13)",
            height: 68,
            transition: ".28s",
            zIndex: 999999,
          }}
        >
          {/* Hamburger Menu (Desktop Only - Left Most) */}
          <div className="navbar-hamburger">
            <button
              onClick={() => setHamburgerMenuOpen(true)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 24,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu Button (Mobile Only - Left Most) */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setHamburgerMenuOpen(true)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>

          {/* Book a Stay Button and Favorites */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '3px' : '12px' }}>
            {/* Book a Stay Button */}
            <div className="navbar-book-stay">
              <button
                onClick={() => navigate("/properties")}
                style={{
                  border: "1px solid #c98b3e",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 600,
                  fontSize: isMobile ? "7px" : 13,
                  borderRadius: 20,
                  padding: isMobile ? "9px 6px" : "8px 16px",
                  height: isMobile ? "19px" : 38,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: 4,
                  boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
                  e.currentTarget.style.background = "#fef9f2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <span className="book-emoji" style={{ fontSize: isMobile ? "4px" : "16px" }}>🏖️</span>
                <span>{isMobile ? "Book a Stay" : "Book a Stay"}</span>
              </button>
            </div>
            
            {/* Favorite/Home Icon */}
            <button
              onClick={() => navigate("/")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label="Favorites"
            >
              <img 
                src="/icon.png" 
                alt="Favorites" 
                style={{
                  width: isMobile ? 30 : 40,
                  height: isMobile ? 30 : 40,
                  objectFit: 'contain',
                 marginLeft:isMobile? "10px":40,
                    marginRight:isMobile? "20px":40,
                }} 
              />
            </button>
          </div>

          {/* Logo (Center on Desktop, Normal flow on Mobile) */}
          <div className="navbar-logo">
            <img
              src="/ovikalogo11.png"
              alt="logo"
              style={{
                height: isMobile ? "100px" : "110px",
                cursor: "pointer",
                objectFit: "contain",
                marginTop: isMobile ? "13px" : "22px",
              }}
              onClick={() => navigate("/")}
            />
          </div>

          {/* Become a Host Button */}
          <div className="navbar-become-host">
            <button
              onClick={() => navigate("/listed1")}
              style={{
                border: "1px solid #c98b3e",
                background: "#fff",
                color: "#232323",
                fontWeight: 600,
                fontSize: isMobile ? 7 : 13,
                borderRadius: 20,
                padding: isMobile ? "9px 6px" : "8px 16px",
                height: isMobile ? "19px" : 38,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 4,
                boxShadow: "0 2px 6px rgba(201, 139, 62, 0.12)",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(201, 139, 62, 0.2)";
                e.currentTarget.style.background = "#fef9f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(201, 139, 62, 0.12)";
                e.currentTarget.style.background = "#fff";
              }}
            >
              <span className="host-emoji" style={{ fontSize: isMobile ? 14 : 16 }}>🏠</span>
              <span>{isMobile ? "Become a Host" : "Become a Host"}</span>
            </button>
          </div>

          {/* Auth Button (Right Most) */}
          <div className="navbar-auth">
            {user ? (
              <button
                onClick={() => setSideMenuOpen(true)}
                aria-haspopup="true"
                aria-expanded={sideMenuOpen}
                style={{
                  border: "0px solid #000",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 500,
                  fontSize: isMobile ? 16 : 15,
                  borderRadius: "20px",
                  padding: isMobile ? "9px 8px" : "0 18px",
                  height: isMobile ? "19px" : 40,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: 6,
                }}
              >
                {isMobile ? (
                  <span style={{ fontSize: 16 ,color:"#c2772b"}}>👤</span>
                ) : (
                  <>
                    <span style={{ fontSize: 18 }}>
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </span>
                    <span className="username-text">
                      {user.username}
                    </span>
                    <span style={{ fontSize: 12 }}>▼</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                style={{
                  border: "0px solid #c98b3e",
                  background: "#fff",
                  color: "#c2772b",
                  fontWeight: 500,
                  fontSize: isMobile ? 16 : 15,
                  borderRadius: 22,
                  padding: isMobile ? "0 8px" : "0 20px",
                  height: isMobile ? 32 : 40,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {isMobile ? "👤" : "Sign In"}
              </button>
            )}
          </div>
        </div>

        {/* Hamburger Menu Panel (Desktop + Mobile) */}
        {hamburgerMenuOpen && (
          <>
            <div
              onClick={() => setHamburgerMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                zIndex: 1000000,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: isMobile ? "min(280px, 75vw)" : "min(380px, 88vw)",
                background: "#fff",
                borderRadius: "0 24px 24px 0",
                boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
                padding: isMobile ? "18px 16px 24px" : "22px 22px 30px",
                zIndex: 1000003,
                display: "flex",
                flexDirection: "column",
                animation: "slideDownSidebar .28s ease-out",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: isMobile ? 14 : 18,
                }}
              >
                <div>
                  <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 600, color: "#1f1f1f" }}>
                    Menu
                  </div>
                  <div style={{ fontSize: isMobile ? 12 : 13, color: "#777", marginTop: 4 }}>
                    Navigate through Ovika
                  </div>
                </div>
                <button
                  onClick={() => setHamburgerMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    border: "none",
                    background: "#f3f3f3",
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? 16 : 18,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 8 : 10,
                  flex: 1,
                }}
              >
                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>🏠</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      Home
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Return to homepage
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/properties");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>🏖️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      Book a Stay
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Browse and book properties
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/listed1");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>🏘️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      Become a Host
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      List your property and earn
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/about");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>ℹ️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      About
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Learn more about us
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/explore-townmanor");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>🗺️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      Explore Townmanor
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Discover amazing places
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    navigate("/contact");
                  }}
                  style={{
                    ...panelButtonStyle,
                    padding: isMobile ? "8px 4px" : "10px 4px",
                  }}
                >
                  <span style={{
                    ...iconBoxStyle,
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    fontSize: isMobile ? 14 : 16,
                  }}>💬</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#232323" }}>
                      Contact / Support
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Get help and assistance
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Right-side user panel (When logged in) */}
        {user && sideMenuOpen && (
          <>
            <div
              onClick={() => setSideMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                zIndex: 1000000,
              }}
            />
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
                zIndex: 1000003,
                display: "flex",
                flexDirection: "column",
                animation: "slideDownSidebar .28s ease-out",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <div>
                 
                  <div style={{ fontWeight:"500px", fontSize: 13, color: "black", marginTop: 4 }}>
                    Hi, {user.username}
                  </div>
                </div>
                <button
                  onClick={() => setSideMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    border: "none",
                    background: "#f3f3f3",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  background: "#fbf5ec",
                  borderRadius: 18,
                  padding: "14px 14px 16px",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 4,
                    color: "#3a2c18",
                  }}
                >
                  Manage your hosting
                </div>
                <div style={{ fontSize: 12, color: "#7a6b57", lineHeight: 1.5 }}>
                  Quickly access your dashboard, listings and account actions.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>🏠</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Home
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Return to homepage
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/properties");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>🏖️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Book a Stay
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Browse and book properties
                    </div>
                  </div>
                </button>

                <button onClick={goListingPage} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>🏘️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Become a Host
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      List your property and earn
                    </div>
                  </div>
                </button>

                <button onClick={goDashboard} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>📊</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Dashboard
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      View your bookings & performance
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/about");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>ℹ️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      About
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Learn more about us
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/explore-townmanor");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>🗺️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Explore Townmanor
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Discover amazing places
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/contact");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>💬</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Contact / Support
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Get help and assistance
                    </div>
                  </div>
                </button>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #eee",
                    margin: "13px 0",
                  }}
                />

                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "8px 4px",
display: "flex",
alignItems: "center",
gap: 10,
cursor: "pointer",
marginTop: 6,
}}
>
<span
style={{
width: 28,
height: 28,
borderRadius: 999,
background: "#fdeceb",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: 15,
color: "#c23e3e",
}}
>
⬅
</span>
<span style={{ fontSize: 14, fontWeight: 500, color: "#c23e3e" }}>
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