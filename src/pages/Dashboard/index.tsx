import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const Dashboard: React.FC = () => {
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
      <h1>Dashboard</h1>
      <button type="submit" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
};

export default Dashboard;
