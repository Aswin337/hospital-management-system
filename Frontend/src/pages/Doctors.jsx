import { useEffect, useState } from "react";
import api from "../utils/api";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const specialtyStyles = {
  Cardiologist: { color: "#C0392B", bg: "#FDECEC" },
  Neurologist: { color: "#6B46C1", bg: "#F3E5F5" },
  "Orthopedic Surgeon": { color: "#B7791F", bg: "#FFF3E0" },
  Pediatrician: { color: "#2F9E67", bg: "#E8F5E9" },
  Ophthalmologist: { color: "#0E7C86", bg: "#E1F5FE" },
  "General Physician": { color: "#2B6CB0", bg: "#E3F2FD" },
};
const defaultStyle = { color: "#2B6CB0", bg: "#E3F2FD" };

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/doctors")
      .then((res) => setDoctors(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Failed to load doctors:", err);
        setDoctors([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Box sx={{ backgroundColor: "#0A3FA3", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: 30, md: 42 } }}
          >
            Our Doctors
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", mt: 1.5, maxWidth: 620 }}>
            Meet our team of experienced and dedicated medical professionals.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#F7F9FC", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          {loading ? (
            <Typography textAlign="center" color="text.secondary">
              Loading doctors…
            </Typography>
          ) : doctors.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No doctors available right now. Please check back soon.
            </Typography>
          ) : (
            <Box>
              {doctors.map((doc, index) => {
                const style = specialtyStyles[doc.specialty] || defaultStyle;
                return (
                  <Box
                    key={doc._id}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: { xs: 2, sm: 3 },
                      py: 3,
                      px: { sm: 1 },
                      borderTop: index === 0 ? "none" : "1px solid #E2E8F0",
                    }}
                  >
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        backgroundColor: style.bg,
                        color: style.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {doc.name?.charAt(0).toUpperCase()}
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "#16241F" }}>
                        {doc.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                        <Chip
                          label={doc.specialty}
                          size="small"
                          sx={{ backgroundColor: style.bg, color: style.color, fontWeight: 700 }}
                        />
                        <Typography variant="caption" sx={{ color: "#8A958E" }}>
                          {doc.experience}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      to={`/doctors/${doc._id}`}
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: "999px",
                        borderColor: style.color,
                        color: style.color,
                        fontWeight: 600,
                        px: 3,
                        flexShrink: 0,
                        "&:hover": { borderColor: style.color, backgroundColor: style.bg },
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                );
              })}
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
}

export default Doctors;