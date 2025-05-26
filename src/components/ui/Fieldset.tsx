import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
    display: block;
    position: relative;
    border: none;

    @media (min-width: 480px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Legend = styled.legend`
    color: inherit;
    text-align: center;
    font-size: 1.3em;
`;

type P = {
    children: React.ReactNode;
    legend?: string;
};

export const Fieldset = ({children, legend}: P) => {
    return (
        <>
            <StyledFieldset>
                {legend && <Legend>{legend}</Legend>}
                {children}
            </StyledFieldset>
        </>
    );
};
