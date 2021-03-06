import { IoMdCheckmark } from 'react-icons/io';
import styled from 'styled-components';
import { Button } from 'components/ui/Button';

const Frame = styled.div<{ ischecked: boolean }>`
  border-radius: 50%;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  cursor: pointer;
  & svg {
    color: ${({ ischecked: state }) => (state ? 'inherit' : 'transparent')};
    transition: color 0.3s;
  }
  
  @media ${({ theme }) => theme.media.sm} {
    min-width: 2.5rem;
    min-height: 2.5rem;
    font-size: 1.875rem;
    
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
