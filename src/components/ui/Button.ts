import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 50%;
  min-width: 50px;
  min-height: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: transparent;
  border: none;
  transition: background-color 0.3s, opacity 0.3s;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    opacity: 0.3;
    background-color: transparent;
  }
`;
