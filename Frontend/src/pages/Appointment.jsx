import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import logo from "../assets/icons/hospital-logo.png";

function Appointment() {
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    api
      .get("/api/departments")
      .then((res) => setDepartments(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Failed to load departments:", err);
        setDepartments([]);
      })
      .finally(() => setDepartmentsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";

    if (!formData.department) newErrors.department = "Select a department.";
    if (!formData.date) newErrors.date = "Select a preferred date.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await api.post("/api/appointments", {
        patientName: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        department: formData.department,
        date: formData.date,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        department: "",
        date: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1565D8,#0A3FA3)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img src={logo} alt="Hospital Logo" style={{ height: 70 }} />
          </Box>

          <Typography variant="h4" fontWeight="bold" align="center" sx={{ color: "#0A3FA3", mb: 1 }}>
            Book Appointment
          </Typography>

          <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
            Schedule your visit with our expert doctors.
          </Typography>

          {submitted && (
            <Typography
              sx={{
                background: "#E8F5E9",
                color: "#2E7D32",
                p: 2,
                borderRadius: 2,
                mb: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Appointment booked successfully!
            </Typography>
          )}

          {submitError && (
            <Typography
              sx={{
                background: "#FDECEC",
                color: "#C0392B",
                p: 2,
                borderRadius: 2,
                mb: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {submitError}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />

            <TextField
              select
              fullWidth
              margin="normal"
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={Boolean(errors.department)}
              helperText={errors.department || (departmentsLoading ? "Loading departments…" : "")}
              disabled={departmentsLoading}
            >
              {departments.length === 0 && !departmentsLoading && (
                <MenuItem value="" disabled>
                  No departments available
                </MenuItem>
              )}
              {departments.map((dept) => (
                <MenuItem key={dept._id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Preferred Date"
              name="date"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={formData.date}
              onChange={handleChange}
              error={Boolean(errors.date)}
              helperText={errors.date}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Additional Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                background: "linear-gradient(135deg,#1565D8,#0A3FA3)",
                "&:hover": { background: "linear-gradient(135deg,#0A3FA3,#082E7A)" },
              }}
            >
              {submitting ? "Booking..." : "Submit Appointment"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Appointment;