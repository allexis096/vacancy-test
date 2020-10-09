import React, { useCallback, useRef } from 'react';
import { FormHandles, Scope } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { apiServer, apiViaCep } from '../../services/api';

import Input from '../Input';

import { Form } from './styles';

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
  };
}

interface ErrorsYup {
  [key: string]: string;
}

interface ResponseCep {
  erro: boolean;
  logradouro: string;
  bairro: string;
  localidade: string;
}

const FormCreate: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleBlur = useCallback(async value => {
    const cep = value.replace(/[^0-9]/g, '');

    if (cep.length !== 8) {
      return;
    }

    const { data } = await apiViaCep.get<ResponseCep>(`${cep}/json`);

    if (data.erro) {
      toast.warning('CEP inválido! ❗', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    formRef.current?.setFieldValue('endereco.rua', data.logradouro);
    formRef.current?.setFieldValue('endereco.bairro', data.bairro);
    formRef.current?.setFieldValue('endereco.cidade', data.localidade);
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Valid e-mail, please')
            .required('E-mail is required'),
          cpf: Yup.string().required('CPF is required'),
          endereco: Yup.object().shape({
            cep: Yup.string().required('CEP is required'),
            rua: Yup.string().required('Rua is required'),
            numero: Yup.string().required('Numero is required'),
            bairro: Yup.string().required('Bairro is required'),
            cidade: Yup.string().required('Cidade is required'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await apiServer.post('/usuarios', data);

        toast.success('Cadastrado com sucesso! ✅', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });

        history.push('/list');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          toast.error(
            'Erro ao cadastrar, preecha as credenciais corretamente. ✖',
            {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
            },
          );

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
    <Form ref={formRef} onSubmit={handleSubmit}>
      <fieldset>
        <h2>Cadastre um usuário</h2>

        <Input name="nome" placeholder="Nome" />
        <Input name="cpf" mask="cpf" placeholder="CPF" />
        <Input name="email" placeholder="E-mail" />

        <button type="submit">Cadastrar</button>
      </fieldset>

      <fieldset>
        <h2>Endereço (Digite somente o CEP e o número)</h2>
        <Scope path="endereco">
          <Input
            name="cep"
            mask="cep"
            placeholder="CEP"
            onBlur={value => handleBlur(value.target.value)}
          />
          <Input
            name="rua"
            placeholder="Rua"
            readOnly
            style={{
              cursor: 'not-allowed',
              color: '#03045E',
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}
          />
          <Input name="numero" placeholder="Número" />
          <Input
            name="bairro"
            placeholder="Bairro"
            readOnly
            style={{
              cursor: 'not-allowed',
              color: '#03045E',
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}
          />
          <Input
            name="cidade"
            placeholder="Cidade"
            readOnly
            style={{
              cursor: 'not-allowed',
              color: '#03045E',
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}
          />
        </Scope>
      </fieldset>
    </Form>
  );
};

export default FormCreate;
