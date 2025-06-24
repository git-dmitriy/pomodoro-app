import styled from 'styled-components';
import {useAppSelector} from "@/hooks/useAppSelector";

const PomodoroItemsList = styled.ul`
    display: flex;
    align-items: center;
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
    const {tomatoes, config} = useAppSelector((state) => state.timer);

    const totalTomatoes = Array.from(Array(config.sessions.length / 2).keys());

    return (
        <PomodoroItemsList>
            {totalTomatoes.map((item) => {
                if (item >= tomatoes) {
                    return <PomodoroItem key={item}/>;
                } else {
                    return <PomodoroItemFill key={item}/>;
                }
            })}
        </PomodoroItemsList>
    );
};
