import styled from 'styled-components';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { init, start, tick, pause } from 'features/timer/timerSlice';

const ControlBtns = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = () => {
  const { time, currentSession, isRunning, timerId } = useAppSelector(
    (state) => state.timer
  );

  const dispatch = useAppDispatch();

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
    dispatch(init(null));
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
      <button onClick={resetHandler}>
        <GrPowerReset />
      </button>
    </ControlBtns>
  );
};
