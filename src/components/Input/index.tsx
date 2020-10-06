import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ErrorSpan } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container hasError={!!error}>
      <input ref={inputRef} {...rest} defaultValue={defaultValue} />

      {error && (
        <ErrorSpan title={error}>
          <FiAlertCircle size={20} color="#f00" />
        </ErrorSpan>
      )}
    </Container>
  );
};

export default Input;
