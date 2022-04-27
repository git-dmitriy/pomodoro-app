import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { Config } from 'features/timer/types';
import { FaPlay, FaPause, FaForward, FaUndoAlt } from 'react-icons/fa';
import { Button } from 'components/ui/Button';
import styled from 'styled-components';
import {
  init,
  start,
  tick,
  reset,
  pause,
  nextSession,
  cycleComplete,
} from 'features/timer/timerSlice';

const ControlBtns = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = () => {
  const { time, sessionNumber, config, isRunning, timerId } = useAppSelector(
    (state) => state.timer
  );
  const dispatch = useAppDispatch();
  const [localConfig] = useLocalStorage<Config>('config', config);

  useEffect(() => {
    if (time === 0 && isRunning) {
      switchToNextSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isRunning]);

  useEffect(() => {
    dispatch(init(localConfig));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startHandler = () => {
    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);
    dispatch(start(timer));
  };

  const pauseHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(pause());
  };

  const resetHandler = () => {
    timerId && clearInterval(timerId);
    dispatch(reset());
    dispatch(init(localConfig));
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
    <ControlBtns>
      {isRunning ? (
        <Button onClick={pauseHandler}>
          <FaPause />
        </Button>
      ) : (
        <Button onClick={startHandler}>
          <FaPlay />
        </Button>
      )}
      <Button onClick={switchToNextSession}>
        <FaForward />
      </Button>
      <Button onClick={resetHandler}>
        <FaUndoAlt />
      </Button>
    </ControlBtns>
  );
};
