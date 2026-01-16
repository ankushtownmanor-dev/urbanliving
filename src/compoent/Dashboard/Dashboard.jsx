import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBookmark,
  FaBuilding,
  FaCommentDots,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Dashboard.css";
import BookingDashboard from "./BookingDashboard";
import BookingDetail from "./BookingDetail";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState("dashboard");
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const itemClass = (key) =>
    navigation === key ? "sidebar-menu-item active" : "sidebar-menu-item";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (err) {
      console.error("User parse error", err);
    }
  }, []);

  const fetchBookingRequests = async () => {
    if (!user?.username) return;
    setLoadingNotification(true);

    try {
      const res = await fetch("https://townmanor.ai/api/booking-request");
      const result = await res.json();

      let list = [];
      if (Array.isArray(result)) list = result;
      else if (Array.isArray(result?.data)) list = result.data;

      const userRequests = list.filter((r) => r.username === user.username);
      userRequests.sort(
        (a, b) =>
          new Date(b.created_at || b.updated_at) -
          new Date(a.created_at || a.updated_at)
      );

      setBookingRequests(userRequests);
    } catch (err) {
      console.error("Booking request fetch error", err);
      setBookingRequests([]);
    } finally {
      setLoadingNotification(false);
    }
  };

  useEffect(() => {
    if (navigation === "notification") {
      fetchBookingRequests();
    }
  }, [navigation, user]);

  const handleMenuClick = (nav) => {
    setNavigation(nav);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>

        {/* PROFILE SECTION */}
        <div className="sidebar-profile">
          <img src="/user.png" alt="user" className="sidebar-profile-image" />
          <div>
            <h3 className="sidebar-profile-name">
              {user?.username || "Guest"}
            </h3>
            <p className="sidebar-profile-role">TM Member</p>
          </div>
        </div>

        {/* PROFESSIONAL DIVIDER STRIP */}
        <div className="sidebar-divider">
          <div className="divider-line"></div>
          <div className="divider-decoration"></div>
        </div>

        {/* MENU ITEMS */}
        <ul className="sidebar-menu">
          <li
            className={itemClass("dashboard")}
            onClick={() => handleMenuClick("dashboard")}
          >
            <FaHome /> Dashboard
          </li>

          <li
            className={itemClass("booking")}
            onClick={() => handleMenuClick("booking")}
          >
            <FaBookmark /> Bookings
          </li>

          <li
            className="sidebar-menu-item"
            onClick={() => {
              navigate("/tmluxe");
              setIsMobileMenuOpen(false);
            }}
          >
            <FaBuilding /> Explore Properties
          </li>

          <li
            className={itemClass("profile")}
            onClick={() => handleMenuClick("profile")}
          >
            <FaCommentDots /> Update Profile
          </li>

          <li
            className={itemClass("notification")}
            onClick={() => handleMenuClick("notification")}
          >
            <FaBell /> Notifications
          </li>
        </ul>
      </aside>

      {/* OVERLAY (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <button
            className="mobile-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>

          <div className="topbar-content">
            <h1>
              Welcome Back, {user?.username || "Guest"}
              <span className="wave">👋</span>
            </h1>
          </div>

          <div className="topbar-actions">
            <FaBell className="topbar-bell" />
          </div>
        </div>

        {navigation === "dashboard" && <BookingDashboard />}
        {navigation === "booking" && <BookingDetail />}
        {navigation === "profile" && <ProfilePage />}

        {navigation === "notification" && (
          <div className="notification-wrapper">
            <h2 className="section-title">Booking Updates</h2>

            {loadingNotification && (
              <p className="loading-text">Fetching latest updates…</p>
            )}

            {!loadingNotification && bookingRequests.length === 0 && (
              <p className="empty-text">No booking updates yet.</p>
            )}

            {bookingRequests.map((req, index) => (
              <div
                key={req.id}
                className={`notification-card animated-card ${
                  req.status === "accepted"
                    ? "card-accepted"
                    : req.status === "rejected"
                    ? "card-rejected"
                    : "card-pending"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="notification-left">
                  <FaBell className="notification-icon-animated" />
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h3>{req.property?.name}</h3>

                    <span
                      className={`status-badge ${
                        req.status === "accepted"
                          ? "status-accepted"
                          : req.status === "rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  <p>
                    <strong>City:</strong> {req.property?.city}
                  </p>

                  <p>
                    <strong>Stay:</strong>{" "}
                    {new Date(req.start_date).toDateString()} →{" "}
                    {new Date(req.end_date).toDateString()}
                  </p>

                  <p className="date-text">
                    Updated:{" "}
                    {new Date(
                      req.updated_at || req.created_at
                    ).toLocaleString()}
                  </p>

                  {req.status === "accepted" && (
                    <button
                      className="proceed-btn"
                      onClick={() => navigate(`/property/${req.property_id}`)}
                    >
                      Proceed to Booking →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;