import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 75%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 15px 0px;
    border-radius: 4px;
    transition: opacity 0.6s;

    color: #312e38;
    font-size: 14px;
    font-weight: bold;

    opacity: 0;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 36px);
    left: 98.5%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-width: 6px 6px 0 6px;

      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
