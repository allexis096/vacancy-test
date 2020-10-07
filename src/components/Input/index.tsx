import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  FormEvent,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ErrorSpan } from './styles';
import { cep, cpf } from '../../utils/masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: 'cep' | 'cpf';
}

const Input: React.FC<InputProps> = ({ name, mask, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerField, fieldName, defaultValue, error } = useField(name);

  const handleKeyUp = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      if (mask === 'cep') {
        cep(event);
      }
      if (mask === 'cpf') {
        cpf(event);
      }
    },
    [mask],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container hasError={!!error}>
      <input
        ref={inputRef}
        {...rest}
        defaultValue={defaultValue}
        onKeyUp={handleKeyUp}
      />

      {error && (
        <ErrorSpan title={error}>
          <FiAlertCircle size={20} color="#f00" />
        </ErrorSpan>
      )}
    </Container>
  );
};

export default Input;
