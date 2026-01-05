// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaClipboardList,
//   FaRupeeSign,
//   FaHome,
//   FaEnvelope,
//   FaFileAlt,
//   FaHeadset,
// } from "react-icons/fa";
// import "./Sidebar.css";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <img
//           src="/public/image 129.png"
//           alt="profile"
//           className="profile-pic"
//         />
//         <h3 className="profile-name">Rimi Aggarwal</h3>
//         <p className="profile-role">Property Owner</p>
//       </div>

//       <ul className="menu">
//         <li>
//           <NavLink to="/admindashboard" end>
//             <span className="icon icon-wrap"><FaHome /></span>
//             <span>Dashboard</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/inquiriesbookings">
//             <span className="icon icon-wrap"><FaClipboardList /></span>
//             <span>Inquiries &amp; Bookings</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/financials">
//             <span className="icon icon-wrap"><FaRupeeSign /></span>
//             <span>Financials</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/properties">
//             <span className="icon icon-wrap"><FaHome /></span>
//             <span>Properties</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/messages">
//             <span className="icon icon-wrap"><FaEnvelope /></span>
//             <span>Messages</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/documents">
//             <span className="icon icon-wrap"><FaFileAlt /></span>
//             <span>Document</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admindashboard/support">
//             <span className="icon icon-wrap"><FaHeadset /></span>
//             <span>Support</span>
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaClipboardList,
//   FaRupeeSign,
//   FaHome,
//   FaEnvelope,
//   FaFileAlt,
//   FaHeadset,
//   FaTimes,
// } from "react-icons/fa";
// import "./Sidebar.css";

// function Sidebar({ isOpen, onClose }) {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
      
//       {/* Mobile Close Button */}
//       <div className="mobile-close" onClick={onClose}>
//         <FaTimes />
//       </div>

//       <div className="sidebar-header">
//         <img src="/public/image 129.png" alt="profile" className="profile-pic" />
//         <h3 className="profile-name">Rimi Aggarwal</h3>
//         <p className="profile-role">Property Owner</p>
//       </div>

//       <ul className="menu" onClick={onClose}>
//         <li><NavLink to="/admindashboard" end><FaHome /> Dashboard</NavLink></li>
//         <li><NavLink to="/admindashboard/inquiriesbookings"><FaClipboardList /> Inquiries</NavLink></li>
//         <li><NavLink to="/admindashboard/financials"><FaRupeeSign /> Financials</NavLink></li>
//         <li><NavLink to="/admindashboard/properties"><FaHome /> Properties</NavLink></li>
//         <li><NavLink to="/admindashboard/messages"><FaEnvelope /> Messages</NavLink></li>
//         <li><NavLink to="/admindashboard/documents"><FaFileAlt /> Documents</NavLink></li>
//         <li><NavLink to="/admindashboard/support"><FaHeadset /> Support</NavLink></li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaRupeeSign,
  FaHome,
  FaEnvelope,
  FaFileAlt,
  FaHeadset,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Login/AuthContext";
import "./Sidebar.css";
import { FaUserCircle } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  /* ================= GET LOGGED-IN USER ID ================= */
  const getUserId = () => {
    if (user?.id) return user.id;

    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.id || null;
    } catch {
      return null;
    }
  };

  /* ================= FETCH USER DETAILS ================= */
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const res = await axios.get(
          "https://townmanor.ai/api/users-list"
        );

        const list = Array.isArray(res.data) ? res.data : [];

        const matchedUser = list.find(
          (u) => String(u.id) === String(userId)
        );

        if (matchedUser) {
          setProfile({
            username: matchedUser.username,
            email: matchedUser.email,
          });
        }
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Mobile Close Button */}
      <div className="mobile-close" onClick={onClose}>
        <FaTimes />
      </div>

      {/* PROFILE SECTION */}
      <div className="sidebar-header">
    <div className="profile-icon-wrapper">
  <FaUserCircle size={64} color="#c98b3e" />
</div>

        <h3 className="profile-name">
          {profile.username || "Loading..."}
        </h3>

        <p className="profile-role">
          {profile.email || ""}
        </p>
      </div>

      {/* MENU */}
      <ul className="menu" onClick={onClose}>
        <li>
          <NavLink to="/admindashboard" end>
            <FaHome /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/inquiriesbookings">
            <FaClipboardList /> Inquiries
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/financials">
            <FaRupeeSign /> Financials
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/properties">
            <FaHome /> Properties
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/messages">
            <FaEnvelope /> Messages
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/documents">
            <FaFileAlt /> Documents
          </NavLink>
        </li>

        <li>
          <NavLink to="/admindashboard/support">
            <FaHeadset /> Support
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
