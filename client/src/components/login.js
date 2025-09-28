import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import avatar from "../image/sist.webp";
import bgImage from '../image/sist-banner.jpg';

function Login() {
  const [activeRole, setActiveRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      role: activeRole,
      username: form.get("username"),
      password: form.get("password"),
    };

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Login successful!");
        if (result.role === "admin") {
          navigate("/admin-dashboard");
        } else if (result.role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (result.role === "student") {
          navigate("/student-dashboard");
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("⚠️ Server error");
    }
  };

 return (
    <div className="login-container">
      <h1 className="title">
        SIST <span className="highlight">LMS</span>
      </h1>
      {/* Background Overlay */}
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
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Enter Username" required />
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
