import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const ClockDialTimer = styled.div``;

const Timer = styled.div`
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  color: white;
`;

export const ClockDial = () => {
  const { time, config, currentSession, completedCycles } = useAppSelector(
    (state) => state.timer
  );

  const leadingZero = (n: number) => {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  };

  return (
    <ClockDialTimer>
      <Timer>
        {leadingZero(Math.floor(time / 60))}:
        {leadingZero(Math.floor(time % 60))}
      </Timer>
    </ClockDialTimer>
  );
};
