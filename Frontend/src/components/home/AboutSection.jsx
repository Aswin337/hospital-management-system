import {
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import { Visibility, RocketLaunch } from "@mui/icons-material";

import { Link } from "react-router-dom";

import careImage from "../../assets/images/care.jpg";

function AboutSection() {
  return (
    <section className="py-5 bg-white">

      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-7">

            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              Leading the Way in Medical Excellence
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              AK Hospital provides world-class healthcare,
              advanced diagnostics, experienced doctors,
              and secure digital medical records for patients.
            </Typography>

            <div className="row">

              <div className="col-md-6 mb-3">

                <Card
                  elevation={3}
                  sx={{
                    borderLeft: "5px solid #1976d2",
                  }}
                >
                  <CardContent>

                    <Visibility
                      color="primary"
                      sx={{ mb: 1 }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Our Vision
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      To build a technology-driven
                      healthcare ecosystem that
                      provides quality treatment
                      for everyone.
                    </Typography>

                  </CardContent>
                </Card>

              </div>

              <div className="col-md-6 mb-3">

                <Card
                  elevation={3}
                  sx={{
                    borderLeft: "5px solid green",
                  }}
                >
                  <CardContent>

                    <RocketLaunch
                      color="success"
                      sx={{ mb: 1 }}
                    />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Our Mission
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Deliver patient-centered
                      healthcare using innovation,
                      compassion and modern
                      medical technology.
                    </Typography>

                  </CardContent>
                </Card>

              </div>

            </div>

            <Button
              component={Link}
              to="/about"
              variant="outlined"
              size="large"
              sx={{ mt: 3 }}
            >
              Read Our Story
            </Button>

          </div>

          {/* Right Side */}

          <div className="col-lg-5 text-center">

            <img
              src={careImage}
              alt="Patient Care"
              className="img-fluid rounded shadow"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;