// import React, { useState, useEffect } from "react";
// import {
//   FaHome,
//   FaBookmark,
//   FaGift,
//   FaBuilding,
//   FaCommentDots,
//   FaBell,
// } from "react-icons/fa";
// import "./Dashboard.css";
// import BookingDashboard from "./BookingDashboard";
// import BookingDetail from "./BookingDetail";
// import ProfilePage from "./ProfilePage";
// import { useNavigate } from "react-router";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [navigation, setNavigation] = useState("dashboard");

//   // 🔔 booking-request notification
//   const [bookingRequest, setBookingRequest] = useState(null);
//   const [loadingNotification, setLoadingNotification] = useState(false);

//   const navigate = useNavigate();

//   const itemClass = (key) =>
//     navigation === key ? "sidebar-menu-item active" : "sidebar-menu-item";

//   // Load user
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem("user");
//       if (raw) {
//         setUser(JSON.parse(raw));
//       }
//     } catch (err) {
//       console.error("User parse error", err);
//     }
//   }, []);

//   // 🔔 Fetch booking-request (API exactly as screenshot)
//   const fetchBookingRequest = async () => {
//     if (!user?.id) return;

//     setLoadingNotification(true);
//     try {
//       const res = await fetch(
//         `https://townmanor.ai/api/booking-request/${user.id}`
//       );
//       const result = await res.json();

//       if (result?.success) {
//         setBookingRequest(result.data);
//       } else {
//         setBookingRequest(null);
//       }
//     } catch (err) {
//       console.error("Booking request API error", err);
//       setBookingRequest(null);
//     } finally {
//       setLoadingNotification(false);
//     }
//   };

//   // When Notification tab opens
//   useEffect(() => {
//     if (navigation === "notification") {
//       fetchBookingRequest();
//     }
//   }, [navigation]);

//   return (
//     <>
//       <div className="dashboard-container">
//         {/* SIDEBAR */}
//         <aside className="dashboard-sidebar">
//           <div className="sidebar-profile">
//             <img
//               src="/user.png"
//               alt="user"
//               className="sidebar-profile-image"
//             />
//             <div>
//               <h3 className="sidebar-profile-name">
//                 {user?.username || "Guest"}
//               </h3>
//               <p className="sidebar-profile-role">TM Member</p>
//             </div>
//           </div>

//           <ul className="sidebar-menu">
//             <li
//               className={itemClass("dashboard")}
//               onClick={() => setNavigation("dashboard")}
//             >
//               <FaHome className="sidebar-menu-icon" /> Dashboard
//             </li>

//             <li
//               className={itemClass("booking")}
//               onClick={() => setNavigation("booking")}
//             >
//               <FaBookmark className="sidebar-menu-icon" /> Bookings
//             </li>

//             <li className="sidebar-menu-item">
//               <FaGift className="sidebar-menu-icon" /> Rewards
//             </li>

//             <li
//               className="sidebar-menu-item"
//               onClick={() => navigate("/tmluxe")}
//             >
//               <FaBuilding className="sidebar-menu-icon" /> Explore Properties
//             </li>

//             <li
//               className={itemClass("profile")}
//               onClick={() => setNavigation("profile")}
//             >
//               <FaCommentDots className="sidebar-menu-icon" /> Update Profile
//             </li>

//             <li
//               className={itemClass("notification")}
//               onClick={() => setNavigation("notification")}
//             >
//               <FaBell className="sidebar-menu-icon" /> Notifications
//             </li>
//           </ul>
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="dashboard-main">
//           <div className="dashboard-topbar">
//             <h1 className="dashboard-welcome">
//               Welcome Back, {user?.username || "Guest"} 👋
//             </h1>
//             <FaBell size={30} color="#b60000" />
//           </div>

//           {/* DASHBOARD */}
//           {navigation === "dashboard" && <BookingDashboard />}

//           {/* BOOKINGS */}
//           {navigation === "booking" && <BookingDetail />}

//           {/* PROFILE */}
//           {navigation === "profile" && <ProfilePage />}

//           {/* 🔔 NOTIFICATION */}
//           {navigation === "notification" && (
//             <div className="notification-wrapper">
//               <h2 className="section-title">Booking Request</h2>

//               {loadingNotification && <p>Loading booking request...</p>}

//               {!loadingNotification && !bookingRequest && (
//                 <p>No booking request found.</p>
//               )}

