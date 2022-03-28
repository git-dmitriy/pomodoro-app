import styled from 'styled-components';

export const TaskInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: white;
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  font-size: 30px;
  margin-left: 10px;
  position: relative;

  &:focus-visible {
    outline: none;
    border-bottom: 2px solid white;
  }
`;
