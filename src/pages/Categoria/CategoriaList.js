import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { deleteCategory, getCategories } from "../../services/categoryService";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const CategoriaList = ({ onEdit }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteClick = (categoria) => {
        setCategoriaSelecionada(categoria);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!categoriaSelecionada) return;
        try {
            await deleteCategory(categoriaSelecionada.id);
            setShowModal(false);
            setCategoriaSelecionada(null);
            fetchCategories();
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setCategoriaSelecionada(null);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" />
                <div>Carregando categorias...</div>
            </div>
        );
    }

    return (
        <div className="py-3">
            <h4 className="mb-3">Categorias</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.nome}</td>
                                <td>{cat.descricao || "-"}</td>
                                <td>{cat.tipo}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(cat)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(cat)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                Nenhuma categoria cadastrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal de confirmação */}
            <ConfirmModal
                show={showModal}
                onHide={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                message={
                    categoriaSelecionada
                        ? `Deseja realmente excluir a categoria "${categoriaSelecionada.nome}"?`
                        : "Deseja realmente excluir esta categoria?"
                }
            />
        </div>
    );
};

export default CategoriaList;
