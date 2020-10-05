import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import getValidationErrors, { Errors } from '../../utils/getValidationErrors';

import logoImg from '../../assets/keyboard-key-f.svg';

import { Container, Form } from './styles';

interface Test {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const localEmail = localStorage.getItem('@Figueiredo:email');
    const localPassword = localStorage.getItem('@Figueiredo:password');

    if (localEmail || localPassword) {
      history.push('/dashboard');
    }
  }, [history]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('You need to put a valid e-mail')
            .required('E-mail is required'),
          password: Yup.string().min(4, 'Minimum 4 characters'),
        });

        await schema.validate(
          { email, password },
          {
            abortEarly: false,
          },
        );

        const hashPassword = await hash(password, 8);

        localStorage.setItem('@Figueiredo:email', email);
        localStorage.setItem('@Figueiredo:password', hashPassword);

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorsYup = getValidationErrors(err);
          console.log(errorsYup);
        }
      }
    },
    [email, password, history],
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
          name="email"
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
