import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;
`;

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;

  width: 400px;
  height: 275px;
  padding: 40px;
  background-color: #faf8f2;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.67);

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
  }

  button {
    margin-top: 15px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #0077b6;
    font-size: 20px;
    color: #fff;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;
