import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Scope } from '@unform/core';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Section, Form } from './styles';

const Dashboard: React.FC = () => {
  const [email] = useState(() => {
    const storageToken = localStorage.getItem("@Figueiredo's:token");

    if (storageToken) {
      return JSON.parse(storageToken);
    }

    return '';
  });

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("@Figueiredo's:token");

    if (!token) {
      history.push('/');
    }
  }, [history]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("@Figueiredo's:token");

    history.push('/');
  }, [history]);

  const handleSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Header>
        <div className="headerBorder">
          <div className="header">
            <img src={logoImg} alt="Logo Figueiredo's Company" />
            <span>
              Bem vindo(a), &nbsp;
              {email.email}
            </span>
          </div>

          <button type="submit" onClick={handleSignOut}>
            Sair
          </button>
        </div>

        <nav>
          <button type="button">Criar usuário</button>
          <button type="button">Listar usuários</button>
        </nav>
      </Header>

      <Section>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <h2>Cadastre um usuário</h2>

            <Input name="nome" placeholder="Nome" />
            <Input name="cpf" placeholder="CPF" />
            <Input name="email" placeholder="E-mail" />

            <button type="submit">Cadastrar</button>
          </fieldset>

          <fieldset>
            <h2>Endereço</h2>
            <Scope path="endereco">
              <Input name="cep" placeholder="CEP" />
              <Input name="rua" placeholder="Rua" />
              <Input name="numero" placeholder="Número" />
              <Input name="bairro" placeholder="Bairo" />
              <Input name="cidade" placeholder="Cidade" />
            </Scope>
          </fieldset>
        </Form>
      </Section>

      <Footer />
    </Container>
  );
};

export default Dashboard;
