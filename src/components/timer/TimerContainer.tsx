import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import * as timer from 'features/timer/timerSlice';
import { Sessions } from 'components/timer/Sessions';
import { Settings } from 'components/timer/Settings';
import { ClockDial } from 'components/timer/ClockDial';
import { Controls } from 'components/timer/Controls';
import { Button } from 'components/ui/Button';
import { Backdrop } from 'components/ui/Backdrop';
import { FlexContainer } from 'components/ui/FlexContainer';
import { AddTaskForm } from 'components/tasks/AddTaskForm';
import Portal from 'components/ui/Portal';
import { RiSettings4Fill } from 'react-icons/ri';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { Config } from 'features/timer/types';

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
      dispatch(timer.init(localConfig));
      firstRender.current = false;
      return;
    }

    setTimeLeft(time);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const toggleSettings = () => {
    if (isRunning) {
      timerId && clearInterval(timerId);
      dispatch(timer.pause());
    }
    setShowSettings(!showSettings);
  };

  const startHandler = () => {
    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);
    dispatch(timer.start(timerId));
  };

  const pauseHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(timer.pause());
  };

  const resetHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(timer.reset());
    dispatch(timer.init(localConfig));
    setTimeLeft(time);
  };

  const switchToNextSession = () => {
    if (sessionNumber % 2 === 0) {
      if (sessionNumber === config.sessions.length - 2) {
        dispatch(timer.nextSession('rest'));
        setTimeLeft(time);
      } else {
        dispatch(timer.nextSession('break'));
        setTimeLeft(time);
      }
    } else if (sessionNumber % 2 !== 0) {
      if (sessionNumber === config.sessions.length - 1) {
        timerId && clearInterval(timerId);
        dispatch(timer.cycleComplete());
        dispatch(timer.init(localConfig));
        setTimeLeft(time);
      } else {
        dispatch(timer.nextSession('focus'));
        setTimeLeft(time);
      }
    }
  };

  return (
    <FlexContainer
      direction='column'
      alignItems='center'
      paddingBlock='20px'
      paddingInline='20px'
      gap='10px'
    >
      <Button onClick={toggleSettings}>
        <RiSettings4Fill />
      </Button>

      <ClockDial time={timeLeft} />

      <Sessions />

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
    </FlexContainer>
  );
};
