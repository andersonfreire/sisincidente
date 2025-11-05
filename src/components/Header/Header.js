import React from "react";
import "./Header.css";
import { Dropdown, Image } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import LogoUfrn from "../../assets/logo-UFRN.png";

const Header = () => {
  return (
    <header className="header-component bg-dark text-white py-3 shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between px-3">
        {/* Logo e nome da instituição */}
        <div className="d-flex align-items-center">
          <Image
            src={LogoUfrn}
            alt="Logo da UFRN"
            className="header-logo me-3"
            rounded
          />
          <h6 className="mb-0 text-uppercase fw-semibold">
            Universidade Federal do Rio Grande do Norte
          </h6>
        </div>

        {/* Menu de usuário */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-user"
            className="d-flex align-items-center"
          >
            <FaUserCircle className="me-2 fs-5" />
            <span>Usuário</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-sm">
            <Dropdown.Item href="#/perfil">
              <FaUserCircle className="me-2 text-primary" /> Perfil
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout" className="text-danger">
              <FaSignOutAlt className="me-2" /> Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
