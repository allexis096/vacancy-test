import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Section } from './styles';

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

      <Section />

      <Footer />
    </Container>
  );
};

export default Dashboard;
