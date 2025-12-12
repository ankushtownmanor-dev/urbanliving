import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Login/AuthContext";

/* -------------------------
  Navbar (updated) - mobile: show search icon only (no text), desktop unchanged
-------------------------*/
const globalCSS = `
@keyframes slideDownSidebar {
  from { transform: translateY(-40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;

const responsiveCSS = `
/* Mobile */
@media (max-width: 900px) {
  .navbar-outer { padding: 0 !important; min-height: 72px !important; }
  .navbar-inner { width: 100% !important; height: 64px !important; border-radius: 8px !important; padding: 0 12px !important; box-shadow: none !important; display: flex !important; justify-content: center !important; align-items: center !important; background: #fff !important; position: relative !important; }
  .navbar-menu-toggle { display: flex !important; position: absolute !important; left: 12px !important; top: 50% !important; transform: translateY(-50%) !important; }
  .navbar-logo { height: 130px !important; width: auto !important; object-fit: contain !important; position: absolute !important; left: 50% !important; transform: translateX(-50%) !important; margin-top: 25px !important; z-index: 5 !important; }
  .navbar-right { position: absolute !important; right: 10px !important; top: 50% !important; transform: translateY(-50%) !important; display: flex !important; gap: 8px !important; align-items: center !important; }
  .search-btn { padding: 6px 8px !important; height: 36px !important; border-radius: 18px !important; font-size: 13px !important; }
  .search-btn .search-text { display: none !important; } /* hide text on mobile */
  .search-btn svg { width: 18px !important; height: 18px !important; }
  .sign-btn { padding: 0 12px !important; height: 36px !important; border-radius: 18px !important; }
  .mobile-slide-panel { display: flex !important; flex-direction: column !important; position: fixed !important; top: 70px !important; left: 12px !important; width: calc(320px) !important; background: #fff !important; z-index: 1200 !important; box-shadow: 0 6px 18px rgba(71,38,9,0.18) !important; padding: 12px !important; border-radius: 12px !important; animation: mobileMenuAnim .18s ease !important; }
  @keyframes mobileMenuAnim { from { transform: translateY(-12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
}

/* Desktop */
@media (min-width: 901px) {
  .navbar-logo { height: 150px !important; margin-top: 19px !important; z-index: 5 !important; left: 50% !important; transform: translateX(-50%) !important; }
  .search-btn { border: 2px solid #c98b3e !important; }
}
`;

/* small shared style objects used inline below */
const navButtonStyle = {
  border: "none",
  background: "transparent",
  textAlign: "left",
  padding: 6,
  fontSize: 15,
  cursor: "pointer",
};

const panelButtonStyle = {
  border: "none",
  background: "transparent",
  padding: "10px 4px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
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
  const [showMenu, setShowMenu] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, login } = useContext(AuthContext);

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
    navigate("/dashboard");
  };
  const goListingPage = () => {
    setSideMenuOpen(false);
    navigate("/listed1");
  };
  const goOwnerDashboard = () => {
    setSideMenuOpen(false);
    navigate("/admindashboard");
  };
  const goProperties = () => {
    setShowMenu(false);
    setSideMenuOpen(false);
    navigate("/properties");
  };

  const handleLogout = () => {
    setSideMenuOpen(false);
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
      <style>{responsiveCSS}</style>

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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "0 30px",
            transition: ".28s",
            zIndex: 999999,
          }}
        >
          {/* Hamburger (left) */}
          <button
            className="navbar-menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
            style={{
              position: "absolute",
              left: 20,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              padding: 0,
              zIndex: 12,
            }}
          >
            <span
              style={{
                width: 26,
                height: 3,
                background: "#232323",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 20,
                height: 3,
                background: "#232323",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 14,
                height: 3,
                background: "#232323",
                borderRadius: 2,
              }}
            />
          </button>

          {/* Logo (center) */}
          <img
            src="/ovikalogo11.png"
            alt="logo"
            className="navbar-logo"
            style={{
              height: "110px", // desktop default; responsive CSS will override on mobile
              cursor: "pointer",
              objectFit: "contain",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 8,
              zIndex: 5,
            }}
            onClick={() => navigate("/")}
          />

          {/* Right area: Search (icon-only on mobile) + Auth */}
          <div
            className="navbar-right"
            style={{
              position: "absolute",
              right: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 1000002,
            }}
          >
            {/* Search button - golden border like Sign In; on mobile shows icon only */}
            <button
              onClick={goProperties}
              aria-label="Search properties"
              className="search-btn"
              style={{
                border: "2px solid #c98b3e",
                background: "#fff",
                color: "#232323",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 22,
                padding: "8px 12px",
                height: 40,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 8,
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="#232323"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="#232323"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="search-text" style={{ fontSize: 14 }}>
                Search
              </span>
            </button>

            {/* Auth button */}
            {user ? (
              <button
                className="sign-btn"
                onClick={() => setSideMenuOpen(true)}
                aria-haspopup="true"
                aria-expanded={sideMenuOpen}
                style={{
                  border: "2px solid #c98b3e",
                  background: "#fff",
                  color: "#232323",
                  fontWeight: 500,
                  fontSize: 15,
                  borderRadius: 22,
                  padding: "0 18px",
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 18, marginRight: 8 }}>
                  {user.username?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="username-text" style={{ marginRight: 8 }}>
                  {user.username}
                </span>
                <span style={{ marginLeft: 4 }}>▼</span>
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
                  fontSize: 15,
                  borderRadius: 22,
                  padding: "0 20px",
                  height: 40,
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

        {/* Mobile slide panel (left) */}
        {showMenu && (
          <>
            <div
              onClick={() => setShowMenu(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.18)",
                zIndex: 1000000,
              }}
            />
            <div
              className="mobile-slide-panel"
              style={{
                position: "fixed",
                top: 70,
                left: 12,
                width: "min(320px, 86vw)",
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                padding: 12,
                zIndex: 1000001,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                animation: "mobileMenuAnim .18s ease-out",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600 }}>Menu</div>
                <button
                  onClick={() => setShowMenu(false)}
                  style={{
                    border: "none",
                    background: "#f3f3f3",
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                className="mobile-link-row"
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/");
                  }}
                  style={navButtonStyle}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/services");
                  }}
                  style={navButtonStyle}
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/dashboard");
                  }}
                  style={navButtonStyle}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/contact");
                  }}
                  style={navButtonStyle}
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    window.open("https://townmanor.example.com", "_blank");
                  }}
                  style={navButtonStyle}
                >
                  TownManor
                </button>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #eee",
                    marginTop: 6,
                  }}
                />
                <button
                  onClick={() => {
                    setShowMenu(false);
                    goProperties();
                  }}
                  style={navButtonStyle}
                >
                  Search Properties
                </button>
              </div>
            </div>
          </>
        )}

        {/* Right-side user panel */}
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
                  <div
                    style={{ fontSize: 20, fontWeight: 600, color: "#1f1f1f" }}
                  >
                    Menu
                  </div>
                  <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
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
                <div
                  style={{ fontSize: 12, color: "#7a6b57", lineHeight: 1.5 }}
                >
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
                <button onClick={goDashboard} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>🏠</span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      Dashboard
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      View your Bookings & performance
                    </div>
                  </div>
                </button>

                <button onClick={goListingPage} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>📋</span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      List your Property
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Create your listings
                    </div>
                  </div>
                </button>

                <button onClick={goOwnerDashboard} style={panelButtonStyle}>
                  <span style={iconBoxStyle}>🏠</span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#232323",
                      }}
                    >
                      Owner Dashboard
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a" }}>
                      Show your properties and bookings
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
                  <span
                    style={{ fontSize: 14, fontWeight: 500, color: "#c23e3e" }}
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
