// src/components/CategoryList.js
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteCategory, getCategories } from "../../services/categoryService";

const CategoriaList = ({ onEdit }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.error("Erro ao excluir categoria:", error);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
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
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Nenhuma categoria cadastrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default CategoriaList;
