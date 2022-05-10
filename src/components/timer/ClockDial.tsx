import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';

const ClockDialTimer = styled.div``;

const Timer = styled.div`
  text-align: center;
  font-size: 6.25rem;
  font-weight: bold;
  color: white;

  @media ${({ theme }) => theme.media.xs} {
    font-size: 6.875rem;
  }

  @media ${({ theme }) => theme.media.sm} {
    font-size: 7.8125rem;
  }

  @media ${({ theme }) => theme.media.xl} {
    font-size: 8.437rem;
  }
`;

type P = {
  time: number;
};

export const ClockDial = ({ time }: P) => {
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
