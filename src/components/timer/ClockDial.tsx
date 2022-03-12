import { useAppSelector } from 'app/hooks';
import { Timing } from 'features/timer/types';

import styled from 'styled-components';
const ClockDialTimer = styled.div`
  font-size: 30px;
  font-weight: bold;
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
      <div>
        {leadingZero(Math.floor(time / 60))}:
        {leadingZero(Math.floor(time % 60))}
      </div>

      <div>Current session: {config.sessions[currentSession]}</div>
      <div>x{completedCycles}</div>

      <ul>
        {Object.keys(config.timing).map((item, idx) => (
          <li key={idx}>
            {item}:{config.timing[item as keyof Timing]}
          </li>
        ))}
      </ul>
    </ClockDialTimer>
  );
};
