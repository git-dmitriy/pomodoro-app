import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { GlobalStyles } from 'components/ui/GlobalStyles';

const StyledLayout = styled.div`
  inline-size: 100%;
  min-block-size: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.media.lg} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.media.xl} {
    gap: 50px;
  }
`;

export const Layout: React.FC = ({ children }) => {
  const { isRunning, currentSession } = useAppSelector((state) => state.timer);
  const backgroundColor = isRunning ? currentSession : 'standby';

  return (
    <StyledLayout>
      {children}
      <GlobalStyles bg={backgroundColor} />
    </StyledLayout>
  );
};
