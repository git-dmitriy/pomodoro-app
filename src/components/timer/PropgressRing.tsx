import styled from "styled-components";

const Container = styled.article`
    position: relative;
    padding-inline: var(--unit-4);
    display: grid;
    gap: var(--unit-2);
    justify-items: center;
    margin: var(--unit-7);

    .progress-ring {
        --progress: 50;
        --size: 250px;
        --half-size: calc(var(--size) / 2);
        --stroke-width: 4px;
        --radius: calc((var(--size) - var(--stroke-width)) / 2);
        --circumference: calc(var(--radius) * pi * 2);
        --dash: calc((var(--progress) * var(--circumference)) / 100);
        animation: progress-animation 5s linear 0s 1 forwards;
        pointer-events: none;

        position: absolute;
        inset: var(--unit--7);

        circle {
            cx: var(--half-size);
            cy: var(--half-size);
            r: var(--radius);
            stroke-width: var(--stroke-width);
            fill: none;
            stroke-linecap: round;
        }

        circle.bg {
            stroke: rgba(0, 0, 0, .2);
        }

        circle.fg {
            transform: rotate(-90deg);
            transform-origin: var(--half-size) var(--half-size);
            stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
            transition: stroke-dasharray 0.3s linear 0s;
            stroke: white;
        }
    }
`

type Props = {
    children?: React.ReactNode,
    timeLeft: number
};

export const ProgressRing: React.FC<Props> = ({children, timeLeft}) => {


    // const {}
    // получить оставшееся время
    // рассчитать процент и передать его в переменную

    const progress =  300 / timeLeft * 100 - 100;


    return (

        <Container>
            <svg
                viewBox="0 0 250 250"
                className="progress-ring"
                style={{'--progress': progress}}
            >
                <circle className="bg"></circle>
                <circle className="fg"></circle>
            </svg>
            {children}
        </Container>
    )
}