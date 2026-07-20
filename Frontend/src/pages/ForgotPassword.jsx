import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email should not be empty.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Check this email actually matches the one stored user record.
    // Real "reset link" delivery needs a backend — this just confirms
    // the account exists for now, matching your current localStorage setup.
    const storedUser = JSON.parse(localStorage.getItem("signupData"));

    if (!storedUser || storedUser.email !== email) {
      setError("No account found with this email.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>

        {submitted ? (
          <Typography sx={{ mt: 2 }}>
            If this were connected to a backend, a reset link would be sent to{" "}
            <strong>{email}</strong> now.
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Enter your registered email"
              name="email"
              value={email}
              onChange={handleChange}
              error={Boolean(error)}
              helperText={error}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Send Reset Link
            </Button>
          </Box>
        )}

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Remembered your password? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;