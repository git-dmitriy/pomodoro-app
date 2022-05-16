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
  padding-block: 5px;
  padding-inline: 0;

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
    block-size: ${({ isChecked }) => (isChecked ? '2px' : '0')};
    inset-inline-start: 0;
    inset-inline-end: 50px;
    inset-block-start: 50%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
  }
`;
