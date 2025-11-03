// Componente de Formulário para "Cadastrar" e "Atualizar" Unidades.

import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createUnidade, updateUnidade } from "../services/unidadeAdministrativaService";
import { initialUnidadeAdministrativa } from "../models/unidadeAdministrativaModel"; //

const UnidadeAdministrativaForm = ({ selectedUnidade, setSelectedUnidade, onSave }) => {

    const [unidadeData, setUnidadeData] = useState(initialUnidadeAdministrativa);
    const [loading, setLoading] = useState(false);

    // Handler genérico para todos os inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUnidadeData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Monitora a seleção para preencher o formulário para "Atualizar"
    useEffect(() => {
        if (selectedUnidade) {
            setUnidadeData(selectedUnidade);
        } else {
            setUnidadeData(initialUnidadeAdministrativa);
        }
    }, [selectedUnidade]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (selectedUnidade) {
                // Atualizar
                await updateUnidade(selectedUnidade.id, unidadeData);
                alert("Unidade atualizada com sucesso!");
            } else {
                // Cadastrar
                const res = await createUnidade(unidadeData);
                alert(`Unidade criada com sucesso! ID: ${res.id}`);
            }

            // Limpa o formulário
            handleCancel();
            if (onSave) onSave();

        } catch (error) {
            alert(`Erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Limpa o formulário e a seleção
    const handleCancel = () => {
        setUnidadeData(initialUnidadeAdministrativa);
        setSelectedUnidade(null);
    };

    return (
        <div className="mb-4">
            <h4>{selectedUnidade ? "Editar Unidade" : "Nova Unidade Administrativa"}</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {}
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigo"
                                placeholder="Ex: 1.25.01"
                                value={unidadeData.codigo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    {}
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sigla</Form.Label>
                            <Form.Control
                                type="text"
                                name="sigla"
                                placeholder="Ex: STI"
                                value={unidadeData.sigla}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                {}
                <Form.Group className="mb-3">
                    <Form.Label>Título (Nome Completo)</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        placeholder="Ex: Superintendência de Tecnologia da Informação"
                        value={unidadeData.titulo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {}
                <Form.Group className="mb-3">
                    <Form.Label>Responsável</Form.Label>
                    <Form.Control
                        type="text"
                        name="responsavel"
                        placeholder="Nome do gestor ou responsável"
                        value={unidadeData.responsavel}
                        onChange={handleChange}
                    />
                </Form.Group>

                {}
                <Form.Group className="mb-3">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3} 
                        name="contato"
                        placeholder="Telefone, e-mail ou ramal"
                        value={unidadeData.contato}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading} className="me-2">
                    {selectedUnidade ? "Atualizar" : "Adicionar"}
                </Button>
                <Button variant="danger" onClick={handleCancel}>
                    Cancelar
                </Button>
            </Form>
        </div>
    );
};

export default UnidadeAdministrativaForm;