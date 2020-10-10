import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  display: flex;
  flex-direction: row;

  fieldset + fieldset {
    margin-left: 20px;
  }

  height: 380px;

  padding: 40px;
  background-color: #faf8f2;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.67);

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
  }

  button {
    margin-top: 54px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #05a127;
    font-size: 20px;
    color: #fff;
    transition: opacity 0.2s;
    width: 100%;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 790px) {
    flex-direction: column;
    height: 100%;
    position: relative;
    margin: 5px 0 10px;
    padding: 20px 15px 45px;

    fieldset + fieldset {
      margin-left: 0;
    }

    button {
      position: absolute;
      bottom: 0;
      width: 403px;
      margin-bottom: 7px;
    }
  }
`;
