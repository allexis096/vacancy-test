import { FormHandles } from '@unform/core';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import EditContext from '../../context/edit';
import { apiServer } from '../../services/api';
import Input from '../Input';
import Spinner from '../Spinner';

import { Form } from './styles';

const FormList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setUpdate } = useContext(EditContext);
  const formRef = useRef<FormHandles>(null);

  const handleSearch = useCallback(
    async data => {
      setLoading(true);

      const response = await apiServer.get(
        `/usuarios?q=${Object.values(data)}`,
      );

      const userSearch = response.data;

      if (userSearch.length === 0) {
        setLoading(false);

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
        setLoading(false);

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

      setLoading(false);

      setUpdate(userSearch);
    },
    [setUpdate],
  );

  return (
    <Form ref={formRef} onSubmit={handleSearch}>
      <h2>Listar usuários</h2>
      <main>
        <Input name="show" placeholder="Digite o nome da pessoa" />
        <button type="submit">{loading ? <Spinner /> : 'Buscar'}</button>
      </main>
    </Form>
  );
};

export default FormList;
