import React, { useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQ() {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment through our Doctors page by selecting a doctor and clicking 'Book Appointment', or directly via the Appointment page from the navigation menu.",
    },
    {
      question: "Do I need to create an account to book an appointment?",
      answer:
        "Yes, you'll need to sign up and log in first. This helps us keep track of your appointment history and contact you regarding confirmations.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the 'Forgot Password?' link on the Login page. Enter your registered email and follow the instructions to reset your password.",
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer:
        "Currently, please contact us directly through the Contact page to cancel or reschedule. Online cancellation/rescheduling is coming soon.",
    },
    {
      question: "What departments does the hospital offer?",
      answer:
        "We offer Cardiology, Neurology, Ophthalmology, Pediatrics, Orthopedics, and General Medicine. Visit our Departments page for more details.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes. We take data privacy seriously. Please review our Privacy Policy page for full details on how your information is handled.",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Frequently Asked Questions
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 2, mb: 5 }}
        textAlign="center"
        color="text.secondary"
      >
        Find quick answers to common questions about our services.
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default FAQ;