import styled from 'styled-components';

export const TaskItem = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${({ isChecked }) => (isChecked ? 0.3 : 1)};
  position: relative;
  width: 40ch;
  font-size: 30px;

  &::after {
    content: '';
    position: absolute;
    height: ${({ isChecked }) => (isChecked ? '2px' : '0')};
    left: 0;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
  }
`;
