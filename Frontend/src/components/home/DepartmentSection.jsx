import { Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChildCareIcon from "@mui/icons-material/ChildCare";

import DepartmentCard from "../department/DepartmentCard";

function DepartmentSection() {
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
          Our Medical Expertise
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Explore our specialized medical departments.
        </Typography>

        <div className="row g-4">

          <div className="col-lg-4">

            <DepartmentCard
              icon={<FavoriteIcon color="error" fontSize="inherit" />}
              title="Cardiology"
              description="Advanced heart care with experienced cardiologists and modern diagnostic facilities."
              link="/departments"
            />

          </div>

          <div className="col-lg-4">

            <DepartmentCard
              icon={<PsychologyIcon color="primary" fontSize="inherit" />}
              title="Neurology"
              description="Comprehensive brain and nervous system treatments using advanced technology."
              link="/departments"
            />

          </div>

          <div className="col-lg-4">

            <DepartmentCard
              icon={<ChildCareIcon color="success" fontSize="inherit" />}
              title="Pediatrics"
              description="Specialized healthcare services for infants, children and adolescents."
              link="/departments"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default DepartmentSection;