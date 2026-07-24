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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useData } from "../../context/DataContext";
import {
  cardSx,
  pageHeaderSx,
  primaryButtonSx,
  searchBoxSx,
  tableContainerSx,
  tableHeadSx,
  dialogPaperSx,
  adminColors,
} from "../../styles/adminStyles";

const emptyForm = { name: "", headDoctor: "", description: "" };

const AdminDepartments = () => {
  const { departments, loading, refreshDepartments } = useData();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return departments;
    return departments.filter(
      (d) => d.name?.toLowerCase().includes(q) || d.headDoctor?.toLowerCase().includes(q)
    );
  }, [departments, search]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (dep) => {
    setEditingId(dep._id);
    setForm({ name: dep.name, headDoctor: dep.headDoctor, description: dep.description || "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/api/departments/${editingId}`, form);
      } else {
        await axios.post("/api/departments", form);
      }
      await refreshDepartments();
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
      await axios.delete(`/api/departments/${deleteTarget._id}`);
      await refreshDepartments();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <Box>
      <Box sx={pageHeaderSx}>
        <Typography variant="h5" fontWeight={700} color={adminColors.textPrimary}>
          Departments
        </Typography>
        <Button startIcon={<AddIcon />} sx={primaryButtonSx} onClick={openAdd}>
          Add Department
        </Button>
      </Box>

      <Box sx={{ ...cardSx, p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search department or head doctor"
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
              <TableCell>Department</TableCell>
              <TableCell>Head Doctor</TableCell>
              <TableCell>Doctors</TableCell>
              <TableCell>Patients</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading.departments ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Stack alignItems="center" spacing={1}>
                    <LocalHospitalIcon sx={{ fontSize: 40, color: adminColors.textSecondary }} />
                    <Typography color={adminColors.textSecondary}>No departments found</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((d) => (
                <TableRow key={d._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{d.name}</TableCell>
                  <TableCell>{d.headDoctor || "—"}</TableCell>
                  <TableCell>{d.doctorCount ?? 0}</TableCell>
                  <TableCell>{d.patientCount ?? 0}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(d)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteTarget(d)}>
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
        <DialogTitle fontWeight={700}>{editingId ? "Edit Department" : "Add Department"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Department Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Head Doctor"
              fullWidth
              value={form.headDoctor}
              onChange={(e) => setForm({ ...form, headDoctor: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
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
        <DialogTitle fontWeight={700}>Delete Department</DialogTitle>
        <DialogContent>
          <Typography>
            Delete <b>{deleteTarget?.name}</b>? This cannot be undone.
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

export default AdminDepartments;