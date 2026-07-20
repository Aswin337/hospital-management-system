import { useState } from "react";
import { Typography, Paper, TextField, Button, Box, Alert, Container } from "@mui/material";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus("error");
      return;
    }

    // Wiring point for the real subscribe endpoint once it exists:
    // fetch("/api/newsletter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    setStatus("success");
    setEmail("");
  };

  return (
    <Box component="section" sx={{ py: 10, backgroundColor: "#ffffff" }}>
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 800,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Get healthcare tips, hospital updates and special announcements
            directly to your email.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ flex: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ flex: 1, py: 1.9, width: { xs: "100%", sm: "auto" } }}
            >
              Subscribe
            </Button>
          </Box>

          {status === "error" && (
            <Alert severity="error" sx={{ mt: 3, textAlign: "left" }}>
              Please enter a valid email address.
            </Alert>
          )}
          {status === "success" && (
            <Alert severity="success" sx={{ mt: 3, textAlign: "left" }}>
              You're subscribed! Check your inbox for a confirmation.
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Newsletter;