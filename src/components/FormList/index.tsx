import { FormHandles } from '@unform/core';
import React, { useCallback, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import EditContext from '../../context/edit';
import { apiServer } from '../../services/api';
import Input from '../Input';

import { Form } from './styles';

const FormList: React.FC = () => {
  const { setUpdate } = useContext(EditContext);
  const formRef = useRef<FormHandles>(null);

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
    <Form ref={formRef} onSubmit={handleSearch}>
      <h2>Listar usuários</h2>
      <main>
        <Input name="show" placeholder="Digite o nome da pessoa" />
        <button type="submit">Buscar</button>
      </main>
    </Form>
  );
};

export default FormList;
