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

  .navbar-icon-logo {
    display: flex !important;
    flex-shrink: 0;
    margin-left: 16px;
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
  // @media (min-width: 768px) {
  // .navbar-icon-logo {
  //   display: flex !important;
  //   flex-shrink: 0;
  //   margin-left: 95px;
  // }

  }

`;

// Mobile View CSS (<= 768px)
const mobileCSS = `
@media (max-width: 768px) {
  .navbar-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
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

  .navbar-icon-logo {
    display: flex !important;
    flex-shrink: 0;
    margin-left: 4px;
  }

  .navbar-logo {
    display: flex !important;
    flex-shrink: 0;
    margin: 0 auto;
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
            } catch (e) { }
          }
          break;
        }
      } catch (e) { }
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
      } catch (e) { }
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

          {/* Icon Logo (Between Book a Stay and Main Logo) */}
          <div className="navbar-icon-logo">
            <img
              src="/icon.png"
              alt="icon"
              style={{
                height: isMobile ? "38px" : "40px",
                cursor: "pointer",
                objectFit: "contain",
                marginLeft: isMobile ? "10px" : "130px",
              }}
              onClick={() => navigate("/")}
            />
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
                marginRight: isMobile ? "36px" : "",
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
                  <span style={{ fontSize: 16, color: "#c2772b" }}>👤</span>
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
                    navigate("/subsription");
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
                      Subscription Plan
                    </div>
                    <div style={{ fontSize: isMobile ? 11 : 12, color: "#8a8a8a" }}>
                      Grow Faster With the Right Plan
                    </div>

                  </div>
                </button>
                <button
                  onClick={() => {
                    setHamburgerMenuOpen(false);
                    window.open("https://townmanor.ai/", "_blank");
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
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>
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
                    navigate("/contactus");
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

                  <div style={{ fontWeight: "500px", fontSize: 13, color: "black", marginTop: 4 }}>
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
                      Profile
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      View your bookings & performance
                    </div>
                  </div>
                </button>

                <button onClick={goOwnerDashboard} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>🛡️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Owner Dashboard
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Access owner controls
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
                    window.open("https://townmanor.ai/", "_blank");
                  }}
                  style={panelButtonStyle}
                >
                  <span style={iconBoxStyle}>🗺️</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
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
                    navigate("/contactus");
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

                <button
                  onClick={() => {
                    setSideMenuOpen(false);
                    navigate("/subsription");
                  }}
                  style={panelButtonStyle}
                >
                  {/* Icon Box */}
                  <span style={iconBoxStyle}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="3"
                        stroke="#c2772b"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M3 9H21"
                        stroke="#c2772b"
                        strokeWidth="1.8"
                      />
                      <circle cx="8" cy="14" r="1.4" fill="#c2772b" />
                      <circle cx="12" cy="14" r="1.4" fill="#c2772b" />
                      <circle cx="16" cy="14" r="1.4" fill="#c2772b" />
                    </svg>
                  </span>

                  {/* Text */}
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#232323" }}>
                      Subscription Plan
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Grow Faster With the Right Plan
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