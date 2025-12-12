// src/Login/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

/**
 * Unified storage key: "user"
 * - Previously there was "tm_user" in some places and "user" in others.
 * - We standardize on "user" so all components read the same entry.
 */

export const AuthContext = createContext({
  user: null,
  login: async (u) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const STORAGE_KEY = "user"; // <-- unified

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("AuthContext: failed to parse local user", e);
      return null;
    }
  });

  // normalizer: sometimes backend returns { user: {...} } or { data: {...} }
  const normalize = (userObj) => {
    if (!userObj) return null;
    if (userObj.user) return userObj.user;
    if (userObj.data?.user) return userObj.data.user;
    if (userObj.data && (userObj.data._id || userObj.data.id)) return userObj.data;
    if (userObj._id || userObj.id || userObj.owner_id) return userObj;
    // fallback: if nested userData
    if (userObj.userData) return userObj.userData;
    return userObj;
  };

  // Persist login
  const login = async (userObj) => {
    try {
      if (!userObj) return null;
      const u = normalize(userObj);
      setUser(u);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch (e) {
        console.warn("AuthContext: localStorage write failed", e);
      }
      return u;
    } catch (err) {
      console.error("AuthContext.login error", err);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("AuthContext.logout localStorage remove failed", e);
    }
  };

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
