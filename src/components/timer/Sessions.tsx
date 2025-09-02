import styled from 'styled-components';
import {useAppSelector} from "@/hooks/useAppSelector";

const PomodoroItemsList = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const PomodoroItem = styled.li`
    width: var(--pomodoro-size);
    height: var(--pomodoro-size);
    border-radius: 50%;
    border: .125rem solid white;
    background-color: transparent;
    margin-block: 0;
    margin-inline: var(--unit-2);


        // @media ${({theme}) => theme.media.sm} {
    //     width: 2.25rem;
    //     height: 2.25rem;
    // }
    //
        // @media ${({theme}) => theme.media.lg} {
    //     width: 2.5rem;
    //     height: 2.5rem;
    // }
`;

const PomodoroItemFill = styled(PomodoroItem)`
    background-color: white;
`;

export const Sessions = () => {
    const {currentSession, totalSessions} = useAppSelector((state) => state.timer);
    const {config} = useAppSelector((state) => state.settings);

    const totalTomatoes = Array.from(Array(config.timer.sessions).keys());
    const currentTomatoes = (totalSessions - currentSession) / 2;

    return (
        <PomodoroItemsList>
            {totalTomatoes.map((item) => {
                if (item >= currentTomatoes) {
                    return <PomodoroItemFill key={item}/>;
                } else {
                    return <PomodoroItem key={item}/>;
                }
            })}
        </PomodoroItemsList>
    );
};
