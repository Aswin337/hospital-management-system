import Layout from "../components/layout/Layout";
import { Container, Typography, Box, Chip } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BiotechIcon from "@mui/icons-material/Biotech";
import EmergencyIcon from "@mui/icons-material/Emergency";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

// Distinct shape from the other pages: an alternating zigzag list rather
// than a card grid (Departments), editorial rows (About), or an avatar
// list (Doctors) — each service faces the opposite direction from the
// one before it, which reads as a "walkthrough" rather than a directory.
const services = [
  {
    title: "General Consultation",
    description:
      "Walk-in and scheduled consultations with our general physicians for everyday health concerns, checkups, and referrals to the right specialist.",
    icon: LocalHospitalIcon,
    color: "#2B6CB0",
    bg: "#E3F2FD",
    tags: ["Walk-in", "Scheduled visits", "Referrals"],
  },
  {
    title: "Diagnostic Lab Services",
    description:
      "On-site blood work, imaging, and pathology testing with results shared directly with your treating doctor for faster decisions.",
    icon: BiotechIcon,
    color: "#6B46C1",
    bg: "#F3E5F5",
    tags: ["Blood tests", "Imaging", "Pathology"],
  },
  {
    title: "Emergency Care",
    description:
      "24/7 emergency response with a dedicated trauma team, ready to stabilize and treat critical conditions the moment you arrive.",
    icon: EmergencyIcon,
    color: "#C0392B",
    bg: "#FDECEC",
    tags: ["24/7 availability", "Trauma team", "Rapid response"],
  },
  {
    title: "Surgery & Operation Theatre",
    description:
      "Modern operation theatres for both planned and emergency procedures, supported by experienced surgical and anesthesia teams.",
    icon: MedicalServicesIcon,
    color: "#B7791F",
    bg: "#FFF3E0",
    tags: ["Planned surgery", "Emergency surgery", "Post-op care"],
  },
  {
    title: "Pharmacy",
    description:
      "An in-house pharmacy stocked with prescribed medication, so patients can fill prescriptions on-site without an extra trip.",
    icon: LocalPharmacyIcon,
    color: "#2F9E67",
    bg: "#E8F5E9",
    tags: ["In-house pharmacy", "Prescription filling"],
  },
  {
    title: "Ambulance Service",
    description:
      "Emergency ambulance dispatch with trained paramedics on board, connecting patients to care from the moment of pickup.",
    icon: AirportShuttleIcon,
    color: "#0E7C86",
    bg: "#E1F5FE",
    tags: ["Emergency dispatch", "Paramedic support"],
  },
];

function Services() {
  return (
    <Layout>
      {/* Header */}
      <Box sx={{ backgroundColor: "#0A3FA3", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{ fontSize: { xs: 30, md: 42 } }}
          >
            Our Services
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.85)", mt: 1.5, maxWidth: 620 }}
          >
            From routine consultations to emergency response, here's how we
            support your care at every stage.
          </Typography>
        </Container>
      </Box>

      {/* Zigzag service list */}
      <Box sx={{ backgroundColor: "#FFFFFF", py: { xs: 7, md: 10 } }}>
        <Container maxWidth="md">
          {services.map((service, index) => {
            const Icon = service.icon;
            const reversed = index % 2 === 1;

            return (
              <Box
                key={service.title}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: reversed ? "row-reverse" : "row",
                  },
                  alignItems: "flex-start",
                  gap: { xs: 2.5, sm: 4 },
                  py: { xs: 4, sm: 5 },
                  borderTop: index === 0 ? "none" : "1px solid #E2E8F0",
                  textAlign: { xs: "left", sm: reversed ? "right" : "left" },
                }}
              >
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    minWidth: 88,
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: service.bg,
                    boxShadow: `0 10px 22px ${service.color}30`,
                  }}
                >
                  <Icon sx={{ fontSize: 40, color: service.color }} />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#16241F", mb: 1 }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#4B5A62",
                      lineHeight: 1.8,
                      maxWidth: 560,
                      ml: { sm: reversed ? "auto" : 0 },
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 2,
                      justifyContent: {
                        xs: "flex-start",
                        sm: reversed ? "flex-end" : "flex-start",
                      },
                    }}
                  >
                    {service.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: service.bg,
                          color: service.color,
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Container>
      </Box>
    </Layout>
  );
}

export default Services;