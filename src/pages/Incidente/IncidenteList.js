import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteIncidente, getIncidentes } from "../../services/incidentService";

const IncidenteList = ({ onEdit }) => {
    const [incidentes, setIncidentes] = useState([]);

    const fetchIncidentes = async () => {
        try {
            const data = await getIncidentes();
            setIncidentes(data);
        } catch (error) {
            console.error("Erro ao buscar incidentes:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deseja realmente excluir este incidente?")) {
            try {
                await deleteIncidente(id);
                fetchIncidentes();
            } catch (error) {
                console.error("Erro ao excluir incidente:", error);
            }
        }
    };

    useEffect(() => {
        fetchIncidentes();
    }, []);

    return (
        <div>
            <h4 className="mb-3">Incidentes</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Assunto</th>
                        <th>Situação</th>
                        <th>Prioridade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {incidentes.length > 0 ? (
                        incidentes.map((i) => (
                            <tr key={i.id}>
                                <td>{i.numeroChamado || "-"}</td>
                                <td>{i.assunto || "-"}</td>
                                <td>{i.situacao}</td>
                                <td>{i.prioridade}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(i)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(i.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Nenhum incidente registrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default IncidenteList;
