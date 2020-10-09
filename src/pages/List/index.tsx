import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Header from '../../components/Header';

import EditContext from '../../context/edit';

import { apiServer } from '../../services/api';

import { Container, Users, UserCard, Title, Address, Buttons } from './styles';
import FormList from '../../components/FormList';

const List: React.FC = () => {
  const { update, setUpdate, setUpdateUser } = useContext(EditContext);

  const history = useHistory();

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

  return (
    <Container>
      <Header />

      <FormList />

      <Users>
        {update.map(user => (
          <UserCard key={user.id}>
            <Title>
              <strong>{user.nome}</strong>
              <strong>CPF:&nbsp;{user.cpf}</strong>
              <strong>{user.email}</strong>
            </Title>

            <Address>
              <strong>
                Endereço:&nbsp;
                {user.endereco.rua},&nbsp;{user.endereco.numero},&nbsp;
                {user.endereco.bairro},&nbsp;{user.endereco.cidade}
              </strong>
              <strong>CEP: {user.endereco.cep}</strong>
            </Address>

            <Buttons>
              <button onClick={() => handleUpdate(user.id)} type="button">
                <FiEdit size={20} />
              </button>
              <button onClick={() => handleDelete(user.id)} type="button">
                <MdDelete size={20} />
              </button>
            </Buttons>
          </UserCard>
        ))}
      </Users>
    </Container>
  );
};

export default List;
