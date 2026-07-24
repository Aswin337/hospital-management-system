import { useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import StarIcon from "@mui/icons-material/Star";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import EmailIcon from "@mui/icons-material/Email";
import { useData } from "../../context/DataContext";
import {
  cardSx,
  pageHeaderSx,
  searchBoxSx,
  adminColors,
  primaryButtonSx,
} from "../../styles/adminStyles";

const FOLDERS = [
  { key: "inbox", label: "Inbox", icon: <InboxIcon fontSize="small" /> },
  { key: "unread", label: "Unread", icon: <MarkEmailUnreadIcon fontSize="small" /> },
  { key: "important", label: "Important", icon: <StarIcon fontSize="small" /> },
  { key: "archived", label: "Archived", icon: <ArchiveIcon fontSize="small" /> },
];

const AdminMessages = () => {
  const { messages, loading, refreshMessages } = useData();
  const [folder, setFolder] = useState("inbox");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = messages;
    if (folder === "unread") list = list.filter((m) => m.status === "Unread");
    else list = list.filter((m) => m.folder === folder);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.patientName?.toLowerCase().includes(q) ||
          m.subject?.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [messages, folder, search]);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (msg.status === "Unread") {
      try {
        await axios.put(`/api/messages/${msg._id}`, { status: "Read" });
        await refreshMessages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const moveToFolder = async (msg, targetFolder) => {
    try {
      await axios.put(`/api/messages/${msg._id}`, { folder: targetFolder });
      await refreshMessages();
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (msg) => {
    try {
      await axios.delete(`/api/messages/${msg._id}`);
      await refreshMessages();
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={pageHeaderSx}>
        <Typography variant="h5" fontWeight={700} color={adminColors.textPrimary}>
          Messages
        </Typography>
      </Box>

      <Box sx={{ ...cardSx, p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search messages"
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

      <Grid container spacing={2} sx={{ minHeight: 480 }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Box sx={{ ...cardSx, p: 1 }}>
            <List dense>
              {FOLDERS.map((f) => (
                <ListItemButton
                  key={f.key}
                  selected={folder === f.key}
                  onClick={() => {
                    setFolder(f.key);
                    setSelected(null);
                  }}
                  sx={{
                    borderRadius: "10px",
                    mb: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: adminColors.primaryLight,
                      color: adminColors.primary,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>{f.icon}</ListItemIcon>
                  <ListItemText primary={f.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: selected ? 4 : 9 }}>
          <Box sx={{ ...cardSx, overflow: "hidden" }}>
            {loading.messages ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} />
              </Box>
            ) : filtered.length === 0 ? (
              <Stack alignItems="center" spacing={1} sx={{ py: 6 }}>
                <EmailIcon sx={{ fontSize: 40, color: adminColors.textSecondary }} />
                <Typography color={adminColors.textSecondary}>No messages here</Typography>
              </Stack>
            ) : (
              <List disablePadding>
                {filtered.map((m, i) => (
                  <Box key={m._id}>
                    <ListItemButton
                      selected={selected?._id === m._id}
                      onClick={() => openMessage(m)}
                      sx={{ py: 1.5, px: 2 }}
                    >
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography
                              fontWeight={m.status === "Unread" ? 700 : 500}
                              noWrap
                              sx={{ maxWidth: 160 }}
                            >
                              {m.patientName}
                            </Typography>
                            <Typography variant="caption" color={adminColors.textSecondary}>
                              {new Date(m.createdAt).toLocaleDateString()}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color={adminColors.textSecondary}
                            noWrap
                            fontWeight={m.status === "Unread" ? 600 : 400}
                          >
                            {m.subject}
                          </Typography>
                        }
                      />
                      {m.status === "Unread" && (
                        <Chip label="Unread" size="small" color="warning" sx={{ ml: 1, borderRadius: "8px" }} />
                      )}
                    </ListItemButton>
                    {i < filtered.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            )}
          </Box>
        </Grid>

        {selected && (
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box sx={{ ...cardSx, p: 3, height: "100%" }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {selected.subject}
              </Typography>
              <Stack spacing={0.5} sx={{ mb: 2 }}>
                <Typography variant="body2" color={adminColors.textSecondary}>
                  From: <b>{selected.patientName}</b>
                </Typography>
                <Typography variant="body2" color={adminColors.textSecondary}>
                  Email: {selected.email}
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Typography sx={{ whiteSpace: "pre-wrap", mb: 3 }}>{selected.message}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button startIcon={<ReplyIcon />} sx={primaryButtonSx}>
                  Reply
                </Button>
                {selected.folder !== "important" && (
                  <Button startIcon={<StarIcon />} onClick={() => moveToFolder(selected, "important")}>
                    Mark Important
                  </Button>
                )}
                {selected.folder !== "archived" && (
                  <Button startIcon={<ArchiveIcon />} onClick={() => moveToFolder(selected, "archived")}>
                    Archive
                  </Button>
                )}
                <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(selected)}>
                  Delete
                </Button>
              </Stack>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AdminMessages;