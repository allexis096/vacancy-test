import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import logoImg from '../../assets/keyboard-key-f.svg';

import Input from '../../components/Input';

import { Container, Form } from './styles';

interface FormData {
  email: string;
  password: string;
}

interface ErrorsYup {
  [key: string]: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const token = localStorage.getItem("@Figueiredo's:token");

    if (token) {
      history.push('/dashboard');
    }
  }, [history]);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('You need to put a valid e-mail')
          .required('E-mail is required'),
        password: Yup.string().min(4, 'Minimum 4 characters'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const hashPassword = await hash(data.password, 8);

      localStorage.setItem(
        "@Figueiredo's:token",
        JSON.stringify({ email: data.email, password: hashPassword }),
      );

      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorInMessages: ErrorsYup = {};

        err.inner.forEach(error => {
          errorInMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorInMessages);
      }
    }
  }, []);

  return (
    <Container>
      <header>
        <img src={logoImg} alt="Logo Figueiredo's Company" />
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>LOGIN</h2>

        <Input name="email" placeholder="E-mail" />
        <Input name="password" placeholder="Senha" type="password" />

        <button type="submit">Entrar</button>
      </Form>

      <footer />
    </Container>
  );
};

export default SignIn;
