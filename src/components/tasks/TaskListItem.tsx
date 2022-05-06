import { TaskItem as TaskItemType } from 'features/tasks/types';
import { useRef, useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from 'features/tasks/tasksSlice';
import { Button } from 'components/ui/Button';
import { AiFillDelete } from 'react-icons/ai';
import { Checkbox } from 'components/ui/Checkbox';
import { TaskItem } from 'components/ui/TaskItem';
import { TextArea } from 'components/ui/TextArea';
import { TextBlock } from 'components/ui/TextBlock';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskListItem = (task: TaskItemType) => {
  const [content, setContent] = useState(task.content);
  const textInputRef = useRef<null | HTMLTextAreaElement>(null);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const firstRender = useRef(true);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onSaveHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      if (content.trim() !== task.content) {
        dispatch(
          updateTask({
            id: task.id,
            content: content.trim(),
            isComplete: isComplete,
          })
        );
      }
      textInputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      dispatch(
        updateTask({
          id: task.id,
          content: content.trim(),
          isComplete: isComplete,
        })
      );
    }
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  useEffect(() => {
    textInputRef.current?.focus();
  }, [setIsEdit]);

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
    setIsEdit(false);
  };

  const onRemoveHandler = () => {
    dispatch(removeTask({ id: task.id }));
  };

  const onCompleteHandler = () => {
    setIsComplete(!isComplete);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!isComplete) {
      setContent(e.target.value);
    }
  };
  const onEditHandler = () => {
    setIsEdit(true);
    textInputRef.current?.focus();
  };

  return (
    <TaskItem isChecked={isComplete}>
      <Container onClick={onCompleteHandler}>
        <Checkbox isChecked={isComplete} />
      </Container>

      {isEdit && !isComplete ? (
        <TextArea
          refElement={textInputRef}
          content={content}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          onKeyUpHandler={onSaveHandler}
        />
      ) : (
        <TextBlock onClickHandler={onEditHandler}>{content}</TextBlock>
      )}

      <Button onClick={onRemoveHandler}>
        <AiFillDelete />
      </Button>
    </TaskItem>
  );
};
