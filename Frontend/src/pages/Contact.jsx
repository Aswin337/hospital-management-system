import React, { useState } from "react";
import api from "../utils/api";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../assets/icons/hospital-logo.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("/api/messages", {
        patientName: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: "Unread",
        folder: "inbox",
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1565D8,#0A3FA3)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={8}
          sx={{ p: 4, borderRadius: 4, boxShadow: "0 12px 40px rgba(0,0,0,.25)" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img src={logo} alt="Hospital Logo" style={{ height: 70 }} />
          </Box>

          <Typography variant="h4" align="center" fontWeight="bold" sx={{ color: "#0A3FA3" }}>
            Contact Us
          </Typography>

          <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
            We'd love to hear from you. Send us your questions or feedback.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, bgcolor: "#F5F9FF", borderRadius: 3, height: "100%" }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Contact Information
                </Typography>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                  <Typography>123 Hospital Road, Madurai, Tamil Nadu</Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Typography>+91 98765 43210</Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Typography>contact@hospital.com</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                {submitted && (
                  <Typography sx={{ bgcolor:"#E8F5E9",color:"#2E7D32",p:2,borderRadius:2,mb:2,fontWeight:600 }}>
                    Your message has been sent successfully.
                  </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField fullWidth margin="normal" label="Full Name" name="name"
                    value={formData.name} onChange={handleChange}
                    error={!!errors.name} helperText={errors.name}
                    sx={{"& .MuiOutlinedInput-root":{borderRadius:2}}}
                  />

                  <TextField fullWidth margin="normal" label="Email Address" name="email"
                    value={formData.email} onChange={handleChange}
                    error={!!errors.email} helperText={errors.email}
                    sx={{"& .MuiOutlinedInput-root":{borderRadius:2}}}
                  />

                  <TextField fullWidth margin="normal" label="Subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    error={!!errors.subject} helperText={errors.subject}
                    sx={{"& .MuiOutlinedInput-root":{borderRadius:2}}}
                  />

                  <TextField fullWidth multiline rows={5} margin="normal"
                    label="Message" name="message"
                    value={formData.message} onChange={handleChange}
                    error={!!errors.message} helperText={errors.message}
                    sx={{"& .MuiOutlinedInput-root":{borderRadius:2}}}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt:3,
                      py:1.5,
                      fontWeight:"bold",
                      background:"linear-gradient(135deg,#1565D8,#0A3FA3)",
                      "&:hover":{
                        background:"linear-gradient(135deg,#0A3FA3,#082E7A)"
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Contact;