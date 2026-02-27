import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHome,
  FaBookmark,
  FaBuilding,
  FaCommentDots,
  FaBell,
  FaBars,
  FaTimes,
  FaCamera,
  FaUpload,
  FaCheck,
  FaImage,
  FaCloudUploadAlt,
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("/user.png");

  const navigate = useNavigate();

  const itemClass = (key) =>
    navigation === key ? "sidebar-menu-item active" : "sidebar-menu-item";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const userData = JSON.parse(raw);
        setUser(userData);
        // Fetch profile photo after user is set
        if (userData.user_id || userData.id) {
          fetchUserProfile(userData.user_id || userData.id);
        }
      }
    } catch (err) {
      console.error("User parse error", err);
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`https://townmanor.ai/api/user-details?user_id=${userId}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (!res.ok) {
        console.warn("Profile fetch failed:", res.status);
        return;
      }
      
      const result = await res.json();
      console.log("Profile data:", result);
      
      // Only extract profile_photo from the response
      if (result.profile_photo) {
        setProfilePhoto(result.profile_photo);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !user) return;

    setUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("user_id", user.user_id || user.id || 3);
      formData.append("profile_photo", selectedImage);

      const res = await fetch("https://townmanor.ai/api/user-details", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Upload response:", result);

      if (result.success || result.profile_photo) {
        setUploadSuccess(true);
        // Only extract profile_photo
        if (result.profile_photo) {
          setProfilePhoto(result.profile_photo);
        }
        
        setTimeout(() => {
          setShowProfileModal(false);
          setSelectedImage(null);
          setImagePreview(null);
          setUploadSuccess(false);
        }, 1500);
      } else {
        throw new Error("Upload failed - no profile photo in response");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

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
  
  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking request?")) return;
    try {
      console.log("Cancelling booking request ID:", id);
      const res = await axios.patch(`https://townmanor.ai/api/booking-request/${id}/cancel`, {
        id: id,
        user_id: user?.user_id || user?.id,
        username: user?.username,
        cancel_reason: "Plan changed"
      }, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (res.status === 200 || res.status === 204 || res.data?.success) {
        alert("Booking request cancelled successfully.");
        fetchBookingRequests(); // Refresh the list
      } else {
        alert(`Failed to cancel: ${res.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Cancel error detailed:", err);
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      alert(`Error cancelling booking request: ${serverMsg}`);
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

  const handleModalClose = () => {
    setShowProfileModal(false);
    setSelectedImage(null);
    setImagePreview(null);
    setUploadSuccess(false);
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
          <div className="profile-image-wrapper">
            <img 
              src={profilePhoto} 
              alt="user" 
              className="sidebar-profile-image"
              onError={(e) => e.target.src = '/user.png'}
            />
            <div className="profile-image-badge">
              <FaCamera />
            </div>
          </div>
          <div className="profile-info">
            <h3 className="sidebar-profile-name">
              {user?.username || "Guest"}
            </h3>
            <p className="sidebar-profile-role">TM Member</p>
            <button
              className="add-profile-btn"
              onClick={() => setShowProfileModal(true)}
            >
              <FaCloudUploadAlt className="btn-icon" />
              Update Photo
            </button>
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
                      {req.status === "cancelled" ? "CANCELLED" : req.status.toUpperCase()}
                    </span>
                  </div>

                  {req.status === "cancelled" && req.cancel_reason && (
                    <p className="cancel-reason-text">
                      <strong>Reason:</strong> {req.cancel_reason}
                    </p>
                  )}

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

                  {req.status === "pending" && (
                    <button
                      className="cancel-btn"
                      style={{
                        marginTop: "12px",
                        padding: "8px 16px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}
                      onClick={() => handleCancelBooking(req.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PROFESSIONAL PROFILE UPLOAD MODAL */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={handleModalClose}
            >
              <FaTimes />
            </button>

            <div className="modal-header">
              <div className="modal-icon-container">
                <div className="modal-icon-circle">
                  <FaCamera className="modal-camera-icon" />
                </div>
              </div>
              <h2 className="modal-title">Update Profile Photo</h2>
              <p className="modal-subtitle">Upload a professional photo to personalize your account</p>
            </div>

            <div className="modal-body">
              <div className="image-preview-section">
                {imagePreview ? (
                  <div className="preview-image-container">
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                    <div className="preview-overlay">
                      <FaCheck className="preview-check-icon" />
                    </div>
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <div className="placeholder-icon-wrapper">
                      <FaImage className="placeholder-icon" />
                    </div>
                    <p className="placeholder-title">No Image Selected</p>
                    <p className="placeholder-text">Choose an image to preview</p>
                  </div>
                )}
              </div>

              <div className="upload-actions">
                <label htmlFor="profile-image-upload" className="choose-image-btn">
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="file-input-hidden"
                  />
                  <FaUpload className="btn-icon" />
                  <span>Choose Image</span>
                </label>

                {selectedImage && (
                  <button
                    className={`upload-submit-btn ${uploading ? 'uploading' : ''} ${uploadSuccess ? 'success' : ''}`}
                    onClick={handleImageUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Uploading...</span>
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <FaCheck className="check-icon" />
                        <span>Upload Successful!</span>
                      </>
                    ) : (
                      <>
                        <FaCloudUploadAlt className="btn-icon" />
                        <span>Upload Photo</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="upload-info">
                <p className="info-text">
                  <span className="info-icon">ℹ️</span>
                  Supported formats: JPG, PNG, GIF • Max size: 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;