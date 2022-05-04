import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { GlobalStyles } from 'components/ui/GlobalStyles';

const StyledLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }

  @media (min-width: 1280px) {
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
