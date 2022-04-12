import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import styled from 'styled-components';
import { RiSettings4Fill } from 'react-icons/ri';
import { ClockDial } from 'components/timer/ClockDial';
import { Controls } from 'components/timer/Controls';
import { Sessinons } from 'components/timer/Sessions';
import { pause } from 'features/timer/timerSlice';
import { Settings } from 'components/timer/Settings';
import { Button } from 'components/ui/Button';
import { Backdrop } from 'components/ui/Backdrop';
import Portal from 'components/ui/Portal';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <Button onClick={toggleSettings}>
        <RiSettings4Fill />
      </Button>
      <ClockDial />
      <Sessinons />
      <Controls />

      {showSettings && (
        <Portal>
          <Backdrop>
            <Settings setShowSettings={setShowSettings} />
          </Backdrop>
        </Portal>
      )}
    </Container>
  );
};
