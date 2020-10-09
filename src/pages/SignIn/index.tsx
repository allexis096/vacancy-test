import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Footer from '../../components/Footer';

import logoImg from '../../assets/keyboard-key-f.svg';

import EditContext from '../../context/edit';

import { Container, Form, HeaderSignIn } from './styles';

interface FormData {
  email: string;
  password: string;
}

interface ErrorsYup {
  [key: string]: string;
}

const SignIn: React.FC = () => {
  const { setUpdateUser } = useContext(EditContext);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const token = localStorage.getItem("@Figueiredo's:token");
    setUpdateUser('');

    if (token) {
      history.push('/create');
    }
  }, [history, setUpdateUser]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
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

        toast.success('Logado com sucesso! ✅', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });

        history.push('/create');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          toast.error('Erro nas credenciais ✖️', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });

          const errorInMessages: ErrorsYup = {};

          err.inner.forEach(error => {
            errorInMessages[error.path] = error.message;
          });

          formRef.current?.setErrors(errorInMessages);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <HeaderSignIn>
        <img src={logoImg} alt="Logo Figueiredo's Company" />
      </HeaderSignIn>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>LOGIN</h2>

        <Input name="email" placeholder="E-mail" />
        <Input name="password" placeholder="Senha" type="password" />

        <button type="submit">Entrar</button>
      </Form>

      <Footer />
    </Container>
  );
};

export default SignIn;
