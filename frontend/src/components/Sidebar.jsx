import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAltIcon from "@mui/icons-material/Task";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Member Entry", icon: <GroupIcon />, path: "/member" },
    { text: "Assign Task", icon: <AssignmentIcon />, path: "/assign" },
    { text: "Final Task", icon: <TaskAltIcon />, path: "/final" },
  ];

  return (
    <Box
      sx={{
        width: 230,
        background: "linear-gradient(180deg, #ffb380, #ff944d)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        p: "20px 10px",
        boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, pl: "5px" }}>
        🧩 D-board
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              color: "white",
              borderRadius: "8px",
              mb: 1,
              backgroundColor:
                location.pathname === item.path ? "rgba(255,255,255,0.2)" : "transparent",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 1 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
