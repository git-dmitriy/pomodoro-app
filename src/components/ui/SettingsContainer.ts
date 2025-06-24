import styled from 'styled-components';

export const SettingsContainer = styled.div`
    margin-block: 0;
    margin-inline: var(--unit-2);
    padding: var(--unit-5);
    background-color: #22333b;
    border-radius: var(--unit-4);
    font-size: 1.25rem;

    @media ${({theme}) => theme.media.sm} {
        margin: 0;
        font-size: 1.25rem;
        padding: var(--unit-5);
    }
`;
