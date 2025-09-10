import React, { useState, useEffect } from "react";
import { FaHome, FaBookmark, FaGift, FaBuilding, FaCommentDots, FaBell } from "react-icons/fa";
import "./Dashboard.css";
import Navbar from "../Homepage/Navbar";
import BookingDashboard from "./BookingDashboard";
import BookingDetail from "./BookingDetail";
import { useNavigate } from "react-router";
import ProfilePage from "./ProfilePage";

const Dashboard = () => {
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ navigation , setnavigation]=useState("dashboard");
  const itemClass = (key) => (navigation === key ? "sidebar-menu-item active" : "sidebar-menu-item");
  useEffect(() => {
    // Load user from localStorage
    try {
      const raw = localStorage.getItem("user");
      console.log(raw)
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);
  const navigate  = useNavigate();
  useEffect(() => {
    // Fetch bookings when user is available
    const fetchBookings = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://townmanor.ai/api/booking/user/${user.id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data?.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`https://townmanor.ai/api/booking/${bookingId}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, user_id: user?.id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data?.success) {
        throw new Error(data?.message || "Cancel failed");
      }
      // Update local state on success
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, cancelled: 1, booking_status: "cancelled" } : b))
      );
      alert(data.message || "Booking cancelled successfully.");
    } catch (e) {
      console.error("Failed to cancel booking", e);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <img
              src="user.png"
              alt="user avatar"
              className="sidebar-profile-image"
            />
            <div>
              <h3 className="sidebar-profile-name">{user?.username || "Guest"}</h3>
              <p className="sidebar-profile-role">TM Member</p>
            </div>
          </div>

          <ul className="sidebar-menu">
            <li className={itemClass('dashboard')} onClick={()=>setnavigation('dashboard')}>
              <FaHome className="sidebar-menu-icon"  size={20}/> Dashboard
            </li>
            <li className={itemClass('booking')} onClick={() => setnavigation('booking')}>
              <FaBookmark className="sidebar-menu-icon" size={20} /> Bookings
            </li>
            <li className="sidebar-menu-item" onClick={() => alert("This functionality is coming soon") }>
              <FaGift className="sidebar-menu-icon" size={20} /> Rewards
            </li>
            <li className="sidebar-menu-item" onClick={()=>navigate('/tmluxe')}>
              <FaBuilding className="sidebar-menu-icon" size={20} /> Explore Properties
            </li>
            <li className={itemClass('profile')} onClick={()=>setnavigation('profile')}>
              <FaCommentDots className="sidebar-menu-icon" size={20} /> Update profile
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Top Bar */}
          <div className="dashboard-topbar">
            <h1 className="dashboard-welcome">Welcome Back ! {user?.username || "Guest"}</h1>
            <div className="">
              <FaBell className="dot" color="#6E0B0C" size={35} />
            </div>
          </div>

          {/* Profile Section */}
          <div className="dashboard-profile-section">
            <img
              src="user.png"
              alt="profile avatar"
              className="dashboard-profile-image"
            />
            <div className="dashboard-profile-details">
              <h2 className="dashboard-profile-heading">Profile</h2>
              <p className="dashboard-profile-name">{user?.username || "Guest"}</p>
              <p className="dashboard-profile-role">TM Member</p>
              <p className="dashboard-profile-actions" onClick={()=>setnavigation('profile')}>
                Quick Actions : Edit Profile | Setting
              </p>
            </div>
          </div>
        </main>
      </div>
      
      {/* 
      
      <div className="dashboard-notification-section">
        <h2 className="dashboard-notification-heading">Notification</h2>

        <div className="notification-card">
          <FaBell className="notification-icon" />
          <div>
            <p className="notification-title">Exclusive offer: 20% off on your next Stay.</p>
            <p className="notification-desc">Expires in 7 Days.</p>
          </div>
        </div>

        <div className="notification-card">
          <FaBell className="notification-icon" />
          <div>
            <p className="notification-title">Upcoming Stays: Cozy Cabins.</p>
            <p className="notification-desc">Reminder check-in is Tomorrow.</p>
          </div>
        </div>

        <div className="notification-card">
          <FaBell className="notification-icon" />
          <div>
            <p className="notification-title">TM updates</p>
            <p className="notification-desc">Check what is new.</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-support-section">
        <h2 className="dashboard-support-heading">Support & Help</h2>

        <div className="support-options">
          <div className="support-card">
            <span className="support-icon">❓</span>
            <p className="support-text">FAQ</p>
          </div>

          <div className="support-card">
            <span className="support-icon">💬</span>
            <p className="support-text">Chat with support</p>
          </div>

          <div className="support-card">
            <span className="support-icon">📞</span>
            <p className="support-text">Call Us</p>
          </div>
        </div>
      </div> */}
      { navigation === 'dashboard' && (
        <>
        <BookingDashboard/>
         </>
      )}
        { navigation === 'booking' && (
        <>
        <BookingDetail/>
         </>
      )}
      { navigation === 'profile' && (
        <>
        <ProfilePage/>
         </>
      )}
    </>
  );
};

export default Dashboard;
