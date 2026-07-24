import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import logo from "../assets/icons/hospital-logo.png";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim())
      newErrors.name = "Name should not be empty.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim()) {
      newErrors.email = "Email should not be empty.";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid email.";
    }

    const mobileRegex = /^[0-9]{10}$/;

    if (!data.mobile.trim()) {
      newErrors.mobile = "Mobile number should not be empty.";
    } else if (!mobileRegex.test(data.mobile)) {
      newErrors.mobile = "Mobile number must contain exactly 10 digits.";
    }

    if (!data.password) {
      newErrors.password = "Password should not be empty.";
    } else if (data.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters.";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await api.post(
      "/api/users",
      {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }
    );

    console.log("Response:", response.data);

    alert(response.data.message);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Unable to connect to the server.");
    }
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1565D8 0%, #0A3FA3 100%)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={logo}
              alt="Hospital Logo"
              style={{ height: 60 }}
            />
          </Box>

          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={700}
            sx={{ color: "#0A3FA3" }}
          >
            Create Your Account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Sign up to book appointments and manage your healthcare with ease.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
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
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #1565D8, #0A3FA3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0A3FA3, #082E7A)",
                },
              }}
            >
              Sign Up
            </Button>

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1565D8",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;