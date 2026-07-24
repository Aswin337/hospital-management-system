import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, Avatar, Chip, Divider, Stack, CircularProgress } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const statMeta = [
  { key: "doctors", label: "Doctors", icon: LocalHospitalIcon, color: "#2B6CB0", bg: "#E3F2FD" },
  { key: "patients", label: "Patients", icon: GroupIcon, color: "#2F9E67", bg: "#E8F5E9" },
  { key: "appointments", label: "Appointments", icon: CalendarMonthIcon, color: "#C0392B", bg: "#FDECEC" },
  { key: "departments", label: "Departments", icon: CategoryIcon, color: "#B7791F", bg: "#FFF3E0" },
];

function getInitials(name) {
  return name?.trim().charAt(0).toUpperCase() || "?";
}

function statusColor(status) {
  return status === "Confirmed"
    ? { color: "#2F9E67", bg: "#E8F5E9" }
    : { color: "#B7791F", bg: "#FFF3E0" };
}

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

function AppointmentChart({ data }) {
  if (!data || data.length === 0) {
    return <Typography color="text.secondary">No appointment data yet.</Typography>;
  }
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, height: 180, px: 1 }}>
      {data.map((d, i) => (
        <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#16241F", mb: 0.5 }}>{d.value}</Typography>
          <Box
            sx={{
              width: "60%",
              height: `${(d.value / max) * 100}%`,
              minHeight: 6,
              borderRadius: "8px 8px 0 0",
              background: "linear-gradient(180deg, #2B6CB0 0%, #6FA8DC 100%)",
              transition: "height 0.3s ease",
            }}
          />
          <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 1 }}>{d.day}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/dashboard/summary");
      setData(res.data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // Auto-refresh every 15s so the dashboard stays live even without
    // navigating away and back. Swap for Socket.io later if you want
    // instant push updates instead of polling.
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  const stats = data?.stats || { doctors: 0, patients: 0, appointments: 0, departments: 0 };
  const chartData = data?.chartData || [];
  const todaysAppointments = data?.todaysAppointments || [];
  const recentPatients = data?.recentPatients || [];
  const recentActivities = data?.recentActivities || [];

  return (
    <Box sx={{ backgroundColor: "#F4F6F9", minHeight: "100%", p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, gap: 1, mb: 1 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F" }}>Hospital Dashboard</Typography>
        <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>{today}</Typography>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 4 }}>Welcome Admin 👋</Typography>

      {/* Stat cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }, gap: 3, mb: 3 }}>
        {statMeta.map((meta) => {
          const Icon = meta.icon;
          return (
            <Card key={meta.key} sx={{ p: 3, borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 6px 18px rgba(15, 23, 42, 0.07)", transition: "transform 0.15s ease, box-shadow 0.15s ease", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)" } }}>
              <Box sx={{ width: 48, height: 48, borderRadius: "14px", backgroundColor: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Icon sx={{ fontSize: 24, color: meta.color }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F" }}>{stats[meta.key]}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>{meta.label}</Typography>
            </Card>
          );
        })}
      </Box>

      {/* Appointment Chart */}
      <Card sx={{ borderRadius: "20px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 6px 18px rgba(15, 23, 42, 0.07)", p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: "10px", backgroundColor: "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MedicalInformationIcon sx={{ fontSize: 20, color: "#2B6CB0" }} />
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: "#16241F", fontSize: 17 }}>Appointment Chart</Typography>
        </Box>
        <AppointmentChart data={chartData} />
      </Card>

      {/* Appointments / Patients / Activities */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
        <SectionCard title="Today's Appointments" icon={EventNoteIcon} accentColor="#2B6CB0" accentBg="#E3F2FD">
          <Stack spacing={2}>
            {todaysAppointments.length === 0 && <Typography color="text.secondary">No appointments today.</Typography>}
            {todaysAppointments.map((appt, idx) => {
              const sc = statusColor(appt.status);
              return (
                <Box key={idx}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: "#E3F2FD", color: "#2B6CB0", fontWeight: "bold" }}>{getInitials(appt.name)}</Avatar>
                      <Box>
                        <Typography fontWeight={600} sx={{ color: "#16241F" }}>{appt.name}</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{appt.time}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Chip label={appt.status} size="small" sx={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600 }} />
                  </Box>
                  {idx < todaysAppointments.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
                </Box>
              );
            })}
          </Stack>
        </SectionCard>

        <SectionCard title="Recent Patients" icon={GroupIcon} accentColor="#2F9E67" accentBg="#E8F5E9">
          <Stack spacing={2}>
            {recentPatients.length === 0 && <Typography color="text.secondary">No patients yet.</Typography>}
            {recentPatients.map((patient, idx) => (
              <Box key={idx}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: "#E8F5E9", color: "#2F9E67", fontWeight: "bold" }}>{getInitials(patient.name)}</Avatar>
                  <Box>
                    <Typography fontWeight={600} sx={{ color: "#16241F" }}>{patient.name}</Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{patient.note}</Typography>
                  </Box>
                </Box>
                {idx < recentPatients.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
              </Box>
            ))}
          </Stack>
        </SectionCard>

        <SectionCard title="Recent Activities" icon={HistoryIcon} accentColor="#B7791F" accentBg="#FFF3E0">
          <Stack spacing={2}>
            {recentActivities.length === 0 && <Typography color="text.secondary">No recent activity.</Typography>}
            {recentActivities.map((activity, idx) => (
              <Box key={idx}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#B7791F1A" }}>
                    <HistoryIcon sx={{ fontSize: 18, color: "#B7791F" }} />
                  </Box>
                  <Typography sx={{ color: "#16241F" }}>{activity.label}</Typography>
                </Box>
                {idx < recentActivities.length - 1 && <Divider sx={{ mt: 2, borderColor: "#EEF2F6" }} />}
              </Box>
            ))}
          </Stack>
        </SectionCard>
      </Box>
    </Box>
  );
}

export default AdminDashboard;