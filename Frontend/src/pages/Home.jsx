import Layout from "../components/layout/Layout";

import HeroSection from "../components/home/HeroSection";
import DoctorSearch from "../components/home/DoctorSearch";
import HospitalStatistics from "../components/home/HospitalStatistics";
import AboutSection from "../components/home/AboutSection";
import DepartmentSection from "../components/home/DepartmentSection";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedDoctors from "../components/home/FeaturedDoctors";
import WhyChooseUs from "../components/home/WhyChooseUs";
import AppointmentCTA from "../components/home/AppointmentCTA";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <Layout>
      <HeroSection />

      <DoctorSearch />

      <HospitalStatistics />

      <AboutSection />

      <DepartmentSection />

      <ServicesSection />

      <FeaturedDoctors />

      <WhyChooseUs />

      <AppointmentCTA />

      <Testimonials />

      <Newsletter />
    </Layout>
  );
}

export default Home;