import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import logo from "../assets/icons/hospital-logo.png";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleRoleChange = (event, newRole) => {
    if (newRole) {
      setRole(newRole);
      setErrors({});
    }
  };

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

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email should not be empty.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password should not be empty.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post(
        "/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const user = response.data.user;

      if (role === "admin") {
        if (user.role !== "admin") {
          alert("You are not an Admin.");
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        alert("Admin Login Successful!");

        navigate("/admin/dashboard");
      } else {
        if (user.role !== "user") {
          alert("You are not a Patient.");
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        alert("Login Successful!");

        navigate("/");
      }

      setFormData({
        email: "",
        password: "",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img src={logo} alt="Hospital Logo" style={{ height: 60 }} />
          </Box>

          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={700}
            sx={{ color: "#0A3FA3" }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {role === "admin"
              ? "Sign in to manage doctors, appointments and departments."
              : "Login to access your healthcare dashboard."}
          </Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton
              value="user"
              sx={{
                textTransform: "none",
                gap: 1,
                py: 1.1,
                "&.Mui-selected": {
                  backgroundColor: "#E3F2FD",
                  color: "#0A3FA3",
                  fontWeight: 700,
                },
              }}
            >
              <PersonIcon fontSize="small" />
              Patient
            </ToggleButton>

            <ToggleButton
              value="admin"
              sx={{
                textTransform: "none",
                gap: 1,
                py: 1.1,
                "&.Mui-selected": {
                  backgroundColor: "#E3F2FD",
                  color: "#0A3FA3",
                  fontWeight: 700,
                },
              }}
            >
              <SecurityIcon fontSize="small" />
              Admin
            </ToggleButton>
          </ToggleButtonGroup>

          <Box component="form" onSubmit={handleSubmit} noValidate>

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
  label="Password"
  name="password"
  type="password"
  value={formData.password}
  onChange={handleChange}
  error={Boolean(errors.password)}
  helperText={errors.password}
/>

{role === "user" && (
  <Typography align="right" sx={{ mt: 1 }}>
    <Link
      to="/forgot-password"
      style={{
        textDecoration: "none",
        color: "#1565D8",
        fontWeight: 600,
      }}
    >
      Forgot Password?
    </Link>
  </Typography>
)}

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
  {role === "admin" ? "Sign In as Admin" : "Login"}
</Button>

{role === "user" && (
  <Typography
    variant="body2"
    sx={{
      mt: 2,
      textAlign: "center",
    }}
  >
    Don't have an account?{" "}
    <Link
      to="/signup"
      style={{
        color: "#1565D8",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      Sign Up
    </Link>
  </Typography>
)}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;