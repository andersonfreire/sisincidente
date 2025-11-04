// Componente de Lista para Consultar (listar) e Excluir Usuários.

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteUsuario, getUsuarios } from "../services/usuarioService";

const UsuarioList = ({ onEdit }) => {
    const [usuarios, setUsuarios] = useState([]);

    // Consultar (Listar)
    const fetchUsuarios = async () => {
        try {
            const response = await getUsuarios();
            setUsuarios(response);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    // Excluir
    const handleDelete = async (id) => {
        if (window.confirm("ATENÇÃO: Isso excluirá o registro do usuário no Firestore, mas não excluirá o usuário do sistema de Autenticação. Deseja continuar?")) {
            try {
                await deleteUsuario(id);
                fetchUsuarios(); // Atualiza a lista
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
            }
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h4 className="mb-3">Usuários Cadastrados</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {}
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Matrícula</th>
                        <th>Função</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((user) => (
                            <tr key={user.id}>
                                {}
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.matricula || "-"}</td>
                                <td>{user.funcao}</td>
                                <td>
                                    {/* Atualizar (chama onEdit) */}
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(user)}
                                    >
                                        Editar
                                    </Button>
                                    {/* Excluir (chama handleDelete) */}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Nenhum usuário cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UsuarioList;