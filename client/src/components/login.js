import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import avatar from "../image/sist.webp";
import bgImage from "../image/sist-banner.jpg";

function Login() {
  const [activeRole, setActiveRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    if (!username || !password) {
      setError("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid credentials");
        return;
      }

      const user = result.user;

      if (user.role !== activeRole) {
        setError(`⚠️ This account is not registered as ${activeRole}`);
        return;
      }

      // ✅ Save user info
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect by role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">
        SIST <span className="highlight">LMS</span>
      </h1>

      <div className="background">
        <img src={bgImage} alt="Campus" className="bg-image" />

        <div className="login-box">
          {/* Avatar */}
          <img src={avatar} alt="Avatar" className="avatar" />

          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

          {/* Role Tabs */}
          <div className="tabs">
            {["admin", "teacher", "student"].map((role) => (
              <button
                key={role}
                className={activeRole === role ? "tab active" : "tab"}
                onClick={() => setActiveRole(role)}
                type="button"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
            <button type="submit" className="login-btn">
              Login as {activeRole}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
