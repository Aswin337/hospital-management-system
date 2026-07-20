import {
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const testimonials = [
  {
    name: "Karthik Raja",
    location: "Chennai",
    review:
      "The online appointment system was very easy to use. The doctors were professional and I received my reports on time.",
  },
  {
    name: "Meera Alagappan",
    location: "Madurai",
    review:
      "Excellent pediatric care for my daughter. The staff were friendly, supportive and the hospital was very clean.",
  },
];

function Testimonials() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#f8f9fa",
      }}
    >
      <div className="container">

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          What Our Patients Say
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Trusted by thousands of patients across Tamil Nadu.
        </Typography>

        <div className="row g-4">

          {testimonials.map((patient, index) => (

            <div
              className="col-lg-6"
              key={index}
            >

              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                }}
              >

                <CardContent>

                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  >
                    {patient.name.charAt(0)}
                  </Avatar>

                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: "italic",
                      mb: 3,
                    }}
                  >
                    "{patient.review}"
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {patient.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {patient.location}
                  </Typography>

                </CardContent>

              </Card>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;