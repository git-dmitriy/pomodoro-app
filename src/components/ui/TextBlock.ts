import styled from 'styled-components';

export const TextBlock = styled.p`
  width: 20ch;
  padding: 0;
  word-wrap: break-word;
  border-bottom: 4px solid transparent;

  @media (min-width: 768px) {
    width: 25ch;
  }
`;
