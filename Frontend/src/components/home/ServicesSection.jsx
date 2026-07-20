import { Typography } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import ScienceIcon from "@mui/icons-material/Science";
import EmergencyIcon from "@mui/icons-material/Emergency";

import ServiceCard from "../common/ServiceCard";

function ServicesSection() {
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
          Comprehensive 24/7 Operations
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Healthcare services available around the clock.
        </Typography>

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <ServiceCard
              icon={<EmergencyIcon color="error" fontSize="inherit" />}
              title="Emergency Care"
              description="24/7 emergency services with experienced medical professionals."
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <ServiceCard
              icon={<LocalHospitalIcon color="primary" fontSize="inherit" />}
              title="ICU"
              description="Advanced intensive care facilities with continuous patient monitoring."
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <ServiceCard
              icon={<MedicationIcon color="success" fontSize="inherit" />}
              title="Pharmacy"
              description="Digital prescription management and quality medicines."
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <ServiceCard
              icon={<ScienceIcon color="warning" fontSize="inherit" />}
              title="Laboratory"
              description="Modern laboratory with fast and accurate diagnostic reports."
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default ServicesSection;