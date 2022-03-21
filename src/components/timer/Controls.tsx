import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { Config } from 'features/timer/types';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  init,
  start,
  tick,
  pause,
  nextSession,
  cycleComplete,
} from 'features/timer/timerSlice';
import { MdPlayArrow, MdPause, MdSkipNext } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';

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
        <button onClick={pauseHandler}>
          <MdPause />
        </button>
      ) : (
        <button onClick={startHandler}>
          <MdPlayArrow />
        </button>
      )}
      <button onClick={switchToNextSession}>
        <MdSkipNext />
      </button>
      <button onClick={resetHandler}>
        <GrPowerReset />
      </button>
    </ControlBtns>
  );
};
