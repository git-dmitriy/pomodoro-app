import styled from 'styled-components';

const Text = styled.span`
    display: block;
    inline-size: 15ch;
    margin: 0;
    padding: 0;
    padding-block-end: 5px;
    word-wrap: break-word;
    border-block-end: 4px solid transparent;
    line-height: 1.2;
    //text-decoration: line-through;

    @media ${({theme}) => theme.media.sm} {
        inline-size: 20ch;
    }

    @media ${({theme}) => theme.media.md} {
        inline-size: 25ch;
    }
`;

type P = {
    children: string;
    onClickHandler: () => void;
};

const Button = styled.button`
    border-radius: 5px;
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
