import styled from 'styled-components';
import { useEffect } from 'react';

import { ClockDial } from 'components/timer/ClockDial';
import { Controls } from 'components/timer/Controls';
import { Sessinons } from 'components/timer/Sessions';
import { useAppDispatch } from 'app/hooks';
import { init } from 'features/timer/timerSlice';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';

const Container = styled.div`
  background-color: #d1d5db;
  padding: 20px;
  border-radius: 20px;
`;

export const TimerContainer = () => {
  const dispatch = useAppDispatch();
  const [config, setConfig] = useLocalStorage('config', {
    focus: 25,
    rest: 15,
    break: 5,
  });

  useEffect(() => {
    setConfig({
      focus: 0.1,
      rest: 0.1,
      break: 0.1,
    });
    dispatch(init(config));
  }, []);

  return (
    <Container>
      <ClockDial />
      <Sessinons />
      <Controls />
    </Container>
  );
};
