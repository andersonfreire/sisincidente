import React, { useState } from "react";
import { Container, Card, Accordion } from "react-bootstrap";
import IncidenteList from "./IncidenteList";
import IncidenteForm from "./IncidenteForm";

const Incidente = () => {
    const [selectedIncidente, setSelectedIncidente] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setSelectedIncidente(null);
        setRefresh(!refresh);
    };

    return (
            <Card className="border-0 m-0 p-0">
                <Card.Body className="p-0">
                    <Accordion defaultActiveKey="0" alwaysOpen className="d-flex flex-column gap-3">
                        
                        <Accordion.Item 
                            eventKey="0" 
                            style={{
                                border: "none",
                                boxShadow: "none"
                            }}>
                            <Accordion.Header>
                                {selectedIncidente
                                ? `✏️ Editar Incidente #${selectedIncidente.numeroChamado || ""}`
                                : "➕ Novo Incidente"}
                            </Accordion.Header>
                            <Accordion.Body>
                                <IncidenteForm
                                    selectedIncidente={selectedIncidente}
                                    setSelectedIncidente={setSelectedIncidente}
                                    onSave={handleSave}
                                />
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item 
                            eventKey="1" 
                            style={{
                                border: "none",
                                boxShadow: "none"
                            }}
                        >
                            <Accordion.Header>📋 Incidentes Registrados</Accordion.Header>
                            <Accordion.Body>
                                <IncidenteList
                                    key={refresh}
                                    onEdit={(i) => {
                                        setSelectedIncidente(i);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
    );
};

export default Incidente;
