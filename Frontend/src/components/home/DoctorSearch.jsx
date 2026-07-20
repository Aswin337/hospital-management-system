import {
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";

function DoctorSearch() {
  return (
    <div
      className="container"
      style={{
        marginTop: "-50px",
        position: "relative",
        zIndex: 100,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          mb={4}
        >
          Find a Dedicated Medical Specialist
        </Typography>

        <div className="row g-3">

          <div className="col-lg-5">
            <TextField
              fullWidth
              label="Doctor Name"
            />
          </div>

          <div className="col-lg-4">
            <TextField
              select
              fullWidth
              label="Department"
            >
              <MenuItem value="">
                Select Department
              </MenuItem>

              <MenuItem value="cardiology">
                Cardiology
              </MenuItem>

              <MenuItem value="neurology">
                Neurology
              </MenuItem>

              <MenuItem value="orthopedics">
                Orthopedics
              </MenuItem>

              <MenuItem value="pediatrics">
                Pediatrics
              </MenuItem>

            </TextField>
          </div>

          <div className="col-lg-3 d-grid">
            <Button
              variant="contained"
              size="large"
            >
              Search
            </Button>
          </div>

        </div>
      </Paper>
    </div>
  );
}

export default DoctorSearch;