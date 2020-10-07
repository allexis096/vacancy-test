import { FormEvent } from 'react';

export function cpf(
  e: FormEvent<HTMLInputElement>,
): FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 14;
  let { value } = e.currentTarget;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    e.currentTarget.value = value;
  }
  return e;
}

export function cep(
  e: FormEvent<HTMLInputElement>,
): FormEvent<HTMLInputElement> {
  e.currentTarget.maxLength = 9;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  e.currentTarget.value = value;
  return e;
}
