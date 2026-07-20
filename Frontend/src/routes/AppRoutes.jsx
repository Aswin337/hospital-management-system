import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import About from "../pages/About";
import Departments from "../pages/Departments";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import Services from "../pages/Services";
import Appointment from "../pages/Appointment";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";

// Admin
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />

          {/* Add these later */}
          {/* <Route path="appointments" element={<AdminAppointments />} /> */}
          {/* <Route path="departments" element={<AdminDepartments />} /> */}
          {/* <Route path="messages" element={<AdminMessages />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;