import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const PomodoroItemsList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PomodoroItem = styled.li`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  margin: 0 5px;

  @media (min-width: 640px) {
    width: 35px;
    height: 35px;
  }

  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;

const PomodoroItemFill = styled(PomodoroItem)`
  background-color: white;
`;

export const Sessinons = () => {
  const { tomatoes, config } = useAppSelector((state) => state.timer);

  const totalTomatoes = Array.from(Array(config.sessions.length / 2).keys());

  return (
    <PomodoroItemsList>
      {totalTomatoes.map((item) => {
        if (item >= tomatoes) {
          return <PomodoroItem key={item} />;
        } else {
          return <PomodoroItemFill key={item} />;
        }
      })}
    </PomodoroItemsList>
  );
};
