import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";





export default function FormCadFornecedor(props){

    const fornVazio = {
        cpf:'',
        nome:'',
        empresa:'',
        produto:{
            codigo:'',
        }
    }

    const estadoInicialForn = props.fornEdicao;
    const [forn,setForn] = useState(estadoInicialForn);
    const [formValidado, setFormValidado] = useState(false);

    const { estado: estadoProd,
        mensagem: mensagemProd,
        produtos    } = useSelector((state)=>state.produto);

    const {estado, mensagem, produtos} = useSelector((state)=> state.produto);

    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        console.log(componente.value)
        setCliente({...cliente,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            //todos os campos preenchidos
            //mandar os dados para o backend
            if(!props.modoEdicao){
                //substituído pelo padrão redux
                //props.setListaClientes([...props.listaClientes,cliente]);
                dispatch(adicionar(fornecedor));
            }
            else{
                //alterar os dados do cliente (filtra e adiciona)

                //substituído pelo padrão redux
                //props.setListaClientes([...props.listaClientes.filter((itemCliente)=>itemCliente.cpf !== cliente.cpf),cliente]);
                dispatch(atualizar(fornecedor));
                props.setModoEdicao(false);
                props.setClienteParaEdicao(fornVazio);                
            }
            setCliente(fornVazio); // ou sair da tela de formulário 
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }




    return(
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Codigo:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    value={forn.cpf}
                                    onChange={manipularMudancas}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o cpf do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nome:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do fornecedor"
                                    id="nomeForn"
                                    name="nomeForn"
                                    value={forn.nome}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Form.Group>
                            <FloatingLabel
                                label="Empresa:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="0.00"
                                    id="empresa"
                                    name="empresa"
                                    onChange={manipularMudancas}
                                    value={forn.empresa}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a Empresa!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FloatingLabel controlId="floatingSelect" label="Produto:">
                            <Form.Select
                                aria-label="Produto fornecido"
                                id='prodForn'
                                name='prodForn'
                                onChange={selecionaProduto}
                                value={forn.produto.codigo}
                                requerid>
                                <option value="0" selected>Selecione um Produto</option>
                                {
                                    produtos?.map((produto) =>
                                        <option key={produto.codigo} value={produto.codigo}>
                                            {produto.descricao}
                                        </option>
                                    )
                                }
                            </Form.Select>
                            {estadoProd === ESTADO.PENDENTE ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Carregando produtos...</span>
                                </Spinner>
                                :
                                null
                            }
                            {
                                estadoProd === ESTADO.ERRO ?
                                    <p>Erro ao carregar os produtos: {mensagemProd}</p>
                                    :
                                    null
                            }
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false)
                        }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
    );



}