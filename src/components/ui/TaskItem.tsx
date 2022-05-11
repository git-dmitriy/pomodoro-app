import styled from 'styled-components';

export const TaskItem = styled.div<{ isChecked: boolean }>`
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
  align-items: center;
  gap: 0.5rem;
  opacity: ${({ isChecked }) => (isChecked ? 0.3 : 1)};
  position: relative;
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 5px 0;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: 3.125rem 1fr 3.125rem;
    gap: 1rem;
    font-size: 1.875rem;
  }

  @media ${({ theme }) => theme.media.md} {
    font-size: 2.1875rem;
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
