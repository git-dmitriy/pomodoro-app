import styled from 'styled-components';

const Text = styled.span`
  display: block;
  width: 15ch;
  margin: 0;
  padding: 0;
  word-wrap: break-word;
  padding-bottom: 5px;
  border-bottom: 4px solid transparent;
  line-height: 1.2;

  @media ${({ theme }) => theme.media.sm} {
    width: 20ch;
  }

  @media ${({ theme }) => theme.media.md} {
    width: 25ch;
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
  text-align: left;
`;

export const TextBlock = ({ children, onClickHandler }: P) => {
  return (
    <Button onClick={onClickHandler}>
      <Text>{children}</Text>
    </Button>
  );
};
