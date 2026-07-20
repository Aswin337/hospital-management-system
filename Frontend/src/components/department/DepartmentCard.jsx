import { Card, CardContent, Typography, Button } from "@mui/material";

function DepartmentCard({
  icon,
  title,
  description,
  link,
}) {
  return (
    <Card
      elevation={4}
      sx={{
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardContent>

        <div
          style={{
            fontSize: "50px",
            marginBottom: "20px",
          }}
        >
          {icon}
        </div>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {description}
        </Typography>

        <Button
          href={link}
          variant="text"
        >
          Learn More →
        </Button>

      </CardContent>
    </Card>
  );
}

export default DepartmentCard;