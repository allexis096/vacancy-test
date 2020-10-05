import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const localEmail = localStorage.getItem('@Figueiredo:email');
    const localPassword = localStorage.getItem('@Figueiredo:password');

    if (!localEmail || !localPassword) {
      history.push('/');
    }
  }, [history]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('@Figueiredo:email');
    localStorage.removeItem('@Figueiredo:password');

    history.push('/');
  }, [history]);

  return (
    <Container>
      <h1>Dashboard</h1>
      <button type="submit" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
};

export default Dashboard;
