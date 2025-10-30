import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function AssignTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    goal: "",
    selectedTask: "",
  });

  const goals = ["Goal 1", "Goal 2", "Goal 3"];
  const taskOptions = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

  useEffect(() => {
    // 🔹 Load members from localStorage (entered from Member Entry page)
    const data = JSON.parse(localStorage.getItem("assignTasks")) || [];
    setTasks(data);
  }, []);

  const handleOpen = (member) => {
    setSelectedMember(member);
    setFormData({
      goal: "",
      selectedTask: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ goal: "", selectedTask: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Assign task → save to finalTasks and mark as green in assignTasks
  const handleAssign = () => {
    const updatedTasks = tasks.map((t) =>
      t.idNum === selectedMember.idNum
        ? { ...t, goal: formData.goal, selectedTask: formData.selectedTask, assigned: true }
        : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("assignTasks", JSON.stringify(updatedTasks));

    // 🔸 Save in finalTasks storage separately
    const finalData = JSON.parse(localStorage.getItem("finalTasks")) || [];
    const newFinal = {
      ...selectedMember,
      goal: formData.goal,
      selectedTask: formData.selectedTask,
      assigned: true,
    };
    localStorage.setItem("finalTasks", JSON.stringify([...finalData, newFinal]));

    alert("✅ Task Assigned Successfully!");
    handleClose();
  };

  // 🔹 Delete record
  const handleDelete = (index) => {
    if (window.confirm("Delete this member record?")) {
      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
      localStorage.setItem("assignTasks", JSON.stringify(updated));
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#fffaf5", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#ff944d" }}
      >
        📋 Assign Task Table
      </Typography>

      <Paper elevation={4}>
        <Table>
          <TableHead sx={{ background: "#ff944d" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Domain</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time Slot</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Goal</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Task</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: row.assigned ? "#d9fdd3" : "white", // ✅ light green when assigned
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell
                  sx={{ color: "#0077cc", cursor: "pointer" }}
                  onClick={() => handleOpen(row)}
                >
                  {row.name}
                </TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.idNum}</TableCell>
                <TableCell>{row.timeSlot}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.goal || "-"}</TableCell>
                <TableCell>{row.selectedTask || "-"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 🔹 Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>🎯 Assign Task to {selectedMember?.name}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Select Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            margin="normal"
          >
            {goals.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          {formData.goal && (
            <TextField
              select
              fullWidth
              label="Select Task"
              name="selectedTask"
              value={formData.selectedTask}
              onChange={handleChange}
              margin="normal"
            >
              {taskOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            variant="contained"
            sx={{
              backgroundColor: "#ff944d",
              "&:hover": { backgroundColor: "#ff7b29" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
