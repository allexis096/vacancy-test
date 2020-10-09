import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

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
  flex-direction: column;
  width: 70%;

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
      line-height: 40px;
      border-radius: 4px;
      background-color: #05a127;
      font-size: 18px;
      color: #fff;
      transition: opacity 0.2s;
      margin-left: 5px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Users = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 90px;

    margin: 15px 0;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    font-size: 14px;
    transition: margin-left 0.5s;

    &:hover {
      margin-left: 15px;
      background-color: #caf0f8;
    }

    .title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .address {
      width: 60%;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;
      margin-right: 5px;

      button {
        width: 20px;
        height: 20px;
        background-color: transparent;
      }
    }
  }
`;
