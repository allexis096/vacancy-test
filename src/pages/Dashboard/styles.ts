import styled from 'styled-components';

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

    button {
      background-color: #90e0ef;
      width: 150px;
      height: 50px;
      border-radius: 4px;
      transition: opacity 0.2s;

      & + button {
        margin-left: 2px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Section = styled.section``;
