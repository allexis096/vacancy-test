import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface InputProps {
  hasError: boolean;
}

export const Container = styled.div<InputProps>`
  & + div {
    margin-top: 5px;
  }

  input {
    background-color: #faf8f2;
    width: 95%;
  }

  border: 2px solid #0077b6;
  border-radius: 4px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 15px;
  width: 100%;

  ${props =>
    props.hasError &&
    css`
      border: 2px solid #f00;
    `}
`;

export const ErrorSpan = styled(Tooltip)`
  margin-left: 16px;
  position: relative;

  svg {
    position: absolute;
    right: -5px;
    bottom: 10px;
  }

  span {
    background: #f00;
    color: #fff;
    text-align: center;

    &::before {
      border-color: #f00 transparent;
    }
  }
`;
