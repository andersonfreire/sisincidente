import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
        <Container className="m-0 p-0">
            <Card className="border-0">
                <Card.Body>
                    <IncidenteForm
                        selectedIncidente={selectedIncidente}
                        setSelectedIncidente={setSelectedIncidente}
                        onSave={handleSave}
                    />

                    <IncidenteList
                        key={refresh}
                        onEdit={(i) => setSelectedIncidente(i)}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Incidente;
