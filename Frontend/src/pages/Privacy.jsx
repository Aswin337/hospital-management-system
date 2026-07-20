import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect personal information such as your name, email address, mobile number, and appointment details when you sign up, log in, or book an appointment through our platform.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used to manage your account, process appointment bookings, communicate updates, and improve our services. We do not sell your personal data to third parties.",
    },
    {
      title: "3. Data Storage",
      content:
        "Currently, data submitted through this platform is stored locally in your browser. As our system evolves, data will be securely stored and managed through our backend servers and database.",
    },
    {
      title: "4. Cookies",
      content:
        "We may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain features.",
    },
    {
      title: "5. Your Rights",
      content:
        "You have the right to access, update, or request deletion of your personal information at any time by contacting us through our Contact page.",
    },
    {
      title: "6. Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically. Continued use of our platform after changes indicates acceptance of the updated policy.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: July 2026
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {section.content}
          </Typography>
          {index < sections.length - 1 && <Divider sx={{ mt: 3 }} />}
        </Box>
      ))}
    </Container>
  );
}

export default Privacy;