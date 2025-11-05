// import React, { useContext, useRef, useState, useEffect } from "react";
// import "./Navbar.css";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext"; // ✅ import context
// import { IoHomeOutline } from "react-icons/io5";
// import { PiBuildingApartment } from "react-icons/pi";

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ get user + logout directly from context
//   const { user, logout } = useContext(AuthContext);

//   const navItems = [
//     {name: "Brand Story",
//       link: "/",
//       Content:"OVIKA is the new-age urban living brand from Townmanor Technologies. Designed for the modern city dweller, Ovika blends technology, style, and comfort into every space. Whether it’s short-term stays, community living, or luxury studios, Ovika redefines how people experience city life. With a focus on convenience, design, and smart solutions, Ovika creates homes that feel effortless yet inspiring.",
//       icon:"/hicon5.png",
//      },
//     {name: "Home",
//      link: "/",
//      Content:"Ovika offers modern, stylish, and affordable living spaces designed for comfort, convenience, and a vibrant urban lifestyle.",
//      icon:"/hicon1.png",
//     },
//     {name: "TM Luxe",
//       link: "/Tmluxe",
//       Content:"Ovika redefines city living with TM Luxe, offering stylish studios and premium apartments blending comfort, elegance, and modern convenience.",
//       icon:"/hicon2.png",
//      },
//      {name: "TM Hive",
//       link: "/",
//       Content:"TM Hive provides thoughtfully designed co-living spaces that combine smart shared facilities with a focus on community, comfort, and convenience.",
//       icon:"/hicon3.png",
//      },
//      {name: "TM Stay ",
//       link: "/",
//       Content:"Affordable PG and work stays designed for students and professionals, offering comfort, community, modern amenities, and hassle-free living.",
//       icon:"/hicon4.png",
//      },
    
//      {name: "Contact us ",
//       link: "/",
//       Content:"Email : enquiry@ovikaliving.com , phone number : +91  70428 88903",
//       icon:"/hicon6.png",
//      },
//   ]

//   const toggleMenu = () => setShowMenu(!showMenu);

//   const handleLogin = () => {
//     navigate("/login", { state: { from: "/" } });
//   };

//   const goToDashboard = () => {
//     setUserMenuOpen(false);
//     navigate("/dashboard");
//   };

//   // Close user dropdown on outside click
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

