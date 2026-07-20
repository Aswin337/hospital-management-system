import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  {
    title: "Experienced Staff",
    description:
      "Our doctors, nurses and medical professionals have years of experience providing quality healthcare.",
  },
  {
    title: "Modern Equipment",
    description:
      "State-of-the-art diagnostic and treatment equipment for accurate and efficient healthcare.",
  },
  {
    title: "Cashless Insurance",
    description:
      "We support cashless treatment through leading insurance providers for hassle-free healthcare.",
  },
];

function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#ffffff",
      }}
    >
      <div className="container">

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Why Choose AK Hospital?
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Trusted healthcare with modern facilities and compassionate care.
        </Typography>

        <div className="row g-4">

          {features.map((feature, index) => (

            <div
              className="col-lg-4"
              key={index}
            >

              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >

                <CardContent>

                  <CheckCircleIcon
                    color="success"
                    sx={{
                      fontSize: 50,
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {feature.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {feature.description}
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

export default WhyChooseUs;