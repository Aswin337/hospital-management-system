import { Card, CardContent, Typography } from "@mui/material";

function ServiceCard({ icon, title, description }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>

        <div
          style={{
            fontSize: "45px",
            marginBottom: "15px",
          }}
        >
          {icon}
        </div>

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography color="text.secondary">
          {description}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default ServiceCard;