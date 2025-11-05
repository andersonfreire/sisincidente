import React from "react";
import "./Header.css";
import { CardHeader, Image } from "react-bootstrap";
import LogoUfrn from "../../assets/logo-UFRN.png"
const Header = () => {

    return (
        <CardHeader className="header-component bg-dark">
            <Image src={LogoUfrn} alt="Logo da UFRN" />
        </CardHeader>
    )
}   

export default Header