import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import hero from "../../assets/images/care.jpg";

function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(15,32,67,.75), rgba(15,32,67,.75)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <div className="container">

        <div className="row">

          <div className="col-lg-7">

            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Your Health,
              <br />
              Our Supreme Priority
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "#f5f5f5",
                lineHeight: 1.8,
              }}
            >
              Access advanced diagnostics, expert doctors,
              and real-time appointment booking from one
              secure healthcare platform.
            </Typography>

            <Button
              component={Link}
              to="/appointment"
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
            >
              Book Appointment
            </Button>

            <Button
              component={Link}
              to="/about"
              variant="outlined"
              color="inherit"
              size="large"
            >
              Learn More
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;