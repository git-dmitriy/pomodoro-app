import styled from 'styled-components';

const Text = styled.span`
  display: block;
  width: 20ch;
  padding: 0;
  word-wrap: break-word;
  border-bottom: 4px solid transparent;

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
  padding: 5px;
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
