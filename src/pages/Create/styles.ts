import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;

  .headerBorder {
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    margin-top: -42px;

    > button {
      background-color: #f00;
      width: 50px;
      height: 35px;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    .header {
      display: flex;
      place-items: center;

      img {
        width: 30px;
        margin: 5px 0;
        color: #fff;
      }

      span {
        margin-left: 5px;
        font-weight: bold;
      }
    }
  }

  nav {
    width: 100%;
    padding: 10px 0;
    text-align: center;

    a {
      & + a {
        margin-left: 2px;
      }

      button {
        background-color: #90e0ef;
        width: 150px;
        height: 50px;
        border-radius: 4px;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

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
`;