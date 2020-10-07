import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';

import { apiViaCep, apiServer } from '../../services/api';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Section, Form } from './styles';

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
  };
}

interface ErrorsYup {
  [key: string]: string;
}

interface Response {
  logradouro: string;
  bairro: string;
  localidade: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [email] = useState(() => {
    const storageToken = localStorage.getItem("@Figueiredo's:token");

    if (storageToken) {
      return JSON.parse(storageToken);
    }

    return '';
  });

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

  const handleBlur = useCallback(async value => {
    const cep = value.replace(/[^0-9]/g, '');

    if (cep.length !== 8) {
      return;
    }

    const { data } = await apiViaCep.get<Response>(`${cep}/json`);

    formRef.current?.setFieldValue('endereco.rua', data.logradouro);
    formRef.current?.setFieldValue('endereco.bairro', data.bairro);
    formRef.current?.setFieldValue('endereco.cidade', data.localidade);
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Valid e-mail, please')
          .required('E-mail is required'),
        cpf: Yup.string().required('CPF is required'),
        endereco: Yup.object().shape({
          cep: Yup.string().required('CEP is required'),
          rua: Yup.string().required('Rua is required'),
          numero: Yup.string().required('Numero is required'),
          bairro: Yup.string().required('Bairro is required'),
          cidade: Yup.string().required('Cidade is required'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await apiServer.post('/usuarios', data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorInMessages: ErrorsYup = {};

        err.inner.forEach(error => {
          errorInMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorInMessages);
      }
    }
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <h2>Cadastre um usuário</h2>

            <Input name="nome" placeholder="Nome" />
            <Input name="cpf" mask="cpf" placeholder="CPF" />
            <Input name="email" placeholder="E-mail" />

            <button type="submit">Cadastrar</button>
          </fieldset>

          <fieldset>
            <h2>Endereço (Digite somente o CEP e o número)</h2>
            <Scope path="endereco">
              <Input
                name="cep"
                mask="cep"
                placeholder="CEP"
                onBlur={value => handleBlur(value.target.value)}
              />
              <Input
                name="rua"
                placeholder="Rua"
                readOnly
                style={{ cursor: 'not-allowed' }}
              />
              <Input name="numero" placeholder="Número" />
              <Input
                name="bairro"
                placeholder="Bairro"
                readOnly
                style={{ cursor: 'not-allowed' }}
              />
              <Input
                name="cidade"
                placeholder="Cidade"
                readOnly
                style={{ cursor: 'not-allowed' }}
              />
            </Scope>
          </fieldset>
        </Form>
      </Section>

      <Footer />
    </Container>
  );
};

export default Dashboard;
