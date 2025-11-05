import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { initialIncidenteVulnerabilidade } from "../../models/incidenteVulnerabilidadeModel"
import { getCategories } from "../../services/categoryService";
import { createIncidente, updateIncidente } from "../../services/incidentService";

const IncidenteForm = ({ selectedIncidente, setSelectedIncidente, onSave }) => {
    const [formData, setFormData] = useState(initialIncidenteVulnerabilidade);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);

    // Buscar categorias do Firestore
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategories();
                setCategorias(data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        if (selectedIncidente) {
            setFormData(selectedIncidente);
        } else {
            setFormData(initialIncidenteVulnerabilidade);
        }
    }, [selectedIncidente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (selectedIncidente) {
                await updateIncidente(selectedIncidente.id, formData);
                alert("Incidente atualizado com sucesso!");
            } else {
                const res = await createIncidente(formData);
                alert(`Incidente criado com sucesso! ID: ${res.id}`);
            }
            setFormData(initialIncidenteVulnerabilidade);
            setSelectedIncidente(null);
            if (onSave) onSave();
        } catch (error) {
            alert(`Erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialIncidenteVulnerabilidade);
        setSelectedIncidente(null);
    };

    return (
        <div className="mb-4">
            <h4>{selectedIncidente ? "Editar Incidente" : "Novo Incidente"}</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número do Chamado</Form.Label>
                            <Form.Control
                                type="text"
                                name="numeroChamado"
                                value={formData.numeroChamado}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tarefa Relacionada</Form.Label>
                            <Form.Control
                                type="text"
                                name="tarefaRelacionada"
                                value={formData.tarefaRelacionada}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Assunto</Form.Label>
                            <Form.Control
                                type="text"
                                name="assunto"
                                value={formData.assunto}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                name="categoriaId"
                                value={formData.categoriaId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Situação</Form.Label>
                            <Form.Select
                                name="situacao"
                                value={formData.situacao}
                                onChange={handleChange}
                            >
                                <option>Aberta</option>
                                <option>Em Andamento</option>
                                <option>Concluída</option>
                                <option>Cancelada</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Select
                                name="prioridade"
                                value={formData.prioridade}
                                onChange={handleChange}
                            >
                                <option>Baixa</option>
                                <option>Média</option>
                                <option>Alta</option>
                                <option>Crítica</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Natureza</Form.Label>
                            <Form.Control
                                type="text"
                                name="natureza"
                                value={formData.natureza}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="primary" disabled={loading}>
                    {selectedIncidente ? "Atualizar" : "Adicionar"}
                </Button>
                <Button variant="danger" className="m-2" onClick={handleCancel}>
                    Cancelar
                </Button>
            </Form>
        </div>
    );
};

export default IncidenteForm;
