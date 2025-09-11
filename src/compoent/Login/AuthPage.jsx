import React, { useState, useContext } from "react";
import "./AuthPage.css";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext"; // ✅ import context
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Forgot Password modal states
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = email, 2 = new password
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE = "https://townmanor.ai/api";

  const { login } = useContext(AuthContext); // ✅ use login from context

  // ✅ Redirect back to where user came from (default: home)
  const redirectTo = location.state?.from || "/";

  const handleSignup = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number: phone || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Signup failed", data);
        alert(data?.message || "Signup failed");
        return;
      }

      login(data?.user); // ✅ update context + localStorage
      navigate(redirectTo); // ✅ go back to previous page
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Login failed", data);
        alert(data?.message || "Invalid credentials");
        return;
      }

      login(data?.user); // ✅ update context + localStorage
      navigate(redirectTo); // ✅ go back to previous page
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const openForgot = (e) => {
    e.preventDefault();
    setForgotOpen(true);
    setForgotStep(1);
    setForgotEmail("");
    setNewPwd("");
    setNewPwd2("");
  };

  const closeForgot = () => {
    if (forgotSubmitting) return;
    setForgotOpen(false);
  };

  const proceedForgotStep1 = () => {
    // basic email validation
    const emailTrim = (forgotEmail || "").trim();
    if (!emailTrim || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      alert("Please enter a valid email address");
      return;
    }
    setForgotStep(2);
  };

  const submitForgot = async () => {
    const pwd = (newPwd || "").trim();
    const pwd2 = (newPwd2 || "").trim();
    if (pwd.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }
    if (pwd !== pwd2) {
      alert("Passwords do not match");
      return;
    }

    setForgotSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim(), newPassword: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || (data?.errors && data.errors[0]?.msg) || "Password reset failed";
        alert(msg);
        return;
      }
      alert(data?.message || "Password has been reset successfully");
      setForgotOpen(false);
      // Pre-fill email into main form and focus password for convenience
      setEmail(forgotEmail.trim());
      setPassword("");
      setIsLogin(true);
    } catch (err) {
      console.error("Forgot password error", err);
      alert("Server error during password reset");
    } finally {
      setForgotSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Illustration */}
      <div className="auth-illustration">
        <img src="/ill.webp" alt="illustration" />
      </div>

      {/* Right Form */}
      <div className="auth-form-container">
        <div className="auth-toggle">
          <button
            className={isLogin ? "auth-toggle-btn active" : "auth-toggle-btn"}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={!isLogin ? "auth-toggle-btn active" : "auth-toggle-btn"}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <h2 className="auth-title">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="auth-subtitle">
          {isLogin
            ? "Please enter your details to sign in"
            : "Please enter your details to sign up"}
        </p>

        <form className="auth-form" onSubmit={onSubmit}>
          {!isLogin && (
            <>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label>Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {isLogin && (
            <div className="auth-options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="button" className="auth-forgot btn-link" onClick={openForgot}>
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting
              ? isLogin
                ? "Signing In..."
                : "Signing Up..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        {/* Forgot Password Modal */}
        {forgotOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-title"
            className="modal-overlay"
            onClick={(e) => {
              // close when clicking backdrop only
              if (e.target === e.currentTarget) closeForgot();
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h3 id="forgot-title" style={{ margin: 0 }}>
                  {forgotStep === 1 ? "Reset your password" : "Set a new password"}
                </h3>
                <button type="button" onClick={closeForgot} className="modal-close" aria-label="Close">×</button>
              </div>

              {forgotStep === 1 && (
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your account email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={{ width: "100%", marginTop: 6, marginBottom: 14 }}
                    className="auth-password-input"
                  />
                  <button type="button" onClick={proceedForgotStep1} disabled={forgotSubmitting} className="auth-submit" style={{ width: "100%" }}>
                    Continue
                  </button>
                </div>
              )}

              {forgotStep === 2 && (
                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    style={{ width: "100%", marginTop: 6, marginBottom: 12 }}
                     className="auth-password-input"
                  />
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={newPwd2}
                    onChange={(e) => setNewPwd2(e.target.value)}
                    style={{ width: "100%", marginTop: 6, marginBottom: 14 }}
                     className="auth-password-input"
                  />
                  <button type="button" onClick={submitForgot} disabled={forgotSubmitting} className="auth-submit" style={{ width: "100%" }}>
                    {forgotSubmitting ? "Submitting..." : "Reset Password"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
