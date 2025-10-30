import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Fade } from "@mui/material";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedInUser", "admin");
      setMessage("✅ Login successful!");
      setTimeout(() => onLogin(), 800);
    } else {
      setMessage("❌ Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 400, // 🔹 Makes it responsive (mobile = 100%, desktop = 400px)
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#ff6600",
              mb: 3,
              fontWeight: 700,
            }}
          >
            🔐 Admin Login
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                backgroundColor: "#ff6600",
                "&:hover": { backgroundColor: "#e65c00" },
              }}
            >
              Login
            </Button>
          </form>

          <Typography
            sx={{
              mt: 2,
              color: message.includes("✅") ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}
