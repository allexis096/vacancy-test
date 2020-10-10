import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  > svg {
    width: 100px;
    height: 100px;

    margin-top: 15vh;

    & .path {
      stroke: #03045e;
    }
  }
`;

export const Users = styled.ul`
  display: flex;
  flex-direction: column;
  width: 70%;

  margin: 5px 0;
  padding: 40px 40px 20px;
  background-color: #faf8f2;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.67);

  list-style: none;

  @media (max-width: 790px) {
    width: 90%;
  }
`;

export const UserCard = styled.li`
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
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Address = styled.div`
  width: 60%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
  margin-right: 5px;

  svg {
    width: 20px;
    height: 20px;

    margin-left: 0;

    & .path {
      stroke: #03045e;
    }
  }

  button {
    width: 20px;
    height: 20px;
    background-color: transparent;
  }
`;
