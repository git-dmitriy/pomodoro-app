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
  cursor: pointer;
  transition: background-color 0.3s;

  &:active,
  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
