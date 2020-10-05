import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;

  header {
    width: 100vw;
    background-color: #00b4d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 45px solid #03045e;

    img {
      margin: 20px 0;
      height: 100px;
    }
  }

  footer {
    height: 45px;
    width: 100vw;
    background-color: #03045e;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 400px;
  padding: 40px;
  background-color: #faf8f2;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.67);

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
  }

  input {
    border: 1px solid #0077b6;
    border-radius: 4px;
    line-height: 40px;
    font-size: 16px;
    padding: 0 15px;
  }

  button {
    margin-top: 10px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #0077b6;
    font-size: 20px;
    color: #fff;

    &:hover {
      opacity: 0.8;
    }
  }
`;
