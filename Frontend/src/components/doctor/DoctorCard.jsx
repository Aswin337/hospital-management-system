import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@mui/material";

function DoctorCard({
  image,
  name,
  specialization,
  experience,
}) {
  return (
    <Card
      elevation={4}
      sx={{
        height: "100%",
        textAlign: "center",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          margin: "25px auto 10px",
        }}
      />

      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {name}
        </Typography>

        <Typography
          color="text.secondary"
          mb={2}
        >
          {specialization}
        </Typography>

        <Chip
          label={experience}
          color="primary"
          sx={{ mb: 2 }}
        />

        <br />

        <Button
          variant="outlined"
          fullWidth
        >
          Book Appointment
        </Button>

      </CardContent>
    </Card>
  );
}

export default DoctorCard;