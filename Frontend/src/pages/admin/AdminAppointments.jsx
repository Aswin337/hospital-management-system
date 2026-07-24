import { useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useData } from "../../context/DataContext";
import {
  cardSx,
  pageHeaderSx,
  primaryButtonSx,
  searchBoxSx,
  tableContainerSx,
  tableHeadSx,
  statCardSx,
  statusColors,
  dialogPaperSx,
  adminColors,
} from "../../styles/adminStyles";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

const emptyForm = {
  patientName: "",
  doctor: "",
  department: "",
  date: "",
  time: "",
  status: "Pending",
};

const AdminAppointments = () => {
  const { appointments, doctors, departments, loading, refreshAppointments } = useData();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter(
      (a) =>
        a.patientName?.toLowerCase().includes(q) ||
        a.doctor?.toLowerCase().includes(q) ||
        a.department?.toLowerCase().includes(q)
    );
  }, [appointments, search]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const stats = useMemo(() => {
    const today = appointments.filter((a) => a.date === todayStr);
    return {
      today: today.length,
      completed: today.filter((a) => a.status === "Completed").length,
      pending: appointments.filter((a) => a.status === "Pending").length,
      cancelled: appointments.filter((a) => a.status === "Cancelled").length,
    };
  }, [appointments, todayStr]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (appt) => {
    setEditingId(appt._id);
    setForm({
      patientName: appt.patientName,
      doctor: appt.doctor,
      department: appt.department,
      date: appt.date,
      time: appt.time,
      status: appt.status,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/api/appointments/${editingId}`, form);
      } else {
        await axios.post("/api/appointments", form);
      }
      await refreshAppointments();
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`/api/appointments/${deleteTarget._id}`);
      await refreshAppointments();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const statCards = [
    { label: "Today's Appointments", value: stats.today, color: adminColors.primary },
    { label: "Today's Completed", value: stats.completed, color: adminColors.success },
    { label: "Pending", value: stats.pending, color: adminColors.warning },
    { label: "Cancelled", value: stats.cancelled, color: adminColors.error },
  ];

  return (
    <Box>
      <Box sx={pageHeaderSx}>
        <Typography variant="h5" fontWeight={700} color={adminColors.textPrimary}>
          Appointments
        </Typography>
        <Button startIcon={<AddIcon />} sx={primaryButtonSx} onClick={openAdd}>
          New Appointment
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((s) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.label}>
            <Box sx={statCardSx}>
              <Typography variant="body2" color={adminColors.textSecondary}>
                {s.label}
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ color: s.color, mt: 0.5 }}>
                {s.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ ...cardSx, p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search appointment by patient, doctor or department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={searchBoxSx}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1, color: adminColors.textSecondary }} />,
            },
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={tableContainerSx}>
        <Table>
          <TableHead sx={tableHeadSx}>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading.appointments ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Stack alignItems="center" spacing={1}>
                    <EventBusyIcon sx={{ fontSize: 40, color: adminColors.textSecondary }} />
                    <Typography color={adminColors.textSecondary}>No appointments found</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((a) => (
                <TableRow key={a._id} hover>
                  <TableCell>{a.patientName}</TableCell>
                  <TableCell>{a.doctor}</TableCell>
                  <TableCell>{a.department}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell>
                    <Chip
                      label={a.status}
                      color={statusColors[a.status] || "default"}
                      size="small"
                      sx={{ fontWeight: 600, borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(a)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteTarget(a)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} slotProps={{ paper: { sx: dialogPaperSx } }}>
        <DialogTitle fontWeight={700}>{editingId ? "Edit Appointment" : "New Appointment"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Patient Name"
              fullWidth
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            />
            <TextField
              select
              label="Doctor"
              fullWidth
              value={form.doctor}
              onChange={(e) => {
                const doc = doctors.find((d) => d.name === e.target.value);
                setForm({
                  ...form,
                  doctor: e.target.value,
                  department: doc?.department || form.department,
                });
              }}
            >
              {doctors.map((d) => (
                <MenuItem key={d._id} value={d.name}>
                  {d.name} ({d.specialty})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Department"
              fullWidth
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            >
              {departments.map((dep) => (
                <MenuItem key={dep._id} value={dep.name}>
                  {dep.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <TextField
              label="Time"
              placeholder="10:00 AM"
              fullWidth
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <TextField
              select
              label="Status"
              fullWidth
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={primaryButtonSx} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} slotProps={{ paper: { sx: dialogPaperSx } }}>
        <DialogTitle fontWeight={700}>Delete Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Delete the appointment for <b>{deleteTarget?.patientName}</b>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAppointments;