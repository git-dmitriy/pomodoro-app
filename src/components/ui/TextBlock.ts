import styled from 'styled-components';

export const TextBlock = styled.p`
  width: 20ch;
  padding: 0;
  word-wrap: break-word;
  border-bottom: 4px solid transparent;

  @media ${({ theme }) => theme.media.md} {
    width: 25ch;
  }
`;
