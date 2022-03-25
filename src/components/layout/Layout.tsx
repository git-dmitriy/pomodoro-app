import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

type P = {
  bg: 'focus' | 'break' | 'rest' | 'standby';
};

const StyledLayout = styled.div<P>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${(props) => handleColorType(props.bg)};
`;

const handleColorType = (color: string) => {
  switch (color) {
    case 'focus':
      return '#bc4b51';
    case 'break':
      return '#5b8e7d';
    case 'rest':
      return '#8cb369';
    default:
      return '#22333b';
  }
};

export const Layout: React.FC = ({ children }) => {
  const { isRunning, currentSession } = useAppSelector((state) => state.timer);

  const backgroundColor = isRunning ? currentSession : 'standby';

  return <StyledLayout bg={backgroundColor}>{children}</StyledLayout>;
};
