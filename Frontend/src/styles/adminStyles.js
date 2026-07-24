export const adminColors = {
  primary: "#1565C0",
  primaryLight: "#E3F2FD",
  background: "#F5F7FA",
  card: "#FFFFFF",
  textPrimary: "#1A2027",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  success: "#2E7D32",
  warning: "#ED6C02",
  error: "#D32F2F",
  info: "#0288D1",
};

export const cardSx = {
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  border: `1px solid ${adminColors.border}`,
  backgroundColor: adminColors.card,
};

export const pageHeaderSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 2,
  mb: 3,
};

export const primaryButtonSx = {
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  px: 3,
  py: 1,
  backgroundColor: adminColors.primary,
  "&:hover": {
    backgroundColor: "#0D47A1",
  },
};

export const searchBoxSx = {
  borderRadius: "12px",
  backgroundColor: "#F8FAFC",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
};

export const tableContainerSx = {
  ...cardSx,
  overflow: "hidden",
};

export const tableHeadSx = {
  backgroundColor: adminColors.primaryLight,
  "& th": {
    fontWeight: 700,
    color: adminColors.primary,
    fontSize: "0.85rem",
  },
};

export const statCardSx = {
  ...cardSx,
  p: 2.5,
};

export const statusColors = {
  Confirmed: "success",
  Pending: "warning",
  Cancelled: "error",
  Completed: "info",
  Unread: "warning",
  Read: "default",
};

export const dialogPaperSx = {
  borderRadius: "20px",
  minWidth: { xs: "90vw", sm: 420 },
};