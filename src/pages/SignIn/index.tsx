import React, { FormEvent, useCallback, useState } from 'react';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Form } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(password);
      console.log(email);
    },
    [email, password],
  );

  return (
    <Container>
      <header>
        <img src={logoImg} alt="Logo Figueiredo's Company" />
      </header>

      <Form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>

        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          name=""
          placeholder="Senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit">Entrar</button>
      </Form>

      <footer />
    </Container>
  );
};

export default SignIn;
