import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  init,
  start,
  reset,
  pause,
  nextSession,
  cycleComplete,
} from 'features/timer/timerSlice';
import { Sessinons } from 'components/timer/Sessions';
import { Settings } from 'components/timer/Settings';
import { ClockDial } from 'components/timer/ClockDial';
import { Controls } from 'components/timer/Controls';
import { Button } from 'components/ui/Button';
import { Backdrop } from 'components/ui/Backdrop';
import { AddTaskForm } from 'components/tasks/AddTaskForm';
import Portal from 'components/ui/Portal';
import { RiSettings4Fill } from 'react-icons/ri';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { Config } from 'features/timer/types';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
`;

export const TimerContainer = () => {
  const dispatch = useAppDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const firstRender = useRef(true);
  const { isRunning, timerId, time, sessionNumber, config } = useAppSelector(
    (state) => state.timer
  );
  const audio = new Audio(process.env.PUBLIC_URL + '/ding.mp3');

  const [timeLeft, setTimeLeft] = useState<number>(time);
  const [localConfig] = useLocalStorage<Config>('config', config);

  useEffect(() => {
    if (timeLeft < 0 && isRunning) {
      console.log('Switch to next session');
      console.log('timeLeft:', timeLeft);
      console.log('time:', time);
      switchToNextSession();
      setTimeLeft(time);
    }
    if (timeLeft === 0 && isRunning) {
      audio.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(init(localConfig));
      firstRender.current = false;
      return;
    }

    setTimeLeft(time);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const toggleSettings = () => {
    if (isRunning) {
      timerId && clearInterval(timerId);
      dispatch(pause());
    }
    setShowSettings(!showSettings);
  };

  const startHandler = () => {
    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);
    dispatch(start(timerId));
  };

  const pauseHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(pause());
  };

  const resetHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(reset());
    dispatch(init(localConfig));
    setTimeLeft(time);
  };

  const switchToNextSession = () => {
    if (sessionNumber % 2 === 0) {
      if (sessionNumber === config.sessions.length - 2) {
        dispatch(nextSession('rest'));
      } else {
        dispatch(nextSession('break'));
      }
    } else if (sessionNumber % 2 !== 0) {
      if (sessionNumber === config.sessions.length - 1) {
        timerId && clearInterval(timerId);
        dispatch(cycleComplete());
        dispatch(init(localConfig));
      } else {
        dispatch(nextSession('focus'));
      }
    }
  };

  return (
    <Container>
      <Button onClick={toggleSettings}>
        <RiSettings4Fill />
      </Button>
      <ClockDial time={timeLeft} />
      <Sessinons />
      <Controls
        startHandler={startHandler}
        pauseHandler={pauseHandler}
        resetHandler={resetHandler}
        switchToNextSession={switchToNextSession}
      />
      <AddTaskForm />

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
