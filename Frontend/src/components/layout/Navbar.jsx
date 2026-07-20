import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

import logo from "../../assets/icons/hospital-logo.png";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#ffffff",
      }}
    >
      <Toolbar className="container">

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            width="45"
            alt="Hospital Logo"
          />

          <Typography
            variant="h6"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              ml: 2,
            }}
          >
            AK Hospital
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button component={Link} to="/">
          Home
        </Button>

        <Button component={Link} to="/about">
          About
        </Button>

        <Button component={Link} to="/doctors">
          Doctors
        </Button>

        <Button component={Link} to="/departments">
          Departments
        </Button>

        <Button component={Link} to="/services">
          Services
        </Button>

        <Button component={Link} to="/appointment">
          Appointment
        </Button>

        <Button component={Link} to="/contact">
          Contact
        </Button>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Login
        </Button>

        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{ ml: 1 }}
        >
          Sign Up
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;  