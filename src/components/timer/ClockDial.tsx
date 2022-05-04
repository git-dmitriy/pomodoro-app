import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const ClockDialTimer = styled.div``;

const Timer = styled.div`
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  color: white;

  @media (min-width: 411px) {
    font-size: 110px;
  }

  @media (min-width: 640px) {
    font-size: 125px;
  }

  @media (min-width: 1280px) {
    font-size: 135px;
  }
`;

export const ClockDial = () => {
  const { time } = useAppSelector((state) => state.timer);

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
