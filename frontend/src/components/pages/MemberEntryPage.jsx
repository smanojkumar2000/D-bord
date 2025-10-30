import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

export default function MemberEntryPage() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    idNumber: "",
    date: "",
    timeSlot: "",
    goal: "",
    selectedTask: "",
    taskDetails: "",
  });

  const goals = ["Goal 1", "Goal 2", "Goal 3"];
  const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldData = JSON.parse(localStorage.getItem("assignTasks")) || [];
    const newData = [...oldData, formData];
    localStorage.setItem("assignTasks", JSON.stringify(newData));
    alert("✅ Task Assigned & Saved Successfully!");
    setFormData({
      name: "",
      domain: "",
      idNumber: "",
      date: "",
      timeSlot: "",
      goal: "",
      selectedTask: "",
      taskDetails: "",
    });
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 👈 move from center to top
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff5e6, #ffe0b3)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 420,
          background: "white",
          mt: 6, // 👈 margin from top
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#ff944d",
          }}
        >
          👥 Member Entry & Task Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="date"
            name="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            fullWidth
            label="Time Slot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Select Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            margin="normal"
            required
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
              required
            >
              {tasks.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              backgroundColor: "#ff944d",
              "&:hover": { backgroundColor: "#ff7b29" },
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
