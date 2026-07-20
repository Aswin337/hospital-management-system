import { Typography } from "@mui/material";

import DoctorCard from "../doctor/DoctorCard";

import doctor1 from "../../assets/images/doc1.jpg";
import doctor2 from "../../assets/images/doc2.jpg";
import doctor3 from "../../assets/images/doc3.jpg";

const doctors = [
  {
    name: "Dr. Anand Krishnan",
    specialization: "Senior Cardiologist",
    experience: "18 Years Experience",
    image: doctor1,
  },
  {
    name: "Dr. Subha Lakshmi",
    specialization: "Chief Neurosurgeon",
    experience: "15 Years Experience",
    image: doctor2,
  },
  {
    name: "Dr. Praveen Kumar",
    specialization: "Pediatric Specialist",
    experience: "12 Years Experience",
    image: doctor3,
  },
];

function FeaturedDoctors() {
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
          Our Experienced Doctors
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={5}
        >
          Meet our experienced healthcare professionals.
        </Typography>

        <div className="row g-4">

          {doctors.map((doctor, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <DoctorCard
                image={doctor.image}
                name={doctor.name}
                specialization={doctor.specialization}
                experience={doctor.experience}
              />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedDoctors;