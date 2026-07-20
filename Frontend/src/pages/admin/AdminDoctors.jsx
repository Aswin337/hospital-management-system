import { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialDoctors = [
  { id: 1, name: "Dr. Arun Kumar", specialty: "Cardiologist", experience: "12 years experience" },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Neurologist", experience: "9 years experience" },
  { id: 3, name: "Dr. Karthik Raja", specialty: "Orthopedic Surgeon", experience: "15 years experience" },
  { id: 4, name: "Dr. Meena Iyer", specialty: "Pediatrician", experience: "8 years experience" },
];

const emptyForm = { name: "", specialty: "", experience: "" };

function AdminDoctors() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (doctor) => {
    setEditingId(doctor.id);
    setForm({ name: doctor.name, specialty: doctor.specialty, experience: doctor.experience });
    setDialogOpen(true);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.specialty.trim()) return;

    // Wiring point for the real backend later:
    // editingId ? PUT /api/doctors/:id : POST /api/doctors
    if (editingId) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingId ? { ...d, ...form } : d))
      );
    } else {
      setDoctors((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    // Wiring point: DELETE /api/doctors/:id
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

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
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.specialty}</TableCell>
                <TableCell>{doc.experience}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openEditDialog(doc)} size="small">
                    <EditIcon fontSize="small" sx={{ color: "#2B6CB0" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doc.id)} size="small">
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
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: "#0A3FA3", textTransform: "none", boxShadow: "none" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDoctors;