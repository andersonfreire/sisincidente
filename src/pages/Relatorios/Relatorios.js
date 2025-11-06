import React, { useState, useEffect } from "react";
import { getOpenIncidents, getOngoingIncidents, getCompletedIncidents } from "../../services/relatoriosService";
import { Form, Row, Col, Card } from "react-bootstrap";
import "./Relatorios.css";

const Relatorios = () => {
    const [period, setPeriod] = useState("last12months");
    const [stats, setStats] = useState({
        openIncidents: 0,
        openVulnerabilities: 0,
        ongoingIncidents: 0,
        ongoingVulnerabilities: 0,
        completedIncidentsPercentage: 0,
        completedVulnerabilitiesPercentage: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date();
            let startDate, endDate;

            if (period === "last12months") {
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                endDate = now;
            } else {
                const year = parseInt(period, 10);
                startDate = new Date(year, 0, 1);
                endDate = new Date(year, 11, 31);
            }

            const [open, ongoing, allCompleted] = await Promise.all([
                getOpenIncidents(),
                getOngoingIncidents(),
                getCompletedIncidents(),
            ]);
            
            const completed = allCompleted.filter(i => {
                const conclusionDate = i.dataConclusao.toDate();
                return conclusionDate >= startDate && conclusionDate <= endDate;
            });

            const openIncidents = open.filter((i) => i.tipo === "Incidente").length;
            const openVulnerabilities = open.filter((i) => i.tipo === "Vulnerabilidade").length;

            const ongoingIncidents = ongoing.filter((i) => i.tipo === "Incidente").length;
            const ongoingVulnerabilities = ongoing.filter((i) => i.tipo === "Vulnerabilidade").length;
            
            const totalIncidents = openIncidents + ongoingIncidents + completed.filter((i) => i.tipo === "Incidente").length;
            const totalVulnerabilities = openVulnerabilities + ongoingVulnerabilities + completed.filter((i) => i.tipo === "Vulnerabilidade").length;

            const completedIncidentsPercentage = totalIncidents > 0 ? (completed.filter((i) => i.tipo === "Incidente").length / totalIncidents) * 100 : 0;
            const completedVulnerabilitiesPercentage = totalVulnerabilities > 0 ? (completed.filter((i) => i.tipo === "Vulnerabilidade").length / totalVulnerabilities) * 100 : 0;
            
            setStats({
                openIncidents,
                openVulnerabilities,
                ongoingIncidents,
                ongoingVulnerabilities,
                completedIncidentsPercentage,
                completedVulnerabilitiesPercentage,
            });
        };

        fetchData();
    }, [period]);

    return (
        <div className="relatorios-container">
            <h2>Relatórios</h2>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Período</Form.Label>
                <Col sm={10}>
                    <Form.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="last12months">Últimos 12 meses</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Incidentes Abertos</Card.Title>
                            <Card.Text className="kpi-number">{stats.openIncidents}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vulnerabilidades Abertas</Card.Title>
                            <Card.Text className="kpi-number">{stats.openVulnerabilities}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Incidentes em Andamento</Card.Title>
                            <Card.Text className="kpi-number">{stats.ongoingIncidents}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vulnerabilidades em Andamento</Card.Title>
                            <Card.Text className="kpi-number">{stats.ongoingVulnerabilities}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Incidentes Concluídos (Período)</Card.Title>
                            <Card.Text className="kpi-number">{stats.completedIncidentsPercentage.toFixed(2)}%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vulnerabilidades Concluídas (Período)</Card.Title>
                            <Card.Text className="kpi-number">{stats.completedVulnerabilitiesPercentage.toFixed(2)}%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Relatorios;
