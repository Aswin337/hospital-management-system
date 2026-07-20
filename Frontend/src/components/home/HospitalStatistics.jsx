import { Typography, Paper } from "@mui/material";
import hospitalData from "../../assets/images/HospitalData.png";

function HospitalStatistics() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#f8f9fa",
      }}
    >
      <div className="container text-center">

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          AK Hospital by the Numbers
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          mb={5}
        >
          Trusted healthcare backed by experience and excellence.
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <img
            src={hospitalData}
            alt="Hospital Statistics"
            className="img-fluid"
            style={{
              maxWidth: "850px",
              width: "100%",
            }}
          />
        </Paper>

      </div>
    </section>
  );
}

export default HospitalStatistics;