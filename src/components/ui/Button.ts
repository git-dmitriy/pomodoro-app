import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 100%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: transparent;
    border: none;
    transition: background-color 0.3s, opacity 0.3s, transform 0.2s;
    cursor: pointer;
    padding: var(--unit-3);

    @media ${({theme}) => theme.media.sm} {
        font-size: 2.1875rem;
    }

    &:hover,
    &:focus-visible {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active:not([disabled]) {
        background-color: rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
    }

    &:disabled,
    &[disabled] {
        cursor: default;
        opacity: 0.3;
        background-color: transparent;
    }
    
    &:focus {
        outline: none;
    }
    
    &:focus-visible {
        outline: revert;
    }
`;
