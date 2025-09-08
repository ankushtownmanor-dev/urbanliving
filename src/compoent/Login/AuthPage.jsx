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
              <a href="/" className="auth-forgot">
                Forgot password?
              </a>
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
      </div>
    </div>
  );
};

export default AuthPage;
