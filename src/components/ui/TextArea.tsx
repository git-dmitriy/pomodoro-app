import {ChangeEvent, KeyboardEvent, RefObject} from 'react';
import styled from 'styled-components';

const TaskInputArea = styled.textarea`
    inline-size: 100%;
    display: block;
    color: white;
    resize: none;
    border: none;
    transition: color 0.3s;
    background-color: transparent;
    border-block-end: var(--unit-1) solid transparent;
    margin: 0;
    padding: 0;
    padding-block-start: var(--unit-2);
    padding-block-end: var(--unit-2);
    line-height: 1.2;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);

    &::selection {
        background-color: #f4a259;
    }

    &:focus-visible {
        outline: none;
        border-block-end: var(--unit-1) solid rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar {
        inline-size: var(--unit-2);
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
            rows={content.trim().length > 20 ? 2 : 1}
            autoComplete="off"
        ></TaskInputArea>
    );
};
