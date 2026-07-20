import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        color: "white",
        marginTop: "60px",
      }}
    >
      <Container className="py-5">

        <Row>

          <Col lg={5}>
            <h4>AK Hospital</h4>

            <p>
              Modern healthcare management
              system providing secure,
              fast and patient-friendly
              medical services.
            </p>
          </Col>

          <Col lg={3}>
            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/services">Services</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

            </ul>

          </Col>

          <Col lg={4}>

            <h5>Contact</h5>

            <p>
              Velachery Bypass Road,
              Chennai.
            </p>

            <p>
              +91 44 2345 6789
            </p>

            <p>
              care@akhospital.com
            </p>

          </Col>

        </Row>

        <hr />

        <div className="text-center">
          © 2026 AK Hospital Management System
        </div>

      </Container>
    </footer>
  );
}

export default Footer;