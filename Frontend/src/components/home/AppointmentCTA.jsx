import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function AppointmentCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1976d2, #0d47a1)",
        color: "white",
        padding: "90px 0",
      }}
    >
      <div className="container text-center">

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          Ready to Book Your Appointment?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: "700px",
            margin: "20px auto",
            opacity: 0.9,
            lineHeight: 1.8,
          }}
        >
          Schedule your consultation with our experienced doctors and receive
          quality healthcare without long waiting times.
        </Typography>

        <Button
          component={Link}
          to="/appointment"
          variant="contained"
          color="inherit"
          size="large"
          sx={{
            mt: 3,
            px: 5,
            py: 1.5,
            color: "#1976d2",
            fontWeight: "bold",
            borderRadius: 3,
          }}
        >
          Book Appointment
        </Button>

      </div>
    </section>
  );
}

export default AppointmentCTA;