// Componente de Lista para "Consultar" (listar) e "Excluir" Unidades.

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteUnidade, getUnidades } from "../services/unidadeAdministrativaService";

const UnidadeAdministrativaList = ({ onEdit }) => {
    const [unidades, setUnidades] = useState([]);

    // Consultar (Listar)
    const fetchUnidades = async () => {
        try {
            const response = await getUnidades();
            setUnidades(response);
        } catch (error) {
            console.error("Erro ao buscar unidades:", error);
        }
    };

    // Excluir
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta unidade?")) {
            try {
                await deleteUnidade(id);
                fetchUnidades(); // Atualiza a lista
            } catch (error) {
                console.error("Erro ao excluir unidade:", error);
            }
        }
    };

    useEffect(() => {
        fetchUnidades();
    }, []);

    return (
        <div>
            <h4 className="mb-3">Unidades Administrativas</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {}
                        <th>Código</th>
                        <th>Título</th>
                        <th>Sigla</th>
                        <th>Responsável</th>
                        <th>Contato</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {unidades.length > 0 ? (
                        unidades.map((ua) => (
                            <tr key={ua.id}>
                                {}
                                <td>{ua.codigo}</td>
                                <td>{ua.titulo}</td>
                                <td>{ua.sigla}</td>
                                <td>{ua.responsavel || "-"}</td>
                                <td>{ua.contato || "-"}</td>
                                <td>
                                    {}
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(ua)}
                                    >
                                        Editar
                                    </Button>
                                    {}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(ua.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Nenhuma unidade cadastrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UnidadeAdministrativaList;