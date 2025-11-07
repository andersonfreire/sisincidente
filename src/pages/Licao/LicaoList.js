import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { getLicoes, deleteLicao } from "../../services/licaoService";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const LicaoList = ({ onEdit, refresh }) => {
    const [licoes, setLicoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [licaoSelecionada, setLicaoSelecionada] = useState(null);

    const fetchLicoes = async () => {
        setLoading(true);
        try {
            const data = await getLicoes();
            setLicoes(data);
        } catch (error) {
            console.error("Erro ao buscar lições aprendidas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLicoes();
    }, [refresh]);

    const handleDeleteClick = (licao) => {
        setLicaoSelecionada(licao);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteLicao(licaoSelecionada.id);
            setShowModal(false);
            setLicaoSelecionada(null);
            fetchLicoes();
        } catch (error) {
            console.error("Erro ao excluir lição:", error);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setLicaoSelecionada(null);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" />
                <div>Carregando lições aprendidas...</div>
            </div>
        );
    }

    return (
        <div className="licao-list">
            <h4 className="mb-3">Lições Aprendidas Registradas</h4>

            {licoes.length === 0 ? (
                <p className="text-center text-muted">Nenhuma lição registrada.</p>
            ) : (
                <div className="table-responsive">
                <Table striped bordered hover responsive className="licao-table">
                    <thead>
                        <tr>
                            <th className="col-titulo">Título</th>
                            <th className="col-autor">Autor</th>
                            <th className="col-incidente">Incidente</th>
                            <th className="col-data">Data de Registro</th>
                            <th className="col-anexo">Anexo</th>
                            <th className="col-acoes">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licoes.map((licao) => (
                            <tr key={licao.id}>
                                <td>{licao.titulo || "—"}</td>
                                <td>{licao.autor || "—"}</td>
                                <td>{licao.id_incidente || "—"}</td>
                                <td>{formatarData(licao.data_registro)}</td>
                                <td>
                                    {licao.anexos ? (
                                        <a
                                            href={licao.anexos}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                        Ver documento
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </td>
                                <td>
                                    <div className="licao-actions-buttons">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(licao)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(licao)}
                                    >
                                        Excluir
                                    </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
                </Table>
                </div>
            )}

            {/* Modal de confirmação */}
            <ConfirmModal
                show={showModal}
                onHide={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                message={
                licaoSelecionada
                    ? `Deseja realmente excluir a lição "${licaoSelecionada.titulo}"?`
                    : "Deseja realmente excluir esta lição?"
                }
            />
        </div>
    );
};

// Função utilitária para formatação de data
const formatarData = (timestamp) => {
    if (!timestamp) return "—";
        const date =
            timestamp.toDate?.() instanceof Date
            ? timestamp.toDate()
            : new Date(timestamp);
        return date.toLocaleString("pt-BR");
};

export default LicaoList;
