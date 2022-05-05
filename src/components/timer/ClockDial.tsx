import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const ClockDialTimer = styled.div``;

const Timer = styled.div`
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  color: white;

  @media ${({ theme }) => theme.media.xs} {
    font-size: 110px;
  }

  @media ${({ theme }) => theme.media.sm} {
    font-size: 125px;
  }

  @media ${({ theme }) => theme.media.xl} {
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
