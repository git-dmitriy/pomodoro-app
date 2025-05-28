import styled from 'styled-components';

const ClockDialTimer = styled.div``;

const Timer = styled.time`
    text-align: center;
    font-size: 6.25rem;
    font-weight: bold;
    color: white;

    @media ${({theme}) => theme.media.xs} {
        font-size: 6.875rem;
    }

    @media ${({theme}) => theme.media.sm} {
        font-size: 7.8125rem;
    }

    @media ${({theme}) => theme.media.xl} {
        font-size: 8.437rem;
    }
`;

type P = {
    time: number;
};

const leadingZero = (n: number) => {
    if (n < 10) {
        return '0' + n;
    }
    return n;
};

export const ClockDial = ({time}: P) => {
    time = time > 0 ? time : 0;

    return (
        <ClockDialTimer>
            <Timer dateTime={`PT0H${leadingZero(Math.floor(time / 60))}M${leadingZero(Math.floor(time % 60))}S`}>
                {leadingZero(Math.floor(time / 60))}:{leadingZero(Math.floor(time % 60))}
            </Timer>
        </ClockDialTimer>
    );
};
