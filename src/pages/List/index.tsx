import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiEdit } from 'react-icons/fi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';

import EditContext from '../../context/edit';

import { apiServer } from '../../services/api';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Form, Users } from './styles';

const List: React.FC = () => {
  const { update, setUpdate, setUpdateUser } = useContext(EditContext);

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

    (async function dataApi() {
      setUpdate([]);

      const response = await apiServer.get('/usuarios');

      const newUsers = response.data;

      setUpdate(newUsers);
    })();
  }, [history, setUpdate]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("@Figueiredo's:token");

    history.push('/');
  }, [history]);

  const handleUpdate = useCallback(
    async user => {
      const response = await apiServer.get(`/usuarios/${user}`);

      const getUser = Array(response.data);

      setUpdateUser(getUser);

      history.push('/create');
    },
    [setUpdateUser, history],
  );

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

      <Form
        ref={formRef}
        onSubmit={() => {
          console.log('ok');
        }}
      >
        <h2>Listar usuários</h2>
        <main>
          <Input name="show" placeholder="Digite o nome da pessoa" />
          <button type="submit">Buscar</button>
        </main>

        <Users>
          {update.map(user => (
            <li key={user.id}>
              <div className="title">
                <strong>{user.nome}</strong>
                <p>
                  CPF:
                  {user.cpf}
                </p>
                <strong>{user.email}</strong>
              </div>
              <div className="address">
                <span>
                  Endereço:&nbsp;
                  {user.endereco.rua},&nbsp;{user.endereco.numero},&nbsp;
                  {user.endereco.bairro},&nbsp;{user.endereco.cidade}
                </span>
                <p>CEP: {user.endereco.cep}</p>
              </div>
              <div className="buttons">
                <button onClick={() => handleUpdate(user.id)} type="button">
                  <FiEdit size={20} />
                </button>
              </div>
            </li>
          ))}
        </Users>
      </Form>
      <Footer />
    </Container>
  );
};

export default List;
