import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const emptyForm = { name: "", specialty: "", experience: "" };

function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchDoctors = async () => {
  try {
    const res = await axios.get("/api/doctors");
    setDoctors(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Failed to fetch doctors:", err);
    setDoctors([]);
    setSnackbar({ open: true, message: "Failed to load doctors", severity: "error" });
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (doctor) => {
    setEditingId(doctor._id);
    setForm({ name: doctor.name, specialty: doctor.specialty, experience: doctor.experience });
    setDialogOpen(true);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.specialty.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        const res = await axios.put(`/api/doctors/${editingId}`, form);
        setDoctors((prev) => prev.map((d) => (d._id === editingId ? res.data : d)));
        setSnackbar({ open: true, message: "Doctor updated", severity: "success" });
      } else {
        const res = await axios.post("/api/doctors", form);
        setDoctors((prev) => [res.data, ...prev]);
        setSnackbar({ open: true, message: "Doctor added", severity: "success" });
      }
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to save doctor:", err);
      setSnackbar({ open: true, message: "Failed to save doctor", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      setSnackbar({ open: true, message: "Doctor removed", severity: "success" });
    } catch (err) {
      console.error("Failed to delete doctor:", err);
      setSnackbar({ open: true, message: "Failed to delete doctor", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#16241F" }}>
            Doctors
          </Typography>
          <Typography color="text.secondary">Manage doctor profiles shown on the public site.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          sx={{
            backgroundColor: "#0A3FA3",
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            fontWeight: "bold",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#0A3FA3", filter: "brightness(0.9)" },
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <Box sx={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F7F9FC" }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Specialty</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doc) => (
              <TableRow key={doc._id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.specialty}</TableCell>
                <TableCell>{doc.experience}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openEditDialog(doc)} size="small">
                    <EditIcon fontSize="small" sx={{ color: "#2B6CB0" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doc._id)} size="small">
                    <DeleteIcon fontSize="small" sx={{ color: "#C0392B" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {doctors.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No doctors added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{editingId ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
          <TextField name="specialty" label="Specialty" value={form.specialty} onChange={handleChange} fullWidth />
          <TextField name="experience" label="Experience" value={form.experience} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: "none" }} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            sx={{ backgroundColor: "#0A3FA3", textTransform: "none", boxShadow: "none" }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
 
export default AdminDoctors;