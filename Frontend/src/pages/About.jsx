import Layout from "../components/layout/Layout";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";

function About() {
  const values = [
    {
      title: "Our Mission",
      description:
        "To provide accessible, high-quality healthcare to every patient who walks through our doors, backed by modern technology and compassionate care.",
    },
    {
      title: "Our Vision",
      description:
        "To be a leading hospital known for excellence in treatment, patient trust, and continuous innovation in medical services.",
    },
    {
      title: "Our Values",
      description:
        "Integrity, empathy, and dedication guide every interaction — from the front desk to the operating room.",
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <Box sx={{ backgroundColor: "#0A3FA3", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{ color :"rgb(255, 255, 255)",fontSize: { xs: 30, md: 42 } }}
          >
            About Us
          </Typography>
          <Typography
            sx={{ color: "rgb(255, 255, 255)", mt: 1.5, maxWidth: 620 }}
          >
            We are committed to delivering trusted healthcare services to our
            community, combining experienced medical professionals with a
            patient-first approach.
          </Typography>
        </Container>
      </Box>

      {/* Mission / Vision / Values */}
      <Box sx={{ backgroundColor: "#F7F9FC", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr 1fr",
              },
              gap: 3,
              alignItems: "stretch",
            }}
          >
            {values.map((item) => (
              <Card
                key={item.title}
                sx={{
                  height: 260,
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  p: 3,
                  backgroundColor: "#E3F2FD",
                  borderTop: "5px solid #0A3FA3",
                  boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
                  transition: "box-shadow .2s ease, transform .2s ease",
                  "&:hover": {
                    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.14)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#0A3FA3" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#334155", lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Why Choose Us */}
          <Box sx={{ mt: 7 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Why Choose Us
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              With experienced doctors, modern facilities, and a focus on
              patient comfort, our hospital has served the community with
              reliable care for years. Every department works together to
              ensure fast, accurate, and compassionate treatment.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default About;