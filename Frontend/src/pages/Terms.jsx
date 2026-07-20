import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using this hospital management platform, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the platform.",
    },
    {
      title: "2. Use of Services",
      content:
        "This platform allows you to register an account, book appointments, and access hospital-related information. You agree to provide accurate information during signup and appointment booking.",
    },
    {
      title: "3. Account Responsibility",
      content:
        "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
    },
    {
      title: "4. Appointment Bookings",
      content:
        "Appointment requests submitted through this platform are subject to confirmation by hospital staff. Submitting a request does not guarantee an appointment slot.",
    },
    {
      title: "5. Medical Disclaimer",
      content:
        "Information provided on this platform is for general purposes only and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified physician for medical concerns.",
    },
    {
      title: "6. Limitation of Liability",
      content:
        "The hospital and platform operators are not liable for any indirect, incidental, or consequential damages arising from the use of this platform.",
    },
    {
      title: "7. Changes to Terms",
      content:
        "These Terms & Conditions may be updated periodically. Continued use of the platform after changes constitutes acceptance of the revised terms.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Terms & Conditions
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

export default Terms;