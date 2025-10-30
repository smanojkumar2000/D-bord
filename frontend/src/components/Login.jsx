import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      setMessage("✅ Login successful!");
      setTimeout(() => onLogin(), 800);
    } else {
      setMessage("❌ Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "45px 40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "360px",
          textAlign: "center",
          animation: "slideIn 0.8s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#ff6600",
            marginBottom: "25px",
            fontWeight: "700",
            fontSize: "26px",
          }}
        >
          🔐 Admin Login
        </h2>

        <form
          onSubmit={handleSubmit}
          autoComplete="on" // ✅ Enables browser to suggest and save passwords
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username" // ✅ Chrome/Edge/Firefox will now offer saved usernames
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
              textAlign: "center",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" // ✅ Enables password suggestions
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
              textAlign: "center",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#ff6600",
              color: "white",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e65c00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6600")}
          >
            Login
          </button>
        </form>

        <p style={{ color: "#cc0000", marginTop: "15px", fontWeight: "500" }}>
          {message}
        </p>
      </div>

      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateY(40px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