//   return (
//     <div className="navbar">
//       <div className="navbar-content">
//         <button
//           className={`menu-toggle ${showMenu ? "active" : ""}`}
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         <img src="/ovika.png" alt="Ovika Logo" className="logo" onClick={()=>{
//           navigate("/");
//         }} />

//         {user ? (
//           <div className="user-menu" ref={userMenuRef}>
//             <button
//               className="user-button"
//               onClick={() => setUserMenuOpen((prev) => !prev)}
//               aria-haspopup="true"
//               aria-expanded={userMenuOpen}
//             >
//               <span className="user-avatar">
//                 {user.username?.[0]?.toUpperCase() || "U"}
//               </span>
//               <span className="user-name">{user.username}</span>
//               <span className={`chevron ${userMenuOpen ? "up" : "downx"}`}>
//                 ▾
//               </span>
//             </button>
//             {userMenuOpen && (
//               <div className="user-dropdown">
//                 <div className="user-dropdown-item" onClick={goToDashboard}>
//                   Dashboard
//                 </div>
//                 <div className="user-dropdown-item logout" onClick={logout}>
//                   Logout
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button className="signup-btn" onClick={handleLogin}>
//             Sign Up
//           </button>
//         )}
//       </div>

//       <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
//         {navItems.map((item, index) => (
//           <div
//             key={item.name}
//             className={`menu-item ${index === 0 ? "featured" : ""}`}
//             role="button"
//             tabIndex={0}
//             onClick={() => {
//               setShowMenu(false);
//               if (item.link) navigate(item.link);
//             }}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 setShowMenu(false);
//                 if (item.link) navigate(item.link);
//               }
//             }}
//           >
//             {index === 0 && <span className="menu-feature-badge" aria-hidden>★</span>}
//             <div className="menu-card-inner">
//               {item.icon && (
//                 <img src={item.icon} alt="" className="menu-thumb" />
//               )}
//               <div className="menu-texts">
//                 <h4 className="menu-title">{item.name}</h4>
//                 {item.Content && (
//                   <p className="menu-subtitle">{item.Content}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


// import React, { useContext, useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Login/AuthContext";

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const navigate = useNavigate();

//   const { user, logout } = useContext(AuthContext);

//   const navItems = [
//     {
//       name: "Brand Story",
//       link: "/",
//       Content: "OVIKA is the new-age urban living brand from Townmanor Technologies. Designed for the modern city dweller, Ovika blends technology, style, and comfort into every space. Whether it’s short-term stays, community living, or luxury studios, Ovika redefines how people experience city life. With a focus on convenience, design, and smart solutions, Ovika creates homes that feel effortless yet inspiring.",
//       icon: "/hicon5.png",
//     },
//     {
//       name: "Home",
//       link: "/",
//       Content: "Ovika offers modern, stylish, and affordable living spaces designed for comfort, convenience, and a vibrant urban lifestyle.",
//       icon: "/hicon1.png",
//     },
//     {
//       name: "TM Luxe",
//       link: "/Tmluxe",
//       Content: "Ovika redefines city living with TM Luxe, offering stylish studios and premium apartments blending comfort, elegance, and modern convenience.",
//       icon: "/hicon2.png",
//     },
//     {
//       name: "TM Hive",
//       link: "/",
//       Content: "TM Hive provides thoughtfully designed co-living spaces that combine smart shared facilities with a focus on community, comfort, and convenience.",
//       icon: "/hicon3.png",
//     },
//     {
//       name: "TM Stay ",
//       link: "/",
//       Content: "Affordable PG and work stays designed for students and professionals, offering comfort, community, modern amenities, and hassle-free living.",
//       icon: "/hicon4.png",
//     },
//     {
//       name: "Contact us ",
//       link: "/",
//       Content: "Email : enquiry@ovikaliving.com , phone number : +91 70428 88903",
//       icon: "/hicon6.png",
//     },
//   ];

//   const toggleMenu = () => setShowMenu((v) => !v);

//   const handleLogin = () => {
//     navigate("/login", { state: { from: "/" } });
//   };

//   const goToDashboard = () => {
//     setUserMenuOpen(false);
//     navigate("/dashboard");
//   };

//   // Close user dropdown on outside click
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

//   return (
//     <div
//       style={{
//         // width: "100%",
//         // background: "#f6f6f6",
//         minHeight: "90px",
//         position: "relative",
//         zIndex: 10,
//         fontFamily: "Poppins,sans-serif",
//       }}
//     >
//       <div
//         style={{
//           width: "94%",
//           margin: "22px auto 0",
//           borderRadius: "40px",
//           background: "#fff",
//           boxShadow: "0 2px 24px 0 rgba(71, 38, 9, 0.13)",
//           height: "68px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "relative",
//           padding: "0 30px",
//         }}
//       >
//         {/* Hamburger Toggle */}
//         <button
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//           style={{
//             display: "none", // Turn to flex/block for mobile toggle
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "none",
//             border: "none",
//             padding: 0,
//             marginRight: "18px",
//             cursor: "pointer",
//           }}
//         >
//           <span style={{
//             display: "block",
//             width: "26px",
//             height: "3px",
//             background: "#232323",
//             marginBottom: "5px",
//             borderRadius: "2px",
//             transition: "all .3s"
//           }} />
//           <span style={{
//             display: "block",
//             width: "26px",
//             height: "3px",
//             background: "#232323",
//             marginBottom: "5px",
//             borderRadius: "2px",
//             transition: "all .3s"
//           }} />
//           <span style={{
//             display: "block",
//             width: "26px",
//             height: "3px",
//             background: "#232323",
//             borderRadius: "2px",
//             transition: "all .3s"
//           }} />
//         </button>

//         {/* Logo */}
//         <img
//           src="/ovika.png"
//           alt="Ovika Logo"
//           style={{
//             height: "75px",
//             marginLeft: "22px",
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             navigate("/");
//           }}
//         />

//         {/* Nav Links */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "50px",
//             marginLeft: "300px",
//             fontSize: "17px",
//             color: "#232323",
//             fontWeight: 500,
//             flex: 1,
//           }}
//         >
//           <a href="/" style={{ textDecoration: "none", color: "#232323" }}>
//             Home
//           </a>
//           <a href="/services" style={{ textDecoration: "none", color: "#232323" }}>
//             Services
//           </a>
//           <a href="/discover" style={{ textDecoration: "none", color: "#232323" }}>
//             Discover
//           </a>
//           <a href="/contact" style={{ textDecoration: "none", color: "#232323" }}>
//             Contact us
//           </a>
//         </div>

//         {/* Right Side Buttons */}
//         <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//           <button
//             style={{
//               background: "#c98b3e",
//               color: "#fff",
//               border: "none",
//               borderRadius: "22px",
//               padding: "0 23px",
//               height: "40px",
//               fontWeight: 500,
//               fontSize: "15px",
//               display: "flex",
//               alignItems: "center",
//               gap: "7px",
//               cursor: "pointer",
//               fontFamily: "Poppins,sans-serif",
//               boxShadow: "0 1px 12px 0 rgba(201,139,62,0.08)",
//             }}
//           >
//             <span style={{ fontSize: "18px", fontWeight: "bold" }}>+</span>
//             Property Listing
//           </button>

//           {user ? (
//             <div ref={userMenuRef} style={{ position: "relative" }}>
//               <button
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
//                 onClick={() => setUserMenuOpen((prev) => !prev)}
//                 aria-haspopup="true"
//                 aria-expanded={userMenuOpen}
//               >
//                 <span
//                   style={{
//                     fontSize: "19px",
//                     fontWeight: "bold",
//                     marginRight: "9px",
//                     lineHeight: 1,
//                   }}
//                 >
//                   {user.username?.[0]?.toUpperCase() || "U"}
//                 </span>
//                 <span>{user.username}</span>
//                 <span style={{ marginLeft: "7px" }}>{userMenuOpen ? "▲" : "▼"}</span>
//               </button>
//               {userMenuOpen && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     top: "50px",
//                     background: "#fff",
//                     borderRadius: "10px",
//                     boxShadow: "0 4px 16px rgba(71,38,9,0.07)",
//                     minWidth: "148px",
//                     zIndex: 1000,
//                   }}
//                 >
//                   <div
//                     style={{
//                       padding: "12px 16px",
//                       cursor: "pointer",
//                       fontWeight: 500,
//                       fontSize: "15px",
//                       color: "#232323",
//                     }}
//                     onClick={goToDashboard}
//                   >
//                     Dashboard
//                   </div>
//                   <div
//                     style={{
//                       padding: "12px 16px",
//                       cursor: "pointer",
//                       color: "#c23e3e",
//                       borderTop: "1px solid #eee",
//                       fontWeight: 500,
//                       fontSize: "15px",
//                     }}
//                     onClick={logout}
//                   >
//                     Logout
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               style={{
//                 border: "2px solid #c98b3e",
//                 background: "#fff",
//                 color: "#232323",
//                 fontWeight: 500,
//                 fontSize: "15px",
//                 borderRadius: "22px",
//                 padding: "0 26px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 fontFamily: "Poppins,sans-serif",
//               }}
//               onClick={handleLogin}
//             >
//               Sign Up
//             </button>
//           )}
//         </div>
//       </div>
//       {/* Dropdown Menu for Small Screens if you want it */}
//     </div>
//   );
// }

// export default Navbar;
import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Login/AuthContext";

const responsiveCSS = `
@media (max-width: 900px) {
  .navbar-outer {
    padding: 0 !important;
    min-height: 67px !important;
  }
  .navbar-inner {
    flex-direction: row !important;
    align-items: center !important;
    width: 100% !important;
    height: 56px !important;
    border-radius: 0 0 18px 18px !important;
    padding: 0 8px !important;
  }
  .navbar-logo {
    height: 44px !important;
    margin-left: 4px !important;
  }
  .navbar-links {
    display: none !important;
  }
  .navbar-menu-toggle {
    display: flex !important;
    margin-right: 0 !important;
  }
  .navbar-right {
    gap: 10px !important;
    margin-right: 2px !important;
  }
  .mobile-menu {
    display: flex !important;
    flex-direction: column !important;
    position: absolute !important;
    top: 56px !important;
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
}
`;

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  // MOBILE: close dropdown if nav closed
  useEffect(() => {
    if (!showMenu) setUserMenuOpen(false);
  }, [showMenu]);

  useEffect(() => {
    // User dropdown outside click
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const handleLogin = () => {
    navigate("/login", { state: { from: "/" } });
  };

  const goToDashboard = () => {
    setUserMenuOpen(false);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div
        className="navbar-outer"
        style={{
          minHeight: "90px",
          position: "relative",
          zIndex: 200,
          fontFamily: "Poppins,sans-serif",
          background: "transparent",
          padding: "0 0 0 0",
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
            justifyContent: "space-between",
            position: "relative",
            padding: "0 30px",
            transition: ".3s"
          }}
        >
          {/* Hamburger Toggle (mobile only) */}
          <button
            className="navbar-menu-toggle"
            onClick={() => setShowMenu((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: "none", // mobile: flex (from CSS)
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "none",
              border: "none",
              padding: 0,
              marginRight: "18px",
              cursor: "pointer",
              height: "35px",
            }}
          >
            <span style={{
              display: "block",
              width: "28px",
              height: "3px",
              background: "#232323",
              marginBottom: "6px",
              borderRadius: "2px",
              transition: "all .3s"
            }} />
            <span style={{
              display: "block",
              width: "28px",
              height: "3px",
              background: "#232323",
              marginBottom: "6px",
              borderRadius: "2px",
              transition: "all .3s"
            }} />
            <span style={{
              display: "block",
              width: "28px",
              height: "3px",
              background: "#232323",
              borderRadius: "2px",
              transition: "all .3s"
            }} />
          </button>

          {/* Logo */}
          <img
            src="/ovika.png"
            alt="Ovika Logo"
            className="navbar-logo"
            style={{
              height: "75px",
              marginLeft: "22px",
              cursor: "pointer",
              objectFit: "contain"
            }}
            onClick={() => {
              navigate("/");
            }}
          />

          {/* Nav Links (desktop only) */}
          <div
            className="navbar-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              marginLeft: "300px",
              fontSize: "17px",
              color: "#232323",
              fontWeight: 500,
              flex: 1,
              transition: ".3s"
            }}
          >
            <a href="/" style={{ textDecoration: "none", color: "#232323" }}>
              Home
            </a>
            <a href="/services" style={{ textDecoration: "none", color: "#232323" }}>
              Services
            </a>
            <a href="/discover" style={{ textDecoration: "none", color: "#232323" }}>
              Discover
            </a>
            <a href="/contact" style={{ textDecoration: "none", color: "#232323" }}>
              Contact us
            </a>
          </div>

          {/* Right Side Buttons */}
          <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button
              style={{
                background: "#c98b3e",
                color: "#fff",
                border: "none",
                borderRadius: "22px",
                padding: "0 23px",
                height: "40px",
                fontWeight: 500,
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                cursor: "pointer",
                fontFamily: "Poppins,sans-serif",
                boxShadow: "0 1px 12px 0 rgba(201,139,62,0.08)",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>+</span>
              Property Listing
            </button>

            {user ? (
              <div ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  style={{
                    border: "2px solid #c98b3e",
                    background: "#fff",
                    color: "#232323",
                    fontWeight: 500,
                    fontSize: "15px",
                    borderRadius: "22px",
                    padding: "0 26px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontFamily: "Poppins,sans-serif",
                  }}
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: "bold",
                      marginRight: "9px",
                      lineHeight: 1,
                    }}
                  >
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </span>
                  <span>{user.username}</span>
                  <span style={{ marginLeft: "7px" }}>{userMenuOpen ? "▲" : "▼"}</span>
                </button>
                {userMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50px",
                      background: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0 4px 16px rgba(71,38,9,0.07)",
                      minWidth: "148px",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontWeight: 500,
                        fontSize: "15px",
                        color: "#232323",
                      }}
                      onClick={goToDashboard}
                    >
                      Dashboard
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                        color: "#c23e3e",
                        borderTop: "1px solid #eee",
                        fontWeight: 500,
                        fontSize: "15px",
                      }}
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                style={{
                  border: "2px solid #c98b3e",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 500,
                  fontSize: "15px",
                  borderRadius: "22px",
                  padding: "0 26px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontFamily: "Poppins,sans-serif",
                }}
                onClick={handleLogin}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Mobile links, visible only when hamburger menu open */}
        {showMenu && (
          <div className="mobile-menu">
            <div className="mobile-link-row">
              <a href="/" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
                Home
              </a>
              <a href="/services" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
                Services
              </a>
              <a href="/discover" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
                Discover
              </a>
              <a href="/contact" style={{ textDecoration: "none", color: "#232323" }} onClick={()=>setShowMenu(false)}>
                Contact us
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Navbar;