//               {bookingRequest && (
//                 <div className="notification-card-advanced">
//                   <div className="notification-left">
//                     <FaBell className="notification-big-icon" />
//                   </div>

//                   <div className="notification-content">
//                     <h3>
//                       Booking Request #{bookingRequest.id}{" "}
//                       <span className="status-accepted">
//                         {bookingRequest.status.toUpperCase()}
//                       </span>
//                     </h3>

//                     <p>
//                       <strong>User:</strong> {bookingRequest.username}
//                     </p>

//                     <p>
//                       <strong>Stay:</strong>{" "}
//                       {new Date(
//                         bookingRequest.start_date
//                       ).toDateString()}{" "}
//                       →{" "}
//                       {new Date(
//                         bookingRequest.end_date
//                       ).toDateString()}
//                     </p>

//                     <p>
//                       <strong>Requested On:</strong>{" "}
//                       {new Date(
//                         bookingRequest.created_at
//                       ).toLocaleString()}
//                     </p>

//                     <div className="notification-actions">
//                       <button
//                         className="book-btn"
//                         onClick={() =>
//                           navigate(
//                             `/property/${bookingRequest.property_id}`
//                           )
//                         }
//                       >
//                         View & Book Property
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBookmark,
  FaGift,
  FaBuilding,
  FaCommentDots,
  FaBell,
} from "react-icons/fa";
import "./Dashboard.css";
import BookingDashboard from "./BookingDashboard";
import BookingDetail from "./BookingDetail";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router";

/* ===========================
   DASHBOARD COMPONENT
=========================== */

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState("dashboard");

  // 🔔 notifications
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loadingNotification, setLoadingNotification] = useState(false);

  const navigate = useNavigate();

  const itemClass = (key) =>
    navigation === key
      ? "sidebar-menu-item active"
      : "sidebar-menu-item";

  /* ===========================
     LOAD USER
  =========================== */
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

  /* ===========================
     FETCH USER BOOKING UPDATES
     (ACCEPT / REJECT / PENDING)
  =========================== */
  const fetchBookingRequests = async () => {
    if (!user?.username) return;

    setLoadingNotification(true);

    try {
      const res = await fetch(
        "https://townmanor.ai/api/booking-request"
      );
      const result = await res.json();

      let list = [];
      if (Array.isArray(result)) list = result;
      else if (Array.isArray(result?.data)) list = result.data;

      // ✅ filter only logged-in user's requests
      const userRequests = list.filter(
        (r) => r.username === user.username
      );

      // latest first
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

  /* ===========================
     LOAD WHEN NOTIFICATION TAB
  =========================== */
  useEffect(() => {
    if (navigation === "notification") {
      fetchBookingRequests();
    }
  }, [navigation, user]);

  /* ===========================
     UI
  =========================== */
  return (
    <div className="dashboard-container">
      {/* ================= SIDEBAR ================= */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <img
            src="/user.png"
            alt="user"
            className="sidebar-profile-image"
          />
          <div>
            <h3 className="sidebar-profile-name">
              {user?.username || "Guest"}
            </h3>
            <p className="sidebar-profile-role">TM Member</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li
            className={itemClass("dashboard")}
            onClick={() => setNavigation("dashboard")}
          >
            <FaHome /> Dashboard
          </li>

          <li
            className={itemClass("booking")}
            onClick={() => setNavigation("booking")}
          >
            <FaBookmark /> Bookings
          </li>

          <li className="sidebar-menu-item">
            <FaGift /> Rewards
          </li>

          <li
            className="sidebar-menu-item"
            onClick={() => navigate("/tmluxe")}
          >
            <FaBuilding /> Explore Properties
          </li>

          <li
            className={itemClass("profile")}
            onClick={() => setNavigation("profile")}
          >
            <FaCommentDots /> Update Profile
          </li>

          <li
            className={itemClass("notification")}
            onClick={() => setNavigation("notification")}
          >
            <FaBell /> Notifications
          </li>
        </ul>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <h1>
            Welcome Back, {user?.username || "Guest"} 👋
          </h1>
          <FaBell size={26} color="#b60000" />
        </div>

        {/* DASHBOARD */}
        {navigation === "dashboard" && <BookingDashboard />}

        {/* BOOKINGS */}
        {navigation === "booking" && <BookingDetail />}

        {/* PROFILE */}
        {navigation === "profile" && <ProfilePage />}

        {/* ================= NOTIFICATIONS ================= */}
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
              onClick={() =>
                navigate(`/property/${req.property_id}`)
              }
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
