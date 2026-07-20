import { Container } from "react-bootstrap";
import { LocalHospital, Email } from "@mui/icons-material";

function TopBar() {
  return (
    <div
      style={{
        background: "#0f2043",
        color: "white",
        padding: "8px 0",
        fontSize: "14px",
      }}
    >
      <Container className="d-flex justify-content-between flex-wrap">

        <div>
          <LocalHospital
            sx={{ color: "#ffc107", fontSize: 18 }}
          />

          <span className="ms-2">
            Emergency :
            <a
              href="tel:+914423456789"
              className="text-warning text-decoration-none ms-1"
            >
              +91 44 2345 6789
            </a>
          </span>
        </div>

        <div>
          <Email sx={{ fontSize: 18 }} />

          <span className="ms-2">
            care@akhospital.com
          </span>
        </div>

      </Container>
    </div>
  );
}

export default TopBar;