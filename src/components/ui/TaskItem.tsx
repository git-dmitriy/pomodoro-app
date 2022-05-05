import styled from 'styled-components';

export const TaskItem = styled.div<{ isChecked: boolean }>`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  align-items: center;
  gap: 1rem;
  opacity: ${({ isChecked }) => (isChecked ? 0.3 : 1)};
  position: relative;
  font-size: 20px;
  line-height: 1.5;

  @media ${({ theme }) => theme.media.sm} {
    font-size: 30px;
  }

  @media ${({ theme }) => theme.media.md} {
    font-size: 35px;
  }

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
