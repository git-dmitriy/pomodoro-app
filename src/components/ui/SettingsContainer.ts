import styled from 'styled-components';

export const SettingsContainer = styled.div`
  padding: 1.5rem;
  background-color: #22333b;
  border-radius: 1rem;
  font-size: 20px;

  @media ${({ theme }) => theme.media.sm} {
    font-size: 20px;
  }
`;
