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
      Content:"OVIKA is the new-age urban living brand from Townmanor Technologies. Designed for the modern city dweller, Ovika blends technology, style, and comfort into every space. Whether it’s short-term stays, community living, or luxury studios, Ovika redefines how people experience city life. With a focus on convenience, design, and smart solutions, Ovika creates homes that feel effortless yet inspiring.",
      icon:"/hicon5.png",
     },
    {name: "Home",
     link: "/",
     Content:"Ovika offers modern, stylish, and affordable living spaces designed for comfort, convenience, and a vibrant urban lifestyle.",
     icon:"/hicon1.png",
    },
    {name: "TM Luxe",
      link: "/Tmluxe",
      Content:"Ovika redefines city living with TM Luxe, offering stylish studios and premium apartments blending comfort, elegance, and modern convenience.",
      icon:"/hicon2.png",
     },
     {name: "TM Hive",
      link: "/",
      Content:"TM Hive provides thoughtfully designed co-living spaces that combine smart shared facilities with a focus on community, comfort, and convenience.",
      icon:"/hicon3.png",
     },
     {name: "TM Stay ",
      link: "/",
      Content:"Affordable PG and work stays designed for students and professionals, offering comfort, community, modern amenities, and hassle-free living.",
      icon:"/hicon4.png",
     },
    
     {name: "Contact us ",
      link: "/",
      Content:"Email : enquiry@ovikaliving.com , phone number : +91  70428 88903",
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
