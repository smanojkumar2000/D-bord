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
  MenuItem,
  TextField,
} from "@mui/material";

export default function FinalTaskPage() {
  const [finalTasks, setFinalTasks] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("finalTasks")) || [];
    setFinalTasks(data);
  }, []);

  // Save tasks to localStorage
  const saveToLocalStorage = (data) => {
    setFinalTasks(data);
    localStorage.setItem("finalTasks", JSON.stringify(data));
  };

  // Open status dialog
  const handleOpenStatus = (task) => {
    setSelectedTask(task);
    setStatus(task.status || "");
    setOpenStatus(true);
  };

  // Open delete confirm dialog
  const handleOpenDelete = (task) => {
    setSelectedTask(task);
    setOpenDelete(true);
  };

  // Close dialogs
  const handleCloseAll = () => {
    setOpenStatus(false);
    setOpenDelete(false);
    setSelectedTask(null);
    setStatus("");
  };

  // Update status
  const handleSubmitStatus = () => {
    const updated = finalTasks.map((t) =>
      t.name === selectedTask.name ? { ...t, status } : t
    );
    saveToLocalStorage(updated);
    handleCloseAll();
  };

  // Delete task
  const handleConfirmDelete = () => {
    const updated = finalTasks.filter((t) => t.name !== selectedTask.name);
    saveToLocalStorage(updated);
    handleCloseAll();
  };

  // Row color based on status
  const getRowStyle = (status) => {
    if (status === "Completed") return { backgroundColor: "#c8f7c5" }; // light green
    if (status === "Pending") return { backgroundColor: "#ffe6b3" }; // light orange
    return { backgroundColor: "white" };
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#fdf7f3", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#ff944d" }}
      >
        ✅ Final Task Table
      </Typography>

      <Paper elevation={4}>
        <Table>
          <TableHead sx={{ background: "#ff944d" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Goal</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Task</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time Slot</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {finalTasks.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: "pointer",
                  ...getRowStyle(row.status),
                }}
              >
                <TableCell onClick={() => handleOpenStatus(row)}>
                  {row.name}
                </TableCell>
                <TableCell>{row.goal}</TableCell>
                <TableCell>{row.selectedTask}</TableCell>
                <TableCell>{row.timeSlot}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <strong>
                    {row.status ? row.status : "Not Updated"}
                  </strong>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenDelete(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 🔹 Status Update Dialog */}
      <Dialog open={openStatus} onClose={handleCloseAll}>
        <DialogTitle>📝 Update Task Status</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            <strong>{selectedTask?.name}</strong> — {selectedTask?.selectedTask}
          </Typography>

          <TextField
            select
            label="Select Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Completed">✅ Completed</MenuItem>
            <MenuItem value="Pending">⏳ Pending</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAll} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitStatus}
            variant="contained"
            sx={{
              backgroundColor: "#ff944d",
              "&:hover": { backgroundColor: "#ff7b29" },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔹 Delete Confirm Dialog */}
      <Dialog open={openDelete} onClose={handleCloseAll}>
        <DialogTitle>⚠️ Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedTask?.name}</strong>’s task?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAll} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
