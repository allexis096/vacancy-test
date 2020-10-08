import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';

import { apiViaCep, apiServer } from '../../services/api';
import EditContext from '../../context/edit';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Form } from './styles';

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

const Create: React.FC = () => {
  const { updateUser, setUpdateUser } = useContext(EditContext);
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

    if (updateUser.length === 0) {
      setUpdateUser('');
    }

    console.log(updateUser);
  }, [history, setUpdateUser, updateUser]);

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

      alert('Cadastrado com sucesso!');
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
          <Link to="/create">
            <button onClick={() => setUpdateUser('')} type="button">
              Criar usuário
            </button>
          </Link>

          <Link to="/list">
            <button type="button">Listar usuários</button>
          </Link>
        </nav>
      </Header>

      {!updateUser ? (
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
      ) : (
        updateUser.map(user => (
          <Form
            key={user.id}
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              nome: user.nome,
              cpf: user.cpf,
              email: user.email,
              endereco: {
                cep: user.endereco.cep,
                rua: user.endereco.rua,
                numero: user.endereco.numero,
                bairro: user.endereco.bairro,
                cidade: user.endereco.cidade,
              },
            }}
          >
            <fieldset>
              <h2>Editar um usuário</h2>

              <Input name="nome" placeholder="Nome" />
              <Input name="cpf" mask="cpf" placeholder="CPF" />
              <Input name="email" placeholder="E-mail" />

              <button type="submit">Editar</button>
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
                  style={{
                    cursor: 'not-allowed',
                    color: '#777d79',
                    fontStyle: 'italic',
                  }}
                />
                <Input name="numero" placeholder="Número" />
                <Input
                  name="bairro"
                  placeholder="Bairro"
                  readOnly
                  style={{
                    cursor: 'not-allowed',
                    color: '#777d79',
                    fontStyle: 'italic',
                  }}
                />
                <Input
                  name="cidade"
                  placeholder="Cidade"
                  readOnly
                  style={{
                    cursor: 'not-allowed',
                    color: '#777d79',
                    fontStyle: 'italic',
                  }}
                />
              </Scope>
            </fieldset>
          </Form>
        ))
      )}

      <Footer />
    </Container>
  );
};

export default Create;
