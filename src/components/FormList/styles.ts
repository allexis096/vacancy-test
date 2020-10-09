import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;

  margin: 10px 0;
  padding: 40px 40px 20px;
  background-color: #faf8f2;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.67);

  h2 {
    font-size: 20px;
  }

  main {
    margin-top: 10px;
    display: flex;

    button {
      width: 80px;
      height: 45px;

      line-height: 40px;
      border-radius: 4px;
      background-color: #05a127;
      font-size: 17px;
      color: #fff;
      transition: opacity 0.2s;
      margin-left: 2px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
