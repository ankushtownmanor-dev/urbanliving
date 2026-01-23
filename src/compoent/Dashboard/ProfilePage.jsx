import React, { useState, useContext, useEffect } from "react";
import { FaEdit, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./ProfilePage.css";

import { AuthContext } from "../Login/AuthContext";

const API_BASE_AUTH = "https://townmanor.ai/api/auth";
const API_BASE = "https://townmanor.ai/api"; // General API base

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);

  // password visibility
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // password values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // modal & editable profile fields
  const [showModal, setShowModal] = useState(false);
  const [editUsername, setEditUsername] = useState(user?.username || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPhone, setEditPhone] = useState(user?.phone_number || "");

  // Verification & Extended Details
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Fetch extended user details on mount
  useEffect(() => {
    if (user?.id) {
      setEditUsername(user.username || "");
      setEditEmail(user.email || "");
      setEditPhone(user.phone_number || "");

      fetch(`${API_BASE}/user-details?user_id=${user.id}`, {
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if (data && !data.message) { // minimal validation
            if (data.pan_number) setPanNumber(data.pan_number);
            if (data.aadhaar_number) setAadhaarNumber(data.aadhaar_number);
            // Check verification status (boolean or 1/0)
            setPanVerified(!!data.pan_verified);
            setAadhaarVerified(!!data.aadhaar_verified);
          }
        })
        .catch(e => console.error("Error fetching user details", e));
    }
  }, [user]);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const verifyIdentity = async () => {
    if (!panNumber || !aadhaarNumber) {
      alert("Please enter both PAN and Aadhaar number to verify linkage.");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("https://kyc-api.surepass.io/api/v1/pan/pan-aadhaar-link-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg"
        },
        body: JSON.stringify({
          pan_number: panNumber,
          aadhaar_number: aadhaarNumber
        })
      });
      const data = await res.json();
      
      if (data.success || data.status_code === 200) {
        setPanVerified(true);
        setAadhaarVerified(true);
        alert("Verification Successful! PAN and Aadhaar are linked.");
      } else {
        setPanVerified(false);
        setAadhaarVerified(false);
        alert("Verification Failed: " + (data.message || "Details mismatch or invalid"));
      }
    } catch (e) {
      console.error("Identity verification error", e);
      alert("Error contacting verification service.");
    } finally {
      setVerifying(false);
    }
  };

  const updateProfile = async () => {
    setLoadingProfile(true);
    try {
      // 1. Update Basic Info (Auth)
      const basicChanges = {};
      if (editUsername !== user?.username) basicChanges.username = editUsername;
      if (editEmail !== user?.email) basicChanges.email = editEmail;
      if (editPhone !== (user?.phone_number || "")) basicChanges.phone_number = editPhone || null;

      // Only call update-profile if there are actual changes to basic info
      if (Object.keys(basicChanges).length > 0) {
         if (user?.id) basicChanges.userId = user.id;
         
         const res = await fetch(`${API_BASE_AUTH}/update-profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(basicChanges),
        });
        const data = await res.json();
        if (!res.ok) {
           // If it failed, throw error to stop execution or handle specific cases?
           // The user might be just updating PAN, so maybe we shouldn't block the second part?
           // But if basic info failed, we should probably let them know.
           throw new Error(data?.message || "Failed to update basic profile");
        }
        // Update local user context
        login({ ...(user || {}), ...data.user });
      }

      // 2. Update Extended Details (PAN/Aadhaar)
      // Always sending this if fields are populated, to ensure storage
      const detailsPayload = {
        user_id: user?.id,
        pan_number: panNumber,
        aadhaar_number: aadhaarNumber,
        pan_verified: panVerified,
        aadhaar_verified: aadhaarVerified
      };

      const resDetails = await fetch(`${API_BASE}/user-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(detailsPayload),
      });
      
      if (!resDetails.ok) {
        const dError = await resDetails.json();
        console.warn("Details update warning:", dError);
        // We continue to show success if basic profile worked, but alert user
      }

      alert("Profile updated successfully!");
      setShowModal(false);

    } catch (e) {
      console.error("Update profile error", e);
      alert("Error: " + e.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  const updatePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    setLoadingPassword(true);
    try {
      const res = await fetch(`${API_BASE_AUTH}/update-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword, userId: user?.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "Failed to update password");
        return;
      }
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      console.error("Update password error", e);
      alert("Server error during password update");
    } finally {
      setLoadingPassword(false);
    }
  };

  const joinDateDisplay = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "-";

  return (
    <div className="profilePage__container">
      {/* Profile Details */}
      <div className="profilePage__card">
        <div className="profilePage__header">
          <h2 className="profilePage__title">Profile Details</h2>
          <button
            className="profilePage__editBtn"
            onClick={() => setShowModal(true)}
            disabled={!user}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="profilePage__formGroup">
          <label className="profilePage__label">Username</label>
          <input className="profilePage__input" type="text" value={user?.username || ""} disabled />
        </div>

        <div className="profilePage__formGroup">
          <label className="profilePage__label">Email</label>
          <input className="profilePage__input" type="email" value={user?.email || ""} disabled />
        </div>

        <div className="profilePage__formGroup">
          <label className="profilePage__label">Phone</label>
          <input className="profilePage__input" type="tel" value={user?.phone_number || ""} disabled />
        </div>

         <div className="profilePage__formGroup">
          <label className="profilePage__label">PAN Number</label>
          <div style={{ display: "flex", alignItems: "center" }}>
             <input className="profilePage__input" type="text" value={panNumber || "Not Provided"} disabled style={{ flex: 1 }} />
             {panNumber && (
                panVerified ? 
                <span className="status-badge verified"><FaCheckCircle /> Verified</span> : 
                <span className="status-badge pending"><FaTimesCircle /> Pending</span>
             )}
          </div>
        </div>

         <div className="profilePage__formGroup">
          <label className="profilePage__label">Aadhaar Number</label>
           <div style={{ display: "flex", alignItems: "center" }}>
            <input className="profilePage__input" type="text" value={aadhaarNumber || "Not Provided"} disabled style={{ flex: 1 }} />
            {aadhaarNumber && (
                aadhaarVerified ? 
                <span className="status-badge verified"><FaCheckCircle /> Verified</span> : 
                <span className="status-badge pending"><FaTimesCircle /> Pending</span>
            )}
           </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="profilePage__card">
        <h2 className="profilePage__title">Change Password</h2>

        <div className="profilePage__formGroup profilePage__passwordField">
          <label className="profilePage__label">Current Password</label>
          <input
            className="profilePage__input"
            type={showPassword.current ? "text" : "password"}
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <FaEye onClick={() => togglePassword("current")} className="profilePage__icon" />
        </div>

        <div className="profilePage__formGroup profilePage__passwordField">
          <label className="profilePage__label">New Password</label>
          <input
            className="profilePage__input"
            type={showPassword.new ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FaEye onClick={() => togglePassword("new")} className="profilePage__icon" />
        </div>

        <div className="profilePage__formGroup profilePage__passwordField">
          <label className="profilePage__label">Confirm New Password</label>
          <input
            className="profilePage__input"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaEye onClick={() => togglePassword("confirm")} className="profilePage__icon" />
        </div>

        <p className="profilePage__note">
          Password must be at least 6 characters long.
        </p>

        <button className="profilePage__updateBtn" onClick={updatePassword} disabled={loadingPassword}>
          {loadingPassword ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="profilePage__modalOverlay">
          <div className="profilePage__modal">
            <h2 className="profilePage__modalTitle">Edit Profile & Verification</h2>

            <div className="profilePage__formGroup">
              <label className="profilePage__label">Username</label>
              <input
                className="profilePage__input"
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
            </div>

            <div className="profilePage__formGroup">
              <label className="profilePage__label">Email</label>
              <input
                className="profilePage__input"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>

            <div className="profilePage__formGroup">
              <label className="profilePage__label">Phone</label>
              <input
                className="profilePage__input"
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </div>

            <hr style={{margin: '15px 0', border: 'none', borderTop: '1px solid #eee'}}/>
            <h3 style={{fontSize: '16px', marginBottom: '10px'}}>Identity Verification</h3>
            
            <div className="profilePage__formGroup">
              <label className="profilePage__label">PAN Number</label>
              <input
                className="profilePage__input"
                type="text"
                placeholder="Enter PAN Number"
                value={panNumber}
                onChange={(e) => {
                    setPanNumber(e.target.value.toUpperCase());
                    setPanVerified(false); // Reset verification on change
                }}
              />
            </div>

             <div className="profilePage__formGroup">
              <label className="profilePage__label">Aadhaar Number</label>
              <input
                className="profilePage__input"
                type="text"
                placeholder="Enter Aadhaar Number"
                value={aadhaarNumber}
                onChange={(e) => {
                     setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12));
                     setAadhaarVerified(false); // Reset verification on change
                }}
              />
            </div>

             <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button 
                    className="profilePage__updateBtn" 
                    style={{ backgroundColor: (panVerified && aadhaarVerified) ? '#4CAF50' : '#2196F3', width: 'auto', padding: '0 20px' }}
                    onClick={verifyIdentity}
                    disabled={verifying || !panNumber || !aadhaarNumber}
                >
                    {verifying ? "Verifying..." : (panVerified && aadhaarVerified) ? "Verified" : "Verify PAN & Aadhaar"}
                </button>
             </div>


            <div className="profilePage__modalActions">
              <button className="profilePage__cancelBtn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="profilePage__saveBtn" onClick={updateProfile} disabled={loadingProfile}>
                {loadingProfile ? "Saving..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;