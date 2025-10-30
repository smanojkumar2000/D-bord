import React from "react";

export default function Dashboard({ onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "230px",
          background: "linear-gradient(180deg, #ffb380, #ff944d)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px 15px",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "25px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          🧩 Dashboard
        </h2>

        {/* Navigation Menu */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px", // equal gap for all items
          }}
        >
          <a href="#" style={linkStyle}>🏠 Home</a>
          <a href="#" style={linkStyle}>👥 Member Entry</a>
          <a href="#" style={linkStyle}>📝 Assign Task</a>
          <a href="#" style={linkStyle}>✅ Final Task</a>
          <a href="#" style={linkStyle}>🚪 Logout</a>
        </nav>
      </div>

      {/* Main Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fffaf5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <div
          style={{
            height: "60px",
            backgroundColor: "#fff5eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 25px",
            borderBottom: "1px solid #ffe0cc",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              color: "#ff6600",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            ⚙️ Admin Panel
          </h3>

          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#ff944d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7f2a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff944d")}
          >
            🔔 Logout
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "30px 40px" }}>
          <h2 style={{ color: "#ff6600", marginBottom: "10px" }}>
            Welcome to the Dashboard!
          </h2>
          <p style={{ color: "#444", lineHeight: "1.6" }}>
            Use the sidebar to navigate between different sections.
          </p>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
  transition: "0.3s",
  padding: "8px 16px",
  borderRadius: "8px",
  textAlign: "left",
  display: "block",
  cursor: "pointer",
};
