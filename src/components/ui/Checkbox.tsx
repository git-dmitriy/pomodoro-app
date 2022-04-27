import { IoMdCheckmark } from 'react-icons/io';
import styled from 'styled-components';
import { Button } from 'components/ui/Button';

const Frame = styled.div<{ ischecked: boolean }>`
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 30px;
  & svg {
    color: ${({ ischecked: state }) => (state ? 'inherit' : 'transparent')};
    transition: color 0.3s;
  }
`;

export const Checkbox = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <Button>
      <Frame ischecked={isChecked}>
        <IoMdCheckmark />
      </Frame>
    </Button>
  );
};
