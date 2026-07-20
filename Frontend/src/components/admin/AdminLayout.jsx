import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Doctors",
    path: "/admin/doctors",
    icon: LocalHospitalIcon,
  },
  {
    label: "Appointments",
    path: "/admin/appointments",
    icon: CalendarMonthIcon,
  },
  {
    label: "Departments",
    path: "/admin/departments",
    icon: CategoryIcon,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MailIcon,
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove logged in user
    localStorage.removeItem("user");

    // Redirect to common login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F7F9FC",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          minWidth: 240,
          backgroundColor: "#0A3FA3",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            px: 3,
            mb: 4,
          }}
        >
          Hospital Admin
        </Typography>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Box
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                py: 1.5,
                textDecoration: "none",
                color: "#fff",
                transition: "0.2s",
                backgroundColor: active
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                borderLeft: active
                  ? "4px solid #fff"
                  : "4px solid transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.10)",
                },
              }}
            >
              <Icon fontSize="small" />

              <Typography fontSize={15} fontWeight={500}>
                {item.label}
              </Typography>
            </Box>
          );
        })}

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            mx: 2,
            mb: 2,
            color: "#fff",
            justifyContent: "flex-start",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.10)",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;