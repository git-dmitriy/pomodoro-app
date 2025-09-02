import styled from 'styled-components';

const Text = styled.span`
    display: block;
    margin: 0;
    padding: 0;
    padding-block-start: var(--unit-2);
    padding-block-end: var(--unit-2);
    word-break: break-word;
    border-block-end: var(--unit-1) solid transparent;
    line-height: 1.2;
`;

type P = {
    children: string;
    onClickHandler: () => void;
};

const Button = styled.button`
    border-radius: var(--unit-2);
    border: none;
    background-color: transparent;
    padding: 0;
    color: inherit;
    text-align: start;
`;

export const TextBlock = ({children, onClickHandler}: P) => {
    return (
        <Button onClick={onClickHandler}>
            <Text>{children}</Text>
        </Button>
    );
};
