import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Container } from './styles';
import FormCreate from '../../components/FormCreate';
import FormUpdate from '../../components/FormUpdate';
import EditContext from '../../context/edit';

const Create: React.FC = () => {
  const { updateUser, setUpdateUser } = useContext(EditContext);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("@Figueiredo's:token");

    if (!token) {
      history.push('/');
    }

    if (updateUser.length === 0) {
      setUpdateUser('');
    }
  }, [history, setUpdateUser, updateUser]);

  return (
    <Container>
      <Header />

      {!updateUser ? <FormCreate /> : <FormUpdate />}

      <Footer />
    </Container>
  );
};

export default Create;
