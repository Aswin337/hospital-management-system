import { Box, Typography, Card, Avatar, Chip, Divider, Stack } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";

const stats = [
  { label: "Total Doctors", value: 4, icon: LocalHospitalIcon, color: "#2B6CB0", bg: "#E3F2FD" },
  { label: "Pending Appointments", value: 7, icon: CalendarMonthIcon, color: "#C0392B", bg: "#FDECEC" },
  { label: "Departments", value: 6, icon: CategoryIcon, color: "#2F9E67", bg: "#E8F5E9" },
  { label: "Unread Messages", value: 3, icon: MailIcon, color: "#B7791F", bg: "#FFF3E0" },
];

const todaysAppointments = [
  { name: "Hari", time: "10:00 AM" },
  { name: "Priya", time: "11:30 AM" },
];

const recentPatients = ["Hari", "Priya", "Karthik"];

const recentActivities = [
  { label: "Doctor Added", icon: LocalHospitalIcon, color: "#2B6CB0" },
  { label: "Patient Registered", icon: PersonAddAltIcon, color: "#2F9E67" },
  { label: "Appointment Approved", icon: CheckCircleIcon, color: "#C0392B" },
];

function getInitials(name) {
  return name.trim().charAt(0).toUpperCase();
}

// Reusable panel wrapper — colored top accent bar + tinted header icon
// makes each section visually distinct instead of three identical white blocks
function SectionCard({ title, icon: HeaderIcon, accentColor, accentBg, children }) {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.07)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Accent strip */}
      <Box sx={{ height: 4, backgroundColor: accentColor }} />

      <Box sx={{ p: 3, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: accentBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HeaderIcon sx={{ fontSize: 20, color: accentColor }} />
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: "#16241F", fontSize: 17 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Card>
  );
}

function AdminDashboard() {
  return (
    <Box sx={{ backgroundColor: "#F4F6F9", minHeight: "100%", p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F", mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Overview of hospital activity.
      </Typography>

      {/* Stat cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              sx={{
                p: 3,
                borderRadius: "20px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.07)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  backgroundColor: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Icon sx={{ fontSize: 24, color: stat.color }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F" }}>
                {stat.value}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                {stat.label}
              </Typography>
            </Card>
          );
        })}
      </Box>

      {/* Appointments / Patients / Activities */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Today's Appointments */}
        <SectionCard
          title="Today's Appointments"
          icon={EventNoteIcon}
          accentColor="#2B6CB0"
          accentBg="#E3F2FD"
        >
          <Stack spacing={2}>
            {todaysAppointments.map((appt, idx) => (
              <Box key={appt.name}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#E3F2FD", color: "#2B6CB0", fontWeight: "bold" }}>
                      {getInitials(appt.name)}
                    </Avatar>
                    <Typography fontWeight={600} sx={{ color: "#16241F" }}>
                      {appt.name}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                    label={appt.time}
                    size="small"
                    sx={{
                      backgroundColor: "#F1F5F9",
                      color: "#334155",
                      fontWeight: 500,
                    }}
                  />
                </Box>
                {idx < todaysAppointments.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
              </Box>
            ))}
          </Stack>
        </SectionCard>

        {/* Recent Patients */}
        <SectionCard
          title="Recent Patients"
          icon={GroupIcon}
          accentColor="#2F9E67"
          accentBg="#E8F5E9"
        >
          <Stack spacing={2}>
            {recentPatients.map((name, idx) => (
              <Box key={name}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: "#E8F5E9", color: "#2F9E67", fontWeight: "bold" }}>
                    {getInitials(name)}
                  </Avatar>
                  <Typography fontWeight={600} sx={{ color: "#16241F" }}>
                    {name}
                  </Typography>
                </Box>
                {idx < recentPatients.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
              </Box>
            ))}
          </Stack>
        </SectionCard>

        {/* Recent Activities */}
        <SectionCard
          title="Recent Activities"
          icon={HistoryIcon}
          accentColor="#B7791F"
          accentBg="#FFF3E0"
        >
          <Stack spacing={2}>
            {recentActivities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <Box key={activity.label}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${activity.color}1A`,
                      }}
                    >
                      <Icon sx={{ fontSize: 18, color: activity.color }} />
                    </Box>
                    <Typography sx={{ color: "#16241F" }}>{activity.label}</Typography>
                  </Box>
                  {idx < recentActivities.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
                </Box>
              );
            })}
          </Stack>
        </SectionCard>
      </Box>
    </Box>
  );
}

export default AdminDashboard;