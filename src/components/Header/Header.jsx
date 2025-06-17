import "./Header.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function MyNav() {
  return (
    <Navbar bg="warning-subtle" expand="lg" sticky="top" variant="light">
      <Container fluid>
        <Navbar.Brand>
          <img className="navbar-logo spin-logo" src="/images/PetmartLogo.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ProductsPage">Products</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNav;