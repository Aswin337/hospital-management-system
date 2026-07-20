import Layout from "../components/layout/Layout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HealingIcon from "@mui/icons-material/Healing";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const departments = [
  {
    name: "General Medicine",
    description:
      "Primary and urgent care for a wide range of health conditions.",
    icon: LocalHospitalIcon,
    color: "#2B6CB0",
    bg: "#E3F2FD",
  },
  {
    name: "Cardiology",
    description:
      "Diagnostics, treatment and surgery for the heart and vascular system.",
    icon: FavoriteIcon,
    color: "#C0392B",
    bg: "#FDECEC",
  },
  {
    name: "Orthopedics",
    description:
      "Care for bones, joints, muscles and sports-related injuries.",
    icon: HealingIcon,
    color: "#B7791F",
    bg: "#FFF3E0",
  },
  {
    name: "Neurology",
    description:
      "Expert diagnosis and treatment for the brain, spine and nervous system.",
    icon: PsychologyIcon,
    color: "#6B46C1",
    bg: "#F3E5F5",
  },
  {
    name: "Pediatrics",
    description:
      "Dedicated healthcare for infants, children and adolescents.",
    icon: ChildCareIcon,
    color: "#2F9E67",
    bg: "#E8F5E9",
  },
  {
    name: "Ophthalmology",
    description:
      "Complete eye care, from routine checkups to advanced surgery.",
    icon: VisibilityIcon,
    color: "#0E7C86",
    bg: "#E1F5FE",
  },
];

function Departments() {
  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0F4C81 0%, #1976D2 50%, #42A5F5 100%)",
          py: { xs: 8, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Our Medical Departments
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              mt: 2,
              maxWidth: 700,
              mx: "auto",
              fontSize: "1.05rem",
            }}
          >
            Providing specialized healthcare with experienced doctors,
            advanced technology, and compassionate treatment across all
            departments.
          </Typography>
        </Container>
      </Box>

      {/* Departments */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #EAF4FF 0%, #F4FAFF 100%)",
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#0F4C81",
                fontSize: { xs: "1.7rem", md: "2.2rem" },
              }}
            >
              Our Specialized Departments
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                mt: 1.5,
                maxWidth: 620,
                mx: "auto",
                fontSize: "1rem",
              }}
            >
              Every department is staffed by experienced specialists and
              equipped with modern technology to give you the best care
              possible.
            </Typography>
          </Box>

          {/* CSS Grid instead of MUI Grid -> guarantees identical column widths */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
              alignItems: "stretch",
            }}
          >
            {departments.map((dept) => {
              const Icon = dept.icon;

              return (
                <Card
                  key={dept.name}
                  sx={{
                    height: 420,
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "24px",
                    p: 3.5,
                    backgroundColor: dept.bg,
                    borderTop: `6px solid ${dept.color}`,
                    boxShadow: "0 12px 30px rgba(15,76,129,0.12)",
                    transition:
                      "transform 0.35s ease, box-shadow 0.35s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: `0 24px 48px ${dept.color}40`,
                    },
                  }}
                >
                  {/* Top block: icon + title + description */}
                  <Box>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: dept.color,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 3,
                        boxShadow: `0 10px 22px ${dept.color}66`,
                      }}
                    >
                      <Icon sx={{ fontSize: 38, color: "#fff" }} />
                    </Box>

                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          color: "#16241F",
                          minHeight: 40,
                          mb: 1.5,
                        }}
                      >
                        {dept.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(22,36,31,0.7)",
                          lineHeight: 1.75,
                          minHeight: 90,
                        }}
                      >
                        {dept.description}
                      </Typography>
                    </CardContent>
                  </Box>

                  {/* Button always pinned to bottom */}
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: 3,
                      backgroundColor: dept.color,
                      textTransform: "none",
                      borderRadius: "999px",
                      py: 1.3,
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      boxShadow: "none",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        backgroundColor: dept.color,
                        filter: "brightness(0.9)",
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 22px ${dept.color}55`,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Card>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default Departments;