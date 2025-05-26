import styled from 'styled-components';

export const SettingsContainer = styled.div`
    margin-block: 0;
    margin-inline: 0.5rem;
    padding: 1.5rem;
    background-color: #22333b;
    border-radius: 1rem;
    font-size: 1.25rem;

    @media ${({theme}) => theme.media.sm} {
        margin: 0;
        font-size: 1.25rem;
        padding: 1.5rem;
    }
`;
