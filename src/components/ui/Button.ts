import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 50%;
  min-width: 2rem;
  min-height: 2rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: transparent;
  border: none;
  transition: background-color 0.3s, opacity 0.3s, transform 0.2s;
  cursor: pointer;

  @media ${({ theme }) => theme.media.sm} {
    min-width: 3.125rem;
    min-height: 3.125rem;
    font-size: 2.1875rem;
  }

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active:not([disabled]) {
    background-color: rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    opacity: 0.3;
    background-color: transparent;
  }
`;
