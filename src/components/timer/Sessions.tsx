import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { BiGame } from 'react-icons/bi';

const PomodoroItemsList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PomodoroItem = styled.li`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ef4444;
  background-color: transparent;
  margin: 0 5px;
`;

const PomodoroItemFill = styled(PomodoroItem)`
  background-color: #ef4444;
`;

const PomodoroItemRest = styled.li`
  font-size: 30px;
  background-color: #fde047;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Sessinons = () => {
  const { tomatoes, config, currentSession } = useAppSelector(
    (state) => state.timer
  );

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

      {currentSession === 'rest' && (
        <PomodoroItemRest>
          <BiGame />
        </PomodoroItemRest>
      )}
    </PomodoroItemsList>
  );
};
