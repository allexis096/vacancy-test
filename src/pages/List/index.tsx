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
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
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

      const response = await apiServer.get('/usuarios?_sort=nome&_order=asc');

      const newUsers = response.data;

      setUpdate(newUsers);
    })();
  }, [history, setUpdate]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("@Figueiredo's:token");

    toast.success('Deslogado com sucesso! ✅', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });

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

  const handleDelete = useCallback(
    async userId => {
      await apiServer.delete(`/usuarios/${userId}`);

      const response = await apiServer.get('/usuarios');

      const usersUpdated = response.data;

      toast.success('Deletado com sucesso! ✅', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });

      setUpdate(usersUpdated);
    },
    [setUpdate],
  );

  const handleSearch = useCallback(
    async data => {
      const response = await apiServer.get(
        `/usuarios?q=${Object.values(data)}`,
      );

      const userSearch = response.data;

      if (userSearch.length === 0) {
        toast.error('Nada encontrado! ✖', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        return;
      }

      if (userSearch.length > 1) {
        const allUsers = await apiServer.get('/usuarios?_sort=nome&_order=asc');

        setUpdate(allUsers.data);

        toast.warning(
          'Digite pelo menos um parâmetro para a pesquisa correta! ❗',
          {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          },
        );

        return;
      }

      setUpdate(userSearch);
    },
    [setUpdate],
  );

  return (
    <Container>
      <Header>
        <div className="headerBorder">
          <div className="header">
            <img src={logoImg} alt="Logo Figueiredo's Company" />
            <span>Bem vindo(a),&nbsp;{email.email}</span>
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

      <Form ref={formRef} onSubmit={handleSearch}>
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
                <strong>CPF:&nbsp;{user.cpf}</strong>
                <strong>{user.email}</strong>
              </div>
              <div className="address">
                <strong>
                  Endereço:&nbsp;
                  {user.endereco.rua},&nbsp;{user.endereco.numero},&nbsp;
                  {user.endereco.bairro},&nbsp;{user.endereco.cidade}
                </strong>
                <strong>CEP: {user.endereco.cep}</strong>
              </div>
              <div className="buttons">
                <button onClick={() => handleUpdate(user.id)} type="button">
                  <FiEdit size={20} />
                </button>
                <button onClick={() => handleDelete(user.id)} type="button">
                  <MdDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </Users>
      </Form>
    </Container>
  );
};

export default List;
