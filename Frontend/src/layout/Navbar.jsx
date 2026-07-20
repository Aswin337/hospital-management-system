import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HMS
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit">
          About
        </Button>

        <Button color="inherit">
          Doctors
        </Button>

        <Button color="inherit">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;