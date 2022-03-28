import { TaskItem as TaskItemType } from 'features/tasks/types';

import { useRef, useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from 'features/tasks/tasksSlice';
import { Button } from 'components/ui/Button';
import { AiFillDelete } from 'react-icons/ai';
import { TaskInput } from 'components/ui/TaskInput';
import { Checkbox } from 'components/ui/Checkbox';
import { TaskItem } from 'components/ui/TaskItem';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskListItem = (task: TaskItemType) => {
  const [content, setContent] = useState(task.content);
  const textInput = useRef<null | HTMLInputElement>(null);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const dispatch = useDispatch();

  const onSaveHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (content.trim() !== task.content) {
        dispatch(
          updateTask({
            id: task.id,
            content: content.trim(),
            isComplete: isComplete,
          })
        );
      }
      textInput.current?.blur();
    }
  };

  useEffect(() => {
    dispatch(
      updateTask({
        id: task.id,
        content: content.trim(),
        isComplete: isComplete,
      })
    );
  }, [isComplete]);

  const onBlurHandler = () => {
    if (content.trim() !== task.content) {
      dispatch(
        updateTask({
          id: task.id,
          content: content.trim(),
          isComplete: isComplete,
        })
      );
    }
    setContent(content.trim());
  };

  const onRemoveHandler = () => {
    dispatch(removeTask({ id: task.id }));
  };

  const onCompleteHandler = () => {
    setIsComplete(!isComplete);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isComplete) {
      setContent(e.target.value);
    }
  };

  return (
    <TaskItem isChecked={isComplete}>
      <Container onClick={onCompleteHandler}>
        <Checkbox isChecked={isComplete} />
      </Container>

      <TaskInput
        type='text'
        value={content}
        ref={textInput}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onKeyUp={onSaveHandler}
      />

      <Button onClick={onRemoveHandler}>
        <AiFillDelete />
      </Button>
    </TaskItem>
  );
};
