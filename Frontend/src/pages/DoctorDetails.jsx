import { useEffect, useState } from "react";
import api from "../utils/api";
import Layout from "../components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const specialtyStyles = {
  Cardiologist: { color: "#C0392B", bg: "#FDECEC" },
  Neurologist: { color: "#6B46C1", bg: "#F3E5F5" },
  "Orthopedic Surgeon": { color: "#B7791F", bg: "#FFF3E0" },
  Pediatrician: { color: "#2F9E67", bg: "#E8F5E9" },
  Ophthalmologist: { color: "#0E7C86", bg: "#E1F5FE" },
  "General Physician": { color: "#2B6CB0", bg: "#E3F2FD" },
};
const defaultStyle = { color: "#2B6CB0", bg: "#E3F2FD" };

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => {
        console.error("Failed to load doctor:", err);
        setDoctor(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Container sx={{ py: 10, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (!doctor) {
    return (
      <Layout>
        <Container sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Doctor not found.
          </Typography>
          <Button
            component={Link}
            to="/doctors"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#0A3FA3",
              textTransform: "none",
              borderRadius: "999px",
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#0A3FA3", filter: "brightness(0.9)" },
            }}
          >
            Back to Doctors
          </Button>
        </Container>
      </Layout>
    );
  }

  const style = specialtyStyles[doctor.specialty] || defaultStyle;

  return (
    <Layout>
      <Box sx={{ backgroundColor: "#F7F9FC", py: { xs: 6, md: 9 } }}>
        <Container maxWidth="md">
          <Button
            component={Link}
            to="/doctors"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 3,
              textTransform: "none",
              color: "#0A3FA3",
              fontWeight: 600,
              "&:hover": { backgroundColor: "transparent", opacity: 0.75 },
            }}
          >
            Back to Doctors
          </Button>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 4, sm: 6 } }}>
            <Box sx={{ width: { xs: "100%", sm: 220 }, flexShrink: 0 }}>
              <Box
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  backgroundColor: style.bg,
                  color: style.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 56,
                  mx: { xs: "auto", sm: 0 },
                  mb: 3,
                }}
              >
                {doctor.name?.charAt(0).toUpperCase()}
              </Box>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "999px",
                  backgroundColor: style.bg,
                  color: style.color,
                  fontWeight: 700,
                  fontSize: 13,
                  mb: 2.5,
                }}
              >
                {doctor.specialty}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
                <WorkHistoryIcon sx={{ fontSize: 19, color: style.color }} />
                <Typography variant="body2" sx={{ color: "#334155" }}>
                  {doctor.experience}
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/appointment"
                variant="contained"
                startIcon={<CalendarMonthIcon />}
                fullWidth
                sx={{
                  backgroundColor: style.color,
                  textTransform: "none",
                  borderRadius: "999px",
                  py: 1.2,
                  fontWeight: "bold",
                  boxShadow: "none",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: style.color,
                    filter: "brightness(0.9)",
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 22px ${style.color}55`,
                  },
                }}
              >
                Book Appointment
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F", fontSize: { xs: 28, md: 34 } }}>
                {doctor.name}
              </Typography>

              <Divider sx={{ my: 3, borderColor: "#E2E8F0" }} />

              <Typography variant="overline" sx={{ color: style.color, fontWeight: 700, letterSpacing: "0.08em" }}>
                About
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: "#4B5A62", lineHeight: 1.85 }}>
                {doctor.specialty} with {doctor.experience}.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default DoctorDetails;