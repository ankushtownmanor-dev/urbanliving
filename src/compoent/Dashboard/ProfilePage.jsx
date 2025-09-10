import React, { useState, useContext } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import "./ProfilePage.css";

import { AuthContext } from "../Login/AuthContext";

const API_BASE_AUTH = "https://townmanor.ai/api/auth";

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

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateProfile = async () => {
    // Build payload with only changed fields
    const payload = {};
    if (editUsername !== user?.username) payload.username = editUsername;
    if (editEmail !== user?.email) payload.email = editEmail;
    if (editPhone !== (user?.phone_number || "")) payload.phone_number = editPhone || null;
    if (user?.id) payload.userId = user.id;

    if (Object.keys(payload).length === 0) {
      setShowModal(false);
      return;
    }

    setLoadingProfile(true);
    try {
      const res = await fetch(`${API_BASE_AUTH}/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "Failed to update profile");
        return;
      }
      // backend returns updated user as { id, username, email, phone_number }
      login({ ...(user || {}), ...data.user });
      setShowModal(false);
    } catch (e) {
      console.error("Update profile error", e);
      alert("Server error during profile update");
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
            <h2 className="profilePage__modalTitle">Edit Profile</h2>

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