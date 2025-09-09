import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../Login/AuthContext"; // ✅ import context
import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingApartment } from "react-icons/pi";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ get user + logout directly from context
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    {name: "Brand Story",
      link: "/",
      Content:"this is about ovika which is short term rental",
      icon:"/hicon5.png",
     },
    {name: "Home",
     link: "/",
     Content:"This is main page of Okiva",
     icon:"/hicon1.png",
    },
    {name: "TmLuxe",
      link: "/Tmluxe",
      Content:"This Section for luxury Studio & appartment ",
      icon:"/hicon2.png",
     },
     {name: "Coliving",
      link: "/",
      Content:"This Section is for who like to live in coliving", 
      icon:"/hicon3.png",
     },
     {name: "TM Stay ",
      link: "/",
      Content:"This Section is for Payguest for working professional & student",
      icon:"/hicon4.png",
     },
    
     {name: "Contact us ",
      link: "/",
      Content:"Email : info@ovika.in , phone number : +91 9876543210",
      icon:"/hicon6.png",
     },
  ]

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogin = () => {
    navigate("/login", { state: { from: "/" } });
  };

  const goToDashboard = () => {
    setUserMenuOpen(false);
    navigate("/dashboard");
  };

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <button
          className={`menu-toggle ${showMenu ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <img src="/ovika.png" alt="Ovika Logo" className="logo" onClick={()=>{
          navigate("/");
        }} />

        {user ? (
          <div className="user-menu" ref={userMenuRef}>
            <button
              className="user-button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
              <span className="user-avatar">
                {user.username?.[0]?.toUpperCase() || "U"}
              </span>
              <span className="user-name">{user.username}</span>
              <span className={`chevron ${userMenuOpen ? "up" : "downx"}`}>
                ▾
              </span>
            </button>
            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-item" onClick={goToDashboard}>
                  Dashboard
                </div>
                <div className="user-dropdown-item logout" onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="signup-btn" onClick={handleLogin}>
            Sign Up
          </button>
        )}
      </div>

      <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
        {navItems.map((item, index) => (
          <div
            key={item.name}
            className={`menu-item ${index === 0 ? "featured" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setShowMenu(false);
              if (item.link) navigate(item.link);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowMenu(false);
                if (item.link) navigate(item.link);
              }
            }}
          >
            {index === 0 && <span className="menu-feature-badge" aria-hidden>★</span>}
            <div className="menu-card-inner">
              {item.icon && (
                <img src={item.icon} alt="" className="menu-thumb" />
              )}
              <div className="menu-texts">
                <h4 className="menu-title">{item.name}</h4>
                {item.Content && (
                  <p className="menu-subtitle">{item.Content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
