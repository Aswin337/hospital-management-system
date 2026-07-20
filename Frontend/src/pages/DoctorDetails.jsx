import Layout from "../components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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

  // Same placeholder dataset as Doctors.jsx — in a real app this would
  // come from a shared data file or a backend fetch by id instead of
  // being duplicated here.
  const doctors = [
    {
      id: 1,
      name: "Dr. Arun Kumar",
      specialty: "Cardiologist",
      experience: "12 years experience",
      image: "https://via.placeholder.com/300x300.png?text=Doctor",
      about:
        "Dr. Arun Kumar specializes in diagnosing and treating heart conditions, with a strong focus on preventive cardiology and minimally invasive procedures.",
      education: "MBBS, MD (Cardiology)",
      availability: "Mon - Fri, 9:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialty: "Neurologist",
      experience: "9 years experience",
      image: "https://via.placeholder.com/300x300.png?text=Doctor",
      about:
        "Dr. Priya Sharma treats disorders of the brain, spine, and nervous system, with special interest in stroke recovery and epilepsy management.",
      education: "MBBS, DM (Neurology)",
      availability: "Mon - Sat, 10:00 AM - 5:00 PM",
    },
    {
      id: 3,
      name: "Dr. Karthik Raja",
      specialty: "Orthopedic Surgeon",
      experience: "15 years experience",
      image: "https://via.placeholder.com/300x300.png?text=Doctor",
      about:
        "Dr. Karthik Raja specializes in joint replacement and sports injury treatment, helping patients regain mobility and strength.",
      education: "MBBS, MS (Orthopedics)",
      availability: "Tue - Sat, 9:00 AM - 3:00 PM",
    },
    {
      id: 4,
      name: "Dr. Meena Iyer",
      specialty: "Pediatrician",
      experience: "8 years experience",
      image: "https://via.placeholder.com/300x300.png?text=Doctor",
      about:
        "Dr. Meena Iyer provides compassionate care for infants, children, and adolescents, covering routine checkups to childhood illnesses.",
      education: "MBBS, MD (Pediatrics)",
      availability: "Mon - Fri, 11:00 AM - 6:00 PM",
    },
  ];

  const doctor = doctors.find((doc) => doc.id === Number(id));

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
      {/* Profile sheet — sidebar of facts + main bio column, distinct from the
          card grid (Departments) and row list (Doctors) layouts elsewhere. */}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 4, sm: 6 },
            }}
          >
            {/* Left: photo + quick facts */}
            <Box sx={{ width: { xs: "100%", sm: 220 }, flexShrink: 0 }}>
              <Box
                component="img"
                src={doctor.image}
                alt={doctor.name}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `4px solid ${style.bg}`,
                  display: "block",
                  mx: { xs: "auto", sm: 0 },
                  mb: 3,
                }}
              />

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

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 19, color: style.color, mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: "#334155" }}>
                  {doctor.education}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 3.5 }}>
                <AccessTimeIcon sx={{ fontSize: 19, color: style.color, mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: "#334155" }}>
                  {doctor.availability}
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

            {/* Right: name + bio */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#16241F", fontSize: { xs: 28, md: 34 } }}
              >
                {doctor.name}
              </Typography>

              <Divider sx={{ my: 3, borderColor: "#E2E8F0" }} />

              <Typography
                variant="overline"
                sx={{ color: style.color, fontWeight: 700, letterSpacing: "0.08em" }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: "#4B5A62", lineHeight: 1.85 }}
              >
                {doctor.about}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default DoctorDetails;