import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./components/pages/DashboardPage";
import MemberEntryPage from "./components/pages/MemberEntryPage";
import AssignTaskPage from "./components/pages/AssignTaskPage";
import FinalTaskPage from "./components/pages/FinalTaskPage";
import LoginPage from "./components/pages/LoginPage";
import { Box } from "@mui/material";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("loggedInUser")
  );

  const handleLogin = () => {
    localStorage.setItem("loggedInUser", "admin");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
  };

  return (
    <Router>
      {loggedIn ? (
        <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
          <Sidebar />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Topbar onLogout={handleLogout} />
            <Box sx={{ flex: 1, p: 3, mt: "60px", bgcolor: "#fffaf5" }}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/member" element={<MemberEntryPage />} />
                <Route path="/assign" element={<AssignTaskPage />} />
                <Route path="/final" element={<FinalTaskPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
