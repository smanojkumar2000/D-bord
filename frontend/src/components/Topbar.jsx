import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Topbar({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    alert("You have been logged out successfully!");
    onLogout(); // 🔹 Calls App.js logout function
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 250,
        right: 0,
        height: 60,
        background: "linear-gradient(180deg, #ffb380, #ff944d)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        px: 3,
        zIndex: 10,
        color: "white",
      }}
    >
      <IconButton sx={{ color: "white" }}>
        <NotificationsIcon />
      </IconButton>

      <IconButton sx={{ color: "white" }} onClick={handleMenuOpen}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleLogout}>🚪 Logout</MenuItem>
      </Menu>
    </Box>
  );
}
