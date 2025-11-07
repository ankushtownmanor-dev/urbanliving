

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
    width: 100% !important;
    height: 60px !important;
    border-radius: 1 !important;
    padding: 0 10px !important;
    box-shadow: none !important;
    display: flex !important;
    justify-content: center !important; /* Center contents */
    align-items: center !important;
    background: #fff !important;
    position: relative !important;
  }

  /* Move hamburger to left corner */
  .navbar-menu-toggle {
    display: flex !important;
    position: absolute !important;
    left: 22px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  /* Center logo properly */
  .navbar-logo {
    height: 75px !important;
    width: 80px !important;
    object-fit: contain !important;
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    margin-top: -4px !important;
  }

  .navbar-links {
    display: none !important;
  }

  .navbar-right {
    position: absolute !important;
    right: 12px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  .property-btn {
    display: none !important;
  }

  .sign-btn {
    height: 34px !important;
    font-size: 14px !important;
    padding: 0 18px !important;
    border-radius: 18px !important;
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
}
`
;
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!showMenu) setUserMenuOpen(false);
  }, [showMenu]);

  useEffect(() => {
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
            transition: ".3s",
          }}
        >
          {/* Left Section (Logo + Hamburger for mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/ovika.png"
              alt="Ovika Logo"
              className="navbar-logo"
              style={{
                height: "82px",
                cursor: "pointer",
                objectFit: "contain",
                marginBottom: "10px",
              }}
              onClick={() => {
                navigate("/");
              }}
            />

            {/* Hamburger Icon */}
            <button
              className="navbar-menu-toggle"
              onClick={() => setShowMenu((v) => !v)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                height: "35px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "28px",
                  height: "3px",
                  background: "#232323",
                  marginBottom: "6px",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "28px",
                  height: "3px",
                  background: "#232323",
                  marginBottom: "6px",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "28px",
                  height: "3px",
                  background: "#232323",
                  borderRadius: "2px",
                }}
              />
            </button>
          </div>

          {/* Desktop Links */}
          <div
            className="navbar-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              marginLeft: "480px",
              fontSize: "17px",
              color: "#232323",
              fontWeight: 500,
              flex: 1,
              transition: ".3s",
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

          {/* Right Buttons */}
          <div
            className="navbar-right"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Property Listing (Hidden in Mobile) */}
           

            {/* Sign In / User Menu */}
            {user ? (
              <div ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  className="sign-btn"
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
                className="sign-btn"
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
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
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
