import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, variant = "success" }) => {
    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastMessage;
