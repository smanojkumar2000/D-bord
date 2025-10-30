import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function DashboardPage() {
  const [members, setMembers] = useState([]);
  const [assignTasks, setAssignTasks] = useState([]);
  const [finalTasks, setFinalTasks] = useState([]);
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    const m = JSON.parse(localStorage.getItem("members")) || [];
    const a = JSON.parse(localStorage.getItem("assignTasks")) || [];
    const f = JSON.parse(localStorage.getItem("finalTasks")) || [];

    setMembers(m);
    setAssignTasks(a);
    setFinalTasks(f);
  }, []);

  // 🔹 Summary Counts
  const memberCount = members.length;
  const assignedCount = assignTasks.length;
  const completedCount = finalTasks.filter((t) => t.status === "Completed").length;
  const pendingCount = finalTasks.filter((t) => t.status === "Pending" || !t.status).length;

  // 🔹 Filter today's entries
  const todayMembers = members.filter((m) => m.date === today);
  const todayAssigned = assignTasks.filter((t) => t.date === today);
  const todayFinal = finalTasks.filter((t) => t.date === today);

  return (
    <Box sx={{ p: 4, bgcolor: "#fffaf5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#ff944d", fontWeight: "bold", textAlign: "center" }}
      >
        📅 Dashboard — {today}
      </Typography>

      {/* Summary boxes */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, bgcolor: "#e6f7ff", textAlign: "center" }}>
            <Typography variant="h6">👥 Total Members</Typography>
            <Typography variant="h5" sx={{ color: "#007acc", fontWeight: "bold" }}>
              {memberCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, bgcolor: "#ffebcc", textAlign: "center" }}>
            <Typography variant="h6">📝 Assigned Tasks</Typography>
            <Typography variant="h5" sx={{ color: "#e65c00", fontWeight: "bold" }}>
              {assignedCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, bgcolor: "#fff2e6", textAlign: "center" }}>
            <Typography variant="h6">🕓 Pending Tasks</Typography>
            <Typography variant="h5" sx={{ color: "#ff6600", fontWeight: "bold" }}>
              {pendingCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 3, bgcolor: "#d6f5d6", textAlign: "center" }}>
            <Typography variant="h6">✅ Completed Tasks</Typography>
            <Typography variant="h5" sx={{ color: "green", fontWeight: "bold" }}>
              {completedCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Today’s entries section */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#ff944d", fontWeight: "bold" }}
        >
          📋 Today’s Entries
        </Typography>

        <Grid container spacing={3}>
          {/* Today Members */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                👥 New Members
              </Typography>
              {todayMembers.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Domain</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayMembers.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.domain}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography color="text.secondary">No new members today</Typography>
              )}
            </Paper>
          </Grid>

          {/* Today Assigned */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                📝 Assigned Tasks
              </Typography>
              {todayAssigned.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Task</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayAssigned.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell>{t.name}</TableCell>
                        <TableCell>{t.selectedTask}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography color="text.secondary">No assigned tasks today</Typography>
              )}
            </Paper>
          </Grid>

          {/* Today Final (Completed/Pending) */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                🎯 Task Status Today
              </Typography>
              {todayFinal.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Task</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayFinal.map((t, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          bgcolor:
                            t.status === "Completed" ? "#d9f7d9" : "#fff2e6",
                        }}
                      >
                        <TableCell>{t.selectedTask}</TableCell>
                        <TableCell>{t.status || "Pending"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography color="text.secondary">No task updates today</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
