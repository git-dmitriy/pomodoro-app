import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import styled from 'styled-components';

import { ClockDial } from 'components/timer/ClockDial';
import { Controls } from 'components/timer/Controls';
import { Sessinons } from 'components/timer/Sessions';
import { pause } from 'features/timer/timerSlice';
import { Settings } from './Settings';

const Container = styled.div`
  background-color: #d1d5db;
  padding: 20px;
  border-radius: 20px;
`;

export const TimerContainer = () => {
  const dispatch = useAppDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const { isRunning, timerId } = useAppSelector((state) => state.timer);

  const toggleSettings = () => {
    if (isRunning) {
      timerId && clearInterval(timerId);
      dispatch(pause());
    }
    setShowSettings(!showSettings);
  };

  return (
    <Container>
      <ClockDial />
      <Sessinons />
      <Controls />
      <button onClick={toggleSettings}>Настройки</button>
      {showSettings && <Settings />}
    </Container>
  );
};
