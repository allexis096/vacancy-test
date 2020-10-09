import React, { useCallback, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import logoImg from '../../assets/keyboard-key-f.svg';
import EditContext from '../../context/edit';

import { Container, HeaderBorder, UserInfo, NavBar } from './styles';

const Header: React.FC = () => {
  const history = useHistory();

  const { setUpdateUser } = useContext(EditContext);

  const [email] = useState(() => {
    const storageToken = localStorage.getItem("@Figueiredo's:token");

    if (storageToken) {
      return JSON.parse(storageToken);
    }

    return '';
  });

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

  return (
    <Container>
      <HeaderBorder className="headerBorder">
        <UserInfo className="header">
          <img src={logoImg} alt="Logo Figueiredo's Company" />
          <span>Bem vindo(a),&nbsp;{email.email}</span>
        </UserInfo>

        <button type="submit" onClick={handleSignOut}>
          Sair
        </button>
      </HeaderBorder>

      <NavBar>
        <Link to="/create">
          <button onClick={() => setUpdateUser('')} type="button">
            Criar usuário
          </button>
        </Link>

        <Link to="/list">
          <button type="button">Listar usuários</button>
        </Link>
      </NavBar>
    </Container>
  );
};

export default Header;
