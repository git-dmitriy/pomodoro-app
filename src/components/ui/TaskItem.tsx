import styled from 'styled-components';

export const TaskItem = styled.li<{ $isChecked: boolean }>`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: var(--unit-2);
    opacity: ${({$isChecked}) => ($isChecked ? 0.3 : 1)};
    position: relative;
    font-size: var(--task-fs-1);
    line-height: 1.2;
    padding-block: var(--unit-2);
    padding-inline: 0;
    text-decoration: ${({$isChecked}) => ($isChecked ? 'line-through' : 'unset')}; 

    @media ${({theme}) => theme.media.sm} {
        gap: var(--unit-3);
        font-size: var(--task-fs-2);
    }

    @media ${({theme}) => theme.media.md} {
        font-size: var(--task-fs-3);
    }
`;
