import { Navbar as BNav, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <BNav
            bg="dark"
            variant="dark"
            expand="lg"
            className="flex-column vh-100 position-fixed p-3"
            style={{ width: "220px" }}
        >
            <Container className="flex-column align-items-start">
                <BNav.Brand as={Link} to="/" className="mb-4 fs-4 text-light">
                    SisInformes
                </BNav.Brand>
                <BNav.Toggle aria-controls="basic-navbar-nav" />
                <BNav.Collapse id="basic-navbar-nav">
                    <Nav className="flex-column w-100">
                        <Nav.Link as={Link} to="/dashboard" className="text-light">
                        Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/unidades" className="text-light">
                        Unidades Administrativas
                        </Nav.Link>
                        <Nav.Link as={Link} to="/usuarios" className="text-light">
                        Usuários
                        </Nav.Link>
                        <Nav.Link as={Link} to="/categorias" className="text-light">
                        Categorias
                        </Nav.Link>
                        <Nav.Link as={Link} to="/incidentes" className="text-light">
                        Incidentes e Vulnerabilidades
                        </Nav.Link>
                        <Nav.Link as={Link} to="/licoes" className="text-light">
                            Lições
                        </Nav.Link>
                        <Nav.Link as={Link} to="/estatisticas" className="text-light">
                        Estatísticas da ANPD
                        </Nav.Link>
                    </Nav>
                </BNav.Collapse>
            </Container>
        </BNav>
    );
};

export default Navbar;
