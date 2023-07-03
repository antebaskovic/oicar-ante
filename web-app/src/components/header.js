import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const handleLogaut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">FitnessApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/profile">Profil</Nav.Link>
            <Nav.Link href="/clients">Klijenti</Nav.Link>
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item href="programs">Svi programi</NavDropdown.Item>
              <NavDropdown.Item href="week">Tjedni pregled</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/meals">Obroci</Nav.Link>
            <Nav.Link href="/trainings">Treninzi</Nav.Link>
          </Nav>  

          <Button variant="danger" onClick={handleLogaut}>
            Odjavi se
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
