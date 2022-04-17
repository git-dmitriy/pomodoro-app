import { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import styled from 'styled-components';

const TaskInputArea = styled.textarea`
  display: block;
  width: 40ch;
  resize: none;
  background-color: transparent;
  border: none;
  color: white;
  transition: color 0.3s;
  border-bottom: 4px solid transparent;
  font-size: 30px;
  line-height: 1.5;
  padding: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);

  &::selection {
    background-color: #f4a259;
  }

  &:focus-visible {
    outline: none;
    border-bottom: 2px solid white;
    border-bottom: 4px solid rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
    cursor: default;
  }
`;

type P = {
  content: string;
  refElement: RefObject<HTMLTextAreaElement>;
  onChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlurHandler: () => void;
  onKeyUpHandler: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = ({
  content,
  refElement,
  onChangeHandler,
  onBlurHandler,
  onKeyUpHandler,
}: P) => {
  return (
    <TaskInputArea
      ref={refElement}
      value={content}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onKeyDown={onKeyUpHandler}
      autoFocus
      rows={content.trim().length > 40 ? 2 : 1}
    ></TaskInputArea>
  );
};
